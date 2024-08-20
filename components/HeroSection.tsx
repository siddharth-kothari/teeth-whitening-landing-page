"use client";

import { heroImage } from "@/assets";
import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { textVariant, zoomIn, fadeIn } from "@/utils/motion";
import BookAppointment from "./BookAppointment";

const HeroSection = () => {
  return (
    <div className="bg-gray-50">
      <section className="pt-12 pb-12 sm:pb-16 lg:pt-8">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid max-w-lg grid-cols-1 mx-auto lg:max-w-full lg:items-center lg:grid-cols-2 gap-y-12 lg:gap-x-16">
            <div>
              <div className="text-center lg:text-left">
                <motion.h1
                  variants={textVariant(0)}
                  whileInView="show"
                  initial="hidden"
                  viewport={{ once: true, amount: 0.25 }}
                  className="text-4xl font-abril leading-tight text-gray-900 sm:text-5xl sm:leading-tight lg:leading-tight lg:text-6xl font-pj"
                >
                  Discover Your Brightest Smile with Teeth Whitening at Dental
                  Care Solutions
                </motion.h1>
                <motion.p
                  variants={textVariant(0.5)}
                  whileInView="show"
                  initial="hidden"
                  viewport={{ once: true, amount: 0.25 }}
                  className="mt-2 text-lg text-gray-600 sm:mt-8 font-inter"
                >
                  Expert Care at Dental Care Solutions - Book Your Appointment
                  Today!
                </motion.p>
                <BookAppointment
                  button_title="Schedule Your Appointment Now"
                  style="button"
                />
              </div>
            </div>

            <motion.div
              variants={fadeIn("bottom", "spring", 0, 1)}
              whileInView="show"
              initial="hidden"
              viewport={{ once: true, amount: 0.25 }}
              className="relative"
            >
              <Image className="w-full" src={heroImage} alt="" />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default HeroSection;
