"use client";

import React from "react";
import { motion } from "framer-motion";
import { textVariant } from "@/utils/motion";

const Introduction = () => {
  return (
    <section className="pb-12 sm:pb-16 lg:pt-8">
      <div className="max-w-7xl mx-auto">
        <div className="intro-container">
          <motion.h1
            variants={textVariant(0)}
            whileInView="show"
            initial="hidden"
            viewport={{ once: true, amount: 0.25 }}
            className="font-abril text-black text-4xl sm:text-5xl !leading-tight mb-5 text-center"
          >
            Welcome to Dental Care Solutions
          </motion.h1>
          <motion.p
            variants={textVariant(0.5)}
            whileInView="show"
            initial="hidden"
            viewport={{ once: true, amount: 0.25 }}
            className="!leading-relaxed font-manrope md:text-[20px] mb-5 lg:mb-0 text-center"
          >
            At Dental Care Solutions, we offer top-notch teeth whitening
            services using the latest technology and expert care. Our
            experienced team is dedicated to helping you achieve a radiant smile
            safely and comfortably.
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default Introduction;
