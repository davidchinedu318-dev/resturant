import { NextResponse } from "next/server";
import  sql  from "@/lib/db";

export async function POST(req) {
  try {
    const body = await req.json();

    const {
      user_name,
      user_email,
      phone,
      city,
      road,
      street,
      manual_road,
      manual_street,
      house_address,
      delivery_note,
      amount,
      cartItems,
    } = body;

    // Create the order
    const [order] = await sql`
      INSERT INTO orders (
        user_name,
        user_email,
        phone,
        city,
        road,
        street,
        manual_road,
        manual_street,
        house_address,
        delivery_note,
        amount
      )
      VALUES (
        ${user_name},
        ${user_email},
        ${phone},
        ${city},
        ${road},
        ${street},
        ${manual_road},
        ${manual_street},
        ${house_address},
        ${delivery_note},
        ${amount}
      )
      RETURNING id;
    `;

    // Save each cart item
    for (const item of cartItems) {
      await sql`
        INSERT INTO order_items (
          order_id,
          food_id,
          food_name,
          quantity,
          price
        )
        VALUES (
          ${order.id},
          ${item.id},
          ${item.name},
          ${item.quantity},
          ${item.price}
        );
      `;
    }

    return NextResponse.json({
      success: true,
      orderId: order.id,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to create order.",
      },
      {
        status: 500,
      }
    );
  }
}