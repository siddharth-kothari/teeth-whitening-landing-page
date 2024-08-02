"use client";

import React from "react";
import { motion } from "framer-motion";
import { fadeIn, textVariant } from "@/utils/motion";

const Benefits = () => {
  return (
    <section className="pb-12 sm:pb-16 lg:pt-8 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.p
          variants={textVariant(0)}
          whileInView="show"
          initial="hidden"
          viewport={{ once: true, amount: 0.25 }}
          className=" font-abril text-black text-4xl sm:text-5xl !leading-tight mb-5 text-center"
        >
          Why Choose Our Teeth Whitening Services?
        </motion.p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-y-10 xl:gap-x-10">
          <motion.div
            variants={fadeIn("right", "spring", 0.5 * 0, 0.75)}
            whileInView="show"
            initial="hidden"
            viewport={{ once: true, amount: 0.25 }}
          >
            <p className="font-bold md:text-[20px] mb-1">
              Quick and Safe Whitening
            </p>
            <p className="">
              It takes 45 min to make your teeth 8 shades brighter.
            </p>
          </motion.div>

          <motion.div
            variants={fadeIn("right", "spring", 0.5 * 1, 0.75)}
            whileInView="show"
            initial="hidden"
            viewport={{ once: true, amount: 0.25 }}
          >
            <p className="font-bold md:text-[20px] mb-1">
              Long-Lasting Results
            </p>
            <p className="">
              With proper care, enjoy your bright smile for up to a year.
            </p>
          </motion.div>

          <motion.div
            variants={fadeIn("right", "spring", 0.5 * 2, 0.75)}
            whileInView="show"
            initial="hidden"
            viewport={{ once: true, amount: 0.25 }}
          >
            <p className="font-bold md:text-[20px] mb-1">
              Comfortable and Painless
            </p>
            <p className="">
              Our procedure is completely painless, with no sensitivity
              afterward.
            </p>
          </motion.div>

          <motion.div
            variants={fadeIn("right", "spring", 0.5 * 3, 0.75)}
            whileInView="show"
            initial="hidden"
            viewport={{ once: true, amount: 0.25 }}
          >
            <p className="font-bold md:text-[20px] mb-1">Affordable Pricing</p>
            <p className="">Transparent pricing with no hidden fees.</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
