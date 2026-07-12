import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import sql from "@/lib/db";

export async function POST(request) {
  try {
    // Get the data sent from the frontend
    const { name, email, password } = await request.json();

    // Check if the email already exists
    const existingUser = await sql`
      SELECT * FROM users
      WHERE email = ${email}
    `;

    if (existingUser.length > 0) {
      return NextResponse.json(
        { message: "Email already exists" },
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the user
    await sql`
      INSERT INTO users (name, email, password)
      VALUES (${name}, ${email}, ${hashedPassword})
    `;

    return NextResponse.json(
      { message: "Account created successfully" },
      { status: 201 }
    );

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}