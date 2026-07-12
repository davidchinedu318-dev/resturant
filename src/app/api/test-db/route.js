import { NextResponse } from "next/server";
import sql from "@/lib/db";

export async function GET() {
  try {
    const users = await sql`
      SELECT * FROM users;
    `;

    return NextResponse.json(users);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Database connection failed" },
      { status: 500 }
    );
  }
}