import sql from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";

//to GET favourites 
export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json([], { status: 401 });
  }

  const favorites = await sql`
    SELECT
      foods.id,
      foods.name,
      foods.price,
      foods.image,
      foods.description,
      foods.status,
      foods.category
    FROM favorites
    JOIN foods
      ON favorites.food_id = foods.id
    WHERE favorites.user_email = ${session.user.email}
    ORDER BY favorites.created_at DESC
  `;

  return NextResponse.json(favorites);
}
// Add a favorite
export async function POST(request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  const { foodId } = await request.json();

  // Prevent duplicates
  const existing = await sql`
    SELECT *
    FROM favorites
    WHERE user_email = ${session.user.email}
    AND food_id = ${foodId}
  `;

  if (existing.length === 0) {
    await sql`
      INSERT INTO favorites (user_email, food_id)
      VALUES (${session.user.email}, ${foodId})
    `;
  }

  return NextResponse.json({
    message: "Added to favorites",
  });
}