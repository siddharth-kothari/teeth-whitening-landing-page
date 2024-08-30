import { NextResponse } from "next/server";
import { sendVerificationEmail } from "@/lib/verification-email"; // Your email sending function
import { generateToken } from "@/lib/generate-token"; // Token generation function
import { query } from "@/config/db";

export async function POST(request: Request) {
  const { email } = await request.json();

  if (!email) {
    return NextResponse.json(
      { success: false, message: "Email is required" },
      { status: 400 }
    );
  }

  try {
    // Find the user by email
    const findUserQuery = `
      SELECT id, is_verified, verification_token_expires 
      FROM users 
      WHERE email = ? 
      LIMIT 1
    `;
    const users = await query({ query: findUserQuery, data: [email] });

    if (users.length === 0) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    const user = users[0];

    // If the user is already verified, no need to resend
    if (user.isVerified) {
      return NextResponse.json(
        { success: false, message: "Email is already verified" },
        { status: 400 }
      );
    }

    // Check if the existing token has expired
    const currentTime = new Date();
    let newToken = user.verificationToken;
    let newTokenExpiry = user.verificationTokenExpires;

    if (!newToken || new Date(user.verificationTokenExpires) < currentTime) {
      // Generate a new token if expired or doesn't exist
      newToken = generateToken();
      newTokenExpiry = new Date();
      newTokenExpiry.setHours(newTokenExpiry.getHours() + 1); // Token expires in 1 hour

      // Update the user with the new token and expiry
      const updateUserQuery = `
        UPDATE users 
        SET verification_token = ?, verification_token_expires = ? 
        WHERE id = ?
      `;
      await query({
        query: updateUserQuery,
        data: [newToken, newTokenExpiry, user.id],
      });
    }

    // Send the verification email
    await sendVerificationEmail(email, newToken);

    return NextResponse.json({
      success: true,
      message: "Verification email sent successfully",
    });
  } catch (error: any) {
    console.error("Error resending verification email:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while resending the verification email",
      },
      { status: 500 }
    );
  }
}
