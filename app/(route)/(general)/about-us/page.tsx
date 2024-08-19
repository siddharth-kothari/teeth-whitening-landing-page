import Introduction from "@/components/Introduction";
import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Dental Care Solutions",
  description:
    "Dental Care Solutions offers comprehensive dental services, including advanced teeth whitening treatments, to enhance your smile. Our expert team provides personalized care in a comfortable and welcoming environment.",
};

const AboutUs = () => {
  return (
    <>
      <Introduction />
    </>
  );
};

export default AboutUs;
