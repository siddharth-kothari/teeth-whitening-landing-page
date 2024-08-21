"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { textVariant, zoomIn } from "@/utils/motion";
import { Calendar } from "@/components/ui/calendar";
import { CalendarDays, Clock, MessageCircleQuestionIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface TimeSlot {
  time: string;
  isDisabled: boolean;
}

interface BookAppointmentProps {
  button_title: string;
  style: string;
}

const BookAppointment: React.FC<BookAppointmentProps> = ({
  button_title,
  style,
}) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const [timeSlot, setTimeSlot] = useState<TimeSlot[]>([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [comments, setComments] = useState<string>("");
  const [disabled, setDisabled] = useState(false);
  const user_id = session?.user?.id;

  useEffect(() => {
    if (selectedDate) {
      fetchAppointmentsForDate(selectedDate);
    }
  }, [selectedDate]);

  const handleOpen = () => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else {
      setOpen(true);
    }
  };

  const formatDate = (date: Date | undefined) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const formattedDate = selectedDate
      ? new Intl.DateTimeFormat("en-US", options).format(selectedDate)
      : "";

    return formattedDate;
  };

  const fetchAppointmentsForDate = async (date: Date) => {
    const formattedDate = formatDate(date);
    try {
      const res = await fetch(`/api/appointments?date=${formattedDate}`);
      const appointments = await res.json();

      if (res.ok) {
        updateTimeSlots(appointments);
      } else {
        console.error("Error fetching appointments:", appointments.error);
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  const bookAppointment = async () => {
    setDisabled(true);

    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const date = formatDate(selectedDate);

    const userData = {
      date,
      selectedTimeSlot,
      comments,
      user_id,
    };
    const body = JSON.stringify(userData);
    const res = await fetch(`/api/book-appointment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });

    if (res.ok) {
      setDisabled(false);
      setOpen(false);
    } else {
      setDisabled(false);
      console.error("Error booking appointment");
    }
  };

  const updateTimeSlots = (appointments: any[]) => {
    const timeList: TimeSlot[] = [];
    const today = new Date();

    // Generate time slots
    for (let i = 10; i <= 19; i++) {
      const hour = i > 12 ? i - 12 : i;
      const period = i >= 12 ? "PM" : "AM";
      timeList.push({ time: `${hour}:00 ${period}`, isDisabled: false });
      timeList.push({ time: `${hour}:30 ${period}`, isDisabled: false });
    }

    // Extract booked time slots
    const bookedSlots = appointments.map(
      (appointment) => appointment.appointment_time
    );

    const currentDate = new Date(selectedDate!);
    currentDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    // Get current time
    const currentHour = new Date().getHours();
    const currentMinutes = new Date().getMinutes();

    // Disable slots that are booked or past
    timeList.forEach((slot, index) => {
      const [slotHourStr, slotMinutesStr] = slot.time.split(/[: ]/);
      const slotHour = parseInt(slotHourStr, 10);
      const slotMinutes = parseInt(slotMinutesStr, 10) || 0;
      const isPM = slot.time.includes("PM");

      // Convert slot time to 24-hour format
      let adjustedHour = slotHour;
      if (isPM && slotHour !== 12) adjustedHour += 12;
      if (!isPM && slotHour === 12) adjustedHour = 0;

      // Disable if slot is booked
      if (bookedSlots.includes(slot.time)) {
        timeList[index].isDisabled = true;
      }

      // Disable if slot is in the past (only for today's date)
      if (currentDate.getTime() === today.getTime()) {
        if (
          adjustedHour < currentHour ||
          (adjustedHour === currentHour && slotMinutes < currentMinutes)
        ) {
          timeList[index].isDisabled = true;
        }
      }
    });

    // Update state with the new time slots
    setTimeSlot(timeList);
  };

  const isPastDate = (day: Date) => {
    const today = new Date();
    const twoMonthsFromToday = new Date();
    twoMonthsFromToday.setMonth(today.getMonth() + 2);

    day.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    twoMonthsFromToday.setHours(0, 0, 0, 0);

    return day < today || day > twoMonthsFromToday;
  };

  return (
    <>
      {style === "button" ? (
        <motion.div
          variants={textVariant(1)}
          whileInView="show"
          initial="hidden"
          viewport={{ once: true, amount: 0.25 }}
          className="flex justify-center cursor-pointer"
        >
          <motion.a
            variants={zoomIn(0, 0, 1.05)}
            whileHover="show"
            initial="hidden"
            className="inline-flex px-6 py-3 mt-5 text-lg font-bold text-white transition-all duration-200 bg-gray-900 rounded-lg font-pj"
            onClick={handleOpen}
          >
            {button_title}
          </motion.a>
        </motion.div>
      ) : (
        <span
          className="flex text-base cursor-pointer text-black transition-all duration-200 hover:font-extrabold"
          onClick={handleOpen}
        >
          {button_title}
        </span>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Book Appointment</DialogTitle>
            <DialogDescription>
              <div className="grid grid-cols-1 md:grid-cols-2 mt-5">
                <div className="flex flex-col items-baseline h-full">
                  <h2 className="flex gap-2 items-center text-black mb-3">
                    <CalendarDays className="w-5 h-5" />
                    Select Date
                  </h2>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border"
                    disabled={isPastDate}
                  />
                </div>

                <div className="mt-5 md:mt-0">
                  <h2 className="flex gap-2 items-center text-black mb-3">
                    <Clock className="w-5 h-5" />
                    Select Time Slot
                  </h2>
                  <div className="grid grid-cols-3 gap-2 border rounded-lg p-4">
                    {timeSlot &&
                      timeSlot.map((item, idx) => (
                        <h2
                          className={`p-2 text-center border rounded-full  ${
                            item.isDisabled
                              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                              : "hover:bg-black hover:text-white cursor-pointer"
                          } ${
                            item.time === selectedTimeSlot &&
                            !item.isDisabled &&
                            "bg-black text-white"
                          }`}
                          key={idx}
                          onClick={() =>
                            !item.isDisabled && setSelectedTimeSlot(item.time)
                          }
                        >
                          {item.time}
                        </h2>
                      ))}
                  </div>
                </div>
              </div>

              <div className="mt-5">
                <h2 className="flex gap-2 items-center text-black mb-3">
                  <MessageCircleQuestionIcon className="w-5 h-5" />
                  Comments/Questions
                </h2>
                <textarea
                  className="border rounded-lg outline-none focus:ring-transparent p-2 w-full"
                  rows={5}
                  onChange={(e) => setComments(e.target.value)}
                ></textarea>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-end mt-2">
            <DialogClose asChild>
              <Button
                type="button"
                className="border border-red-600 text-red-600 px-6 py-2 rounded-md cursor-pointer bg-transparent hover:bg-transparent"
              >
                Close
              </Button>
            </DialogClose>
            <Button
              type="button"
              className="text-white bg-black px-6 py-2 rounded-md cursor-pointer hover:bg-black"
              disabled={!(selectedDate && selectedTimeSlot) || disabled}
              onClick={bookAppointment}
            >
              Book
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BookAppointment;
