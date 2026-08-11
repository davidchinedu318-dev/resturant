import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import  sql  from "@/lib/db";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        {
          success: false,
          message: "You must be logged in.",
        },
        { status: 401 }
      );
    }

    const orders = await sql`
      SELECT
        id,
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
        payment_status,
        payment_reference,
        order_status,
        created_at
      FROM orders
      WHERE user_email = ${session.user.email}
      ORDER BY created_at DESC;
    `;

    return NextResponse.json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error("Fetch orders error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to fetch orders.",
      },
      { status: 500 }
    );
  }
}