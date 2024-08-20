import { NextResponse } from "next/server";
import { query } from "@/config/db";

export const POST = async (req: Request) => {
  const data = await req.json();
  console.log(data);
  try {
    const result = await query({
      query:
        "INSERT INTO appointments(user_id, appointment_date, appointment_time,  comments) VALUES(?,?,?,?)",
      data: [data.user_id, data.date, data.selectedTimeSlot, data.comments],
    });

    return NextResponse.json(
      { message: "Request Sent.", status: 200 },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error, status: 500 }, { status: 500 });
  }
};
