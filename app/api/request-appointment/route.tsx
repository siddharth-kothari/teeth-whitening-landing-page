import { NextResponse } from "next/server";
import { query } from "@/config/db";

export const POST = async (req: Request) => {
  const data = await req.json();
  console.log(data);
  try {
    const result = await query({
      query:
        "INSERT INTO appointments(name,email,mobile_no,appointment_date,message) VALUES(?,?,?,?,?)",
      data: [data.name, data.email, data.phone, data.aptDate, data.message],
    });

    return NextResponse.json(
      { message: "Request Sent.", status: 200 },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error, status: 500 }, { status: 500 });
  }
};
