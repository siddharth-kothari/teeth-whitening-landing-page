"use client";

import React from "react";
import { motion } from "framer-motion";
import { fadeIn, textVariant } from "@/utils/motion";
import TestimonialCard from "./TestimonialCard";

const Testimonials = () => {
  return (
    <section className="pb-12 sm:pb-16 lg:pt-8">
      <div className="max-w-7xl mx-auto">
        <motion.p
          variants={textVariant(0)}
          whileInView="show"
          initial="hidden"
          viewport={{ once: true, amount: 0.25 }}
          className=" font-abril text-black text-4xl sm:text-5xl !leading-tight mb-8 text-center"
        >
          What Our Patients Have to Say
        </motion.p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-y-10 xl:gap-x-10 px-4">
          <TestimonialCard
            review={
              "I love my new smile! The team at Dental Care Solutions was amazing!"
            }
            patient={"Mitali"}
            idx={0}
            rating={5}
            experience={"Excellent Service"}
          />
          <TestimonialCard
            review={
              "I love my new smile! The team at Dental Care Solutions was amazing!"
            }
            patient={"Mitali"}
            idx={1}
            rating={4}
            experience={"Trusted & Reliable"}
          />
          <TestimonialCard
            review={
              "I love my new smile! The team at Dental Care Solutions was amazing!"
            }
            patient={"Mitali"}
            idx={2}
            rating={5}
            experience={"Excellent Service"}
          />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
