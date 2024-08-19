import Contact from "@/components/Contact";
import Location from "@/components/Location";
import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Dental Care Solutions",
  description:
    "Dental Care Solutions offers comprehensive dental services, including advanced teeth whitening treatments, to enhance your smile. Our expert team provides personalized care in a comfortable and welcoming environment.",
};

const ContactUs = () => {
  return (
    <>
      <Contact />
      <Location />
    </>
  );
};

export default ContactUs;
