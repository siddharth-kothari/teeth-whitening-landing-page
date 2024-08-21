// app/api/generate-ics/route.ts

import { NextResponse } from "next/server";

const formatDate = (date: Date) => {
  return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
};

const formatDescription = (title: string, start: Date, end: Date) => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const dateStr = start.toLocaleDateString("en-IN", options);
  const timeStr = `${start.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  })} - ${end.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  })}`;

  return `Event Name: ${title}\\nDate: ${dateStr}\\nTime: ${timeStr} (IST)\\n`;
};

const generateICS = (eventDetails: {
  title: string;
  start: string;
  end: string;
  location: string;
  description: string;
}) => {
  return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Your Company//NONSGML Event//EN
BEGIN:VEVENT
UID:${Date.now()}@example.com
DTSTAMP:${formatDate(new Date())}
DTSTART:${eventDetails.start}
DTEND:${eventDetails.end}
SUMMARY:${eventDetails.title}
DESCRIPTION:${eventDetails.description}
LOCATION:${eventDetails.location}
END:VEVENT
END:VCALENDAR`;
};

export async function POST(request: Request) {
  const { date, selectedTimeSlot, comments, user_id } = await request.json();

  const startDate = new Date(`${date} ${selectedTimeSlot}`);
  const endDate = new Date(startDate.getTime() + 30 * 60 * 1000); // 30 minutes duration

  const eventDetails = {
    title: `Appointment with Dental Care Solutions`,
    start: formatDate(startDate),
    end: formatDate(endDate),
    location: `Dental Care Solutions, 101, Elpis IVF and Maternity Hospital, Parihar Chowk, ITI Rd, beside Malabar Gold and Diamonds, Aundh, Pune, Maharashtra 411007`,
    description: formatDescription(
      `Appointment with Dentist`,
      startDate,
      endDate
    ), // Formatted description
  };

  console.log(
    "desc",
    formatDescription(`Appointment with Dentist`, startDate, endDate)
  );
  const icsContent = generateICS(eventDetails);

  return new NextResponse(icsContent, {
    headers: {
      "Content-Type": "text/calendar",
      "Content-Disposition": "attachment; filename=appointment.ics",
    },
  });
}
