import { NextResponse } from "next/server";
import { query } from "@/config/db";
import { api } from "..";
import { sendVerificationEmail } from "@/lib/verification-email"; // Your email sending function
import { generateToken } from "@/lib/generate-token"; // Token generation function

export const POST = async (req: Request) => {
  const data = await req.json();

  try {
    //const { data } = await api.post("/auth/local/register", userData);

    const emailExists = await query({
      query: "SELECT * FROM users WHERE email = ?",
      data: [data.email],
    });

    if (emailExists.length == 0) {
      const verificationToken = generateToken();
      const tokenExpiry = new Date();
      tokenExpiry.setHours(tokenExpiry.getHours() + 1);

      const result = await query({
        query:
          "INSERT INTO users(first_name, last_name, email, password, mobile_no, provider, verification_token, verification_token_expires) VALUES (?,?,?,?,?,?,?,?)",
        data: [
          data.firstname,
          data.lastname,
          data.email,
          data.password,
          data.mobileno,
          "credentials",
          verificationToken,
          tokenExpiry,
        ],
      });

      if (result.insertId) {
        await sendVerificationEmail(data.email, verificationToken);
        return NextResponse.json(
          { message: "user_created", status: 201 },
          { status: 201 }
        );
      }
    } else {
      return NextResponse.json(
        { message: "Email already exists", status: 500 },
        { status: 500 }
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error, status: 500 }, { status: 500 });
  }
};
