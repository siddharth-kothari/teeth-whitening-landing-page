import { query } from "@/config/db";
import { NextResponse } from "next/server";
// Adjust this import based on your folder structure

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const date = searchParams.get("date");

  if (!date) {
    return NextResponse.json({ error: "Date is required" }, { status: 400 });
  }

  try {
    // Fetch appointments for the given date
    const appointments = await query({
      query:
        "SELECT appointment_date, appointment_time FROM appointments WHERE appointment_date = ? AND status = 'scheduled'",
      data: [date],
    });

    return NextResponse.json(appointments);
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
