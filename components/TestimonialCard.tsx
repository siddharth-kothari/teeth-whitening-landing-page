import React, { useState } from "react";
import { motion } from "framer-motion";
import { fadeIn } from "@/utils/motion";

const TestimonialCard = ({ review, patient, idx }: any) => {
  return (
    <motion.div
      variants={fadeIn("right", "spring", 0.5 * idx, 0.75)}
      whileInView="show"
      initial="hidden"
      viewport={{ once: true, amount: 0.25 }}
      className="w-full p-5 grid space-y-5 rounded-md shadow-lg border text-center border-slate-800"
    >
      <blockquote>
        <div>
          <span className="relative text-lg leading-[1.6] font-normal">
            "{review}"
          </span>
        </div>
      </blockquote>
      <div>
        <span>-{patient}</span>
      </div>
    </motion.div>
  );
};

export default TestimonialCard;
