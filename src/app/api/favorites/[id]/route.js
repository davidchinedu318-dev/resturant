import sql from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { NextResponse } from "next/server";

// Check if a food is favorited
export async function GET(request, context) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { favorite: false },
      { status: 401 }
    );
  }

  const { id } = await context.params;

  const favorite = await sql`
    SELECT *
    FROM favorites
    WHERE user_email = ${session.user.email}
    AND food_id = ${Number(id)}
  `;

  return NextResponse.json({
    favorite: favorite.length > 0,
  });
}

// Remove favorite
export async function DELETE(request, context) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  const { id } = await context.params;

  await sql`
    DELETE FROM favorites
    WHERE user_email = ${session.user.email}
    AND food_id = ${Number(id)}
  `;

  return NextResponse.json({
    message: "Removed from favorites",
  });
}