import { NextResponse } from "next/server";
import { getServerSession } from "next-auth"; // Importing getServerSession from next-auth
import { options } from "../auth/[...nextauth]/options";
import { query } from "@/config/db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.json(
      { success: false, message: "Invalid or missing token" },
      { status: 400 }
    );
  }

  try {
    // Query to find the user by verification token
    const findUserQuery = `
      SELECT id, email, verification_token_expires 
      FROM users 
      WHERE verification_token = ? 
      LIMIT 1
    `;
    const users = await query({ query: findUserQuery, data: [token] });

    if (users.length === 0) {
      return NextResponse.json(
        { success: false, message: "Token expired or invalid" },
        { status: 400 }
      );
    }

    const user = users[0];

    // Check if the token has expired
    const currentTime = new Date();
    if (new Date(user.verificationTokenExpires) < currentTime) {
      return NextResponse.json(
        { success: false, message: "Token expired" },
        { status: 400 }
      );
    }

    // Update the user to mark them as verified and clear the token
    const updateUserQuery = `
      UPDATE users 
      SET is_verified = 1, verification_token = NULL, verification_token_expires = NULL 
      WHERE id = ?
    `;
    await query({ query: updateUserQuery, data: [user.id] });

    // Update session data
    const session = await getServerSession(options);
    if (session && session.user && session.user.email === user.email) {
      session.user.isVerified = 1;
    }

    return NextResponse.json({
      success: true,
      message: "Email verified successfully!",
    });
  } catch (error: any) {
    console.error("Error verifying email:", error);
    return NextResponse.json(
      { success: false, message: "An error occurred during verification" },
      { status: 500 }
    );
  }
}
