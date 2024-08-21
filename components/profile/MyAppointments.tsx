"use client";

import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AppointmentList from "./AppointmentList";
import { useSession } from "next-auth/react";
import { api } from "@/app/api";

const MyAppointments = () => {
  const { data: session, status } = useSession();
  const [appointments, setAppointments] = useState<any[]>([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        if (session?.user?.id) {
          const { data } = await api.get(
            `/api/user-appointments?user=${session.user.id}`
          );
          setAppointments(data);
        }
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, [session]);

  const filterAppointments = (status: string) => {
    const results = appointments.filter(
      (appointment) => appointment.status === status
    );

    return results;
  };

  return (
    <section className="pt-12 pb-12 sm:pb-16 lg:pt-8" id="contact">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold">My Appointments</h2>
        <Tabs defaultValue="all" className="w-full mt-5">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            <AppointmentList aptData={appointments} />
          </TabsContent>
          <TabsContent value="scheduled">
            <AppointmentList aptData={filterAppointments("scheduled")} />
          </TabsContent>
          <TabsContent value="completed">
            <AppointmentList aptData={filterAppointments("completed")} />
          </TabsContent>
          <TabsContent value="cancelled">
            <AppointmentList aptData={filterAppointments("cancelled")} />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default MyAppointments;
