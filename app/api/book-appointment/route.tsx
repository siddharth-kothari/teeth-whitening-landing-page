import { NextResponse } from "next/server";
import { query } from "@/config/db";
import { getServerSession } from "next-auth";
import { options as authOptions } from "../auth/[...nextauth]/options";
import { Resend } from "resend";
import { BookAppointmentEmail } from "@/emails/BookAppointmentEmail";

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

    if (result.insertId) {
      // Fetch the ICS file content from the generate-ics API
      const icsRequestData = {
        date: data.date,
        selectedTimeSlot: data.selectedTimeSlot,
        comments: data.comments,
        user_id: data.user_id,
      };

      let icsContent: string | null = null;
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/api/generate-ics`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(icsRequestData),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch ICS content");
        }

        icsContent = await response.text();
      } catch (error) {
        console.error("Error fetching ICS content:", error);
        return NextResponse.json(
          { error: "Failed to fetch ICS content" },
          { status: 500 }
        );
      }

      await resend.emails.send({
        from: "Dental Care Solutions <Dental-Care-Solutions@dcs-test.siddharthkothari.com>",
        to: session.user.email,
        subject: "Appointment Confirmation at Dental Care Solutions",
        attachments: [
          {
            filename: "appointment.ics",
            content: icsContent,
          },
        ],
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
