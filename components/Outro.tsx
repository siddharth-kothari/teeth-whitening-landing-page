"use client";

import React from "react";
import { motion } from "framer-motion";
import { textVariant, zoomIn } from "@/utils/motion";

const Outro = () => {
  return (
    <section className="pt-12 pb-12 sm:pb-16 lg:pt-8 text-center">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <motion.p
          variants={textVariant(0)}
          whileInView="show"
          initial="hidden"
          viewport={{ once: true, amount: 0.25 }}
          className=" font-abril text-black text-4xl sm:text-5xl !leading-tight mb-5"
        >
          Ready to reveal your brightest smile?
        </motion.p>
        <motion.p
          variants={textVariant(0.5)}
          whileInView="show"
          initial="hidden"
          viewport={{ once: true, amount: 0.25 }}
          className="font-manrope mb-5 md:text-[20px] md:max-w-[70%] lg:max-w-[50%] mx-auto"
        >
          Contact us today to schedule your teeth whitening appointment at
          Dental Care Solutions. Let us help you achieve the dazzling smile you
          deserve!
        </motion.p>
        <motion.div
          variants={textVariant(1)}
          whileInView="show"
          initial="hidden"
          viewport={{ once: true, amount: 0.25 }}
        >
          <motion.a
            variants={zoomIn(0, 0.2, 1.05)}
            whileHover="show"
            initial="hidden"
            href="#contact"
            className="inline-flex px-6 py-3 mt-5 text-lg font-bold text-white transition-all duration-200 bg-gray-900 rounded-lg  font-pj"
          >
            Book Your Appointment Today!
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Outro;
