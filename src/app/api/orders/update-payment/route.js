import { NextResponse } from "next/server";
import sql from "@/lib/db";

export async function POST(req) {
  try {
    const { orderId, paymentReference } = await req.json();

    if (!orderId || !paymentReference) {
      return NextResponse.json(
        {
          success: false,
          message: "Order ID and payment reference are required.",
        },
        { status: 400 }
      );
    }

    // Check if this payment reference has already been used
    const existingPayment = await sql`
      SELECT id, payment_status
      FROM orders
      WHERE payment_reference = ${paymentReference}
      LIMIT 1;
    `;

    if (existingPayment.length > 0) {
      // Same order/payment was already processed
      if (
        existingPayment[0].id === Number(orderId) &&
        existingPayment[0].payment_status === "paid"
      ) {
        return NextResponse.json({
          success: true,
          alreadyProcessed: true,
          message: "Payment has already been processed.",
          orderId: existingPayment[0].id,
        });
      }

      return NextResponse.json(
        {
          success: false,
          message: "This payment reference has already been used.",
        },
        { status: 409 }
      );
    }

    // Verify payment with Paystack
    const paystackResponse = await fetch(
      `https://api.paystack.co/transaction/verify/${paymentReference}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const paystackData = await paystackResponse.json();

    if (
      !paystackResponse.ok ||
      !paystackData.status ||
      paystackData.data?.status !== "success"
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Payment could not be verified.",
        },
        { status: 400 }
      );
    }

    // Make sure the payment belongs to this order
    const paidAmount = paystackData.data.amount;
    const orderAmountResult = await sql`
      SELECT id, amount, payment_status
      FROM orders
      WHERE id = ${orderId}
      LIMIT 1;
    `;

    if (orderAmountResult.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Order not found.",
        },
        { status: 404 }
      );
    }

    const order = orderAmountResult[0];

    // If already paid, don't process it again
    if (order.payment_status === "paid") {
      return NextResponse.json({
        success: true,
        alreadyProcessed: true,
        message: "Order payment has already been processed.",
        orderId: order.id,
      });
    }

    // Paystack amount is in kobo, database amount is in naira
    if (paidAmount !== Number(order.amount) * 100) {
      return NextResponse.json(
        {
          success: false,
          message: "Payment amount does not match the order amount.",
        },
        { status: 400 }
      );
    }

    // Payment is verified and amount matches
    const result = await sql`
      UPDATE orders
      SET
        payment_status = 'paid',
        payment_reference = ${paymentReference}
      WHERE id = ${orderId}
      RETURNING id, payment_status, payment_reference;
    `;

    return NextResponse.json({
      success: true,
      order: result[0],
    });

  } catch (error) {
    console.error("Update payment error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update payment.",
      },
      { status: 500 }
    );
  }
}