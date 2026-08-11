import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req) {
  try {
    const { reference } = await req.json();

    if (!reference) {
      return NextResponse.json(
        { success: false, message: "Transaction reference is required." },
        { status: 400 }
      );
    }

    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    const payment = response.data.data;

    if (payment.status === "success") {
      return NextResponse.json({
        success: true,
        payment,
      });
    }

    return NextResponse.json({
      success: false,
      payment,
    });
  } catch (error) {
    console.error(error.response?.data || error);

    return NextResponse.json(
      {
        success: false,
        message: "Payment verification failed.",
      },
      { status: 500 }
    );
  }
}