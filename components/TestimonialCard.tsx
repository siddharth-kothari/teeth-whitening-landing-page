import React, { useState } from "react";
import { motion } from "framer-motion";
import { fadeIn } from "@/utils/motion";

const TestimonialCard = ({ review, patient, idx, rating, experience }: any) => {
  const [ratings] = useState(Math.round(rating));

  return (
    <motion.div
      variants={fadeIn("right", "spring", 0.5 * idx, 0.75)}
      whileInView="show"
      initial="hidden"
      viewport={{ once: true, amount: 0.25 }}
      className="w-full p-5 grid space-y-5 rounded-md shadow-lg border text-center border-slate-800"
    >
      <div className="flex space-x-1 justify-center">
        {Array(rating)
          .fill(0)
          .map((_, i) => (
            <span className="text-3xl text-black">&#9733;</span>
          ))}
      </div>
      <p className="font-abril text-2xl">{experience}</p>
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
