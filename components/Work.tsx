"use client";

import { work1, work2 } from "@/assets";
import { fadeIn, textVariant, zoomIn } from "@/utils/motion";
import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";

const Work = () => {
  return (
    <section className="pt-12 pb-12 sm:pb-16 lg:pt-8">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <motion.p
          variants={textVariant(0)}
          whileInView="show"
          initial="hidden"
          viewport={{ once: true, amount: 0.25 }}
          className=" font-abril text-black text-4xl sm:text-5xl !leading-tight mb-3 text-center"
        >
          Our Work
        </motion.p>
        <motion.p
          variants={textVariant(0.5)}
          whileInView="show"
          initial="hidden"
          viewport={{ once: true, amount: 0.25 }}
          className="!leading-relaxed font-manrope md:text-[20px] mb-5 text-center"
        >
          Our results speak louder than words!
        </motion.p>
        <motion.div
          variants={fadeIn("bottom", "spring", 0.25, 1)}
          whileInView="show"
          initial="hidden"
          viewport={{ once: true, amount: 0.25 }}
          className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-y-10 xl:gap-x-10 place-content-center"
        >
          <video
            controls
            className="shadow-2xl shadow-gray-600 rounded-md w-full lg:-rotate-2"
          >
            <source src="work-video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <Image
            src={work1}
            alt=""
            className="shadow-2xl shadow-gray-600 rounded-md w-full lg:rotate-2"
          />
          <Image
            src={work2}
            alt=""
            className="shadow-2xl shadow-gray-600 rounded-md w-full lg:-rotate-2"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Work;
