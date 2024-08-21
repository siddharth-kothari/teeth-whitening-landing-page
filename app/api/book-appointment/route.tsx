import { NextResponse } from "next/server";
import { query } from "@/config/db";
import { getServerSession } from "next-auth";
import { options as authOptions } from "../auth/[...nextauth]/options";
import { Resend } from "resend";
import { BookAppointmentEmail } from "@/emails/index";

const resend = new Resend(process.env.RESEND_API_KEY);

export const POST = async (req: Request) => {
  const data = await req.json();

  // Fetch the session using the App Directory way
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  if (session.user.id != data.user_id) {
    return NextResponse.json(
      { message: "Unauthorised Access" },
      { status: 403 }
    );
  }

  try {
    const result = await query({
      query:
        "INSERT INTO appointments(user_id, appointment_date, appointment_time, comments) VALUES(?,?,?,?)",
      data: [data.user_id, data.date, data.selectedTimeSlot, data.comments],
    });

    const [user] = await query({
      query: "SELECT first_name FROM users WHERE id = ?",
      data: [data.user_id],
    });

    console.log("result", result.insertId);
    console.log("user", user.first_name);

    if (result.insertId) {
      await resend.emails.send({
        from: "Dental Care Solutions <Dental-Care-Solutions@dcs-test.siddharthkothari.com>",
        to: session.user.email,
        subject: "Appointment Confirmation at Dental Care Solutions",
        react: (
          <BookAppointmentEmail
            userFirstname={user.first_name}
            apt_data={data}
          />
        ),
      });
    }

    return NextResponse.json(
      { message: "Request Sent.", status: 200 },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { message: error.message, status: 500 },
        { status: 500 }
      );
    } else {
      return NextResponse.json(
        { message: "An unknown error occurred", status: 500 },
        { status: 500 }
      );
    }
  }
};
