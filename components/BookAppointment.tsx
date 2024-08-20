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
  DialogTrigger,
} from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { textVariant, zoomIn } from "@/utils/motion";
import { Calendar } from "@/components/ui/calendar";
import { CalendarDays, Clock } from "lucide-react";
import { Button } from "./ui/button";

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
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [timeSlot, setTimeSlot] = useState<TimeSlot[]>([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);

  useEffect(() => {
    updateTimeSlots();
  }, [date]);

  const updateTimeSlots = () => {
    const timeList: TimeSlot[] = [];
    const today = new Date();

    // Define time slots
    for (let i = 10; i <= 19; i++) {
      const hour = i > 12 ? i - 12 : i;
      const period = i >= 12 ? "PM" : "AM";

      // Create both hour and half-hour time slots
      timeList.push({ time: `${hour}:00 ${period}`, isDisabled: false });
      timeList.push({ time: `${hour}:30 ${period}`, isDisabled: false });
    }

    // Disable slots based on date and time conditions
    const currentDate = new Date(date!);
    currentDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    if (currentDate.getTime() === today.getTime()) {
      // If selected date is today, disable past time slots
      const currentHour = new Date().getHours();
      const currentMinutes = new Date().getMinutes();

      timeList.forEach((slot, index) => {
        const [slotHourStr, slotMinutesStr] = slot.time.split(/[: ]/);
        const slotHour = parseInt(slotHourStr, 10);
        const slotMinutes = parseInt(slotMinutesStr, 10) || 0;
        const isPM = slot.time.includes("PM");

        let adjustedHour = slotHour;
        if (isPM && slotHour !== 12) adjustedHour += 12; // Convert to 24-hour format for PM times
        if (!isPM && slotHour === 12) adjustedHour = 0; // Convert 12 AM to 00:00

        // Disable slots that are in the past
        if (
          adjustedHour < currentHour ||
          (adjustedHour === currentHour && slotMinutes <= currentMinutes)
        ) {
          timeList[index].isDisabled = true;
        }
      });
    }

    setTimeSlot(timeList);
  };

  const isPastDate = (day: Date) => {
    const today = new Date();

    // Calculate the date two months from today
    const twoMonthsFromToday = new Date();
    twoMonthsFromToday.setMonth(today.getMonth() + 2);

    // Set time to 00:00:00 for all dates to compare only the date portion
    day.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    twoMonthsFromToday.setHours(0, 0, 0, 0);

    // Disable dates before today or after two months from today
    return day < today || day > twoMonthsFromToday;
  };

  return (
    <Dialog>
      <DialogTrigger>
        {style && style === "button" ? (
          <motion.div
            variants={textVariant(1)}
            whileInView="show"
            initial="hidden"
            viewport={{ once: true, amount: 0.25 }}
            className="flex justify-center"
          >
            <motion.a
              variants={zoomIn(0, 0, 1.05)}
              whileHover="show"
              initial="hidden"
              className="inline-flex px-6 py-3 mt-5 text-lg font-bold text-white transition-all duration-200 bg-gray-900 rounded-lg  font-pj"
            >
              {button_title}
            </motion.a>
          </motion.div>
        ) : (
          <span className="flex text-base cursor-pointer text-black transition-all duration-200 hover:font-extrabold">
            {" "}
            {button_title}{" "}
          </span>
        )}
      </DialogTrigger>
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
                  selected={date}
                  onSelect={setDate}
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
                        className={`p-2 text-center border rounded-full cursor-pointer ${
                          item.isDisabled
                            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                            : "hover:bg-black hover:text-white"
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
            disabled={!(date && selectedTimeSlot)}
          >
            Book
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BookAppointment;
