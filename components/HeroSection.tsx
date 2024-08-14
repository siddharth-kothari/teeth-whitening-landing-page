"use client";

import { heroImage } from "@/assets";
import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { textVariant, zoomIn, fadeIn } from "@/utils/motion";

const HeroSection = () => {
  return (
    <div className="bg-gray-50">
      <header className="py-4 md:py-6 hidden">
        <div className="container px-4 mx-auto sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex-shrink-0">
              <a
                href="#"
                title=""
                className="flex rounded outline-none focus:ring-1 focus:ring-gray-900 focus:ring-offset-2"
              >
                <img
                  className="w-auto h-8"
                  src="https://d33wubrfki0l68.cloudfront.net/682a555ec15382f2c6e7457ca1ef48d8dbb179ac/f8cd3/images/logo.svg"
                  alt=""
                />
              </a>
            </div>

            <div className="flex lg:hidden">
              <button type="button" className="text-gray-900">
                <svg
                  className="w-7 h-7"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </button>
            </div>

            <div className="hidden lg:flex lg:ml-10 xl:ml-16 lg:items-center lg:justify-center lg:space-x-8 xl:space-x-16">
              <a
                href="#"
                title=""
                className="text-base font-medium text-gray-900 transition-all duration-200 rounded focus:outline-none font-pj hover:text-opacity-50 focus:ring-1 focus:ring-gray-900 focus:ring-offset-2"
              >
                {" "}
                Solutions{" "}
              </a>

              <a
                href="#"
                title=""
                className="text-base font-medium text-gray-900 transition-all duration-200 rounded focus:outline-none font-pj hover:text-opacity-50 focus:ring-1 focus:ring-gray-900 focus:ring-offset-2"
              >
                {" "}
                Industries{" "}
              </a>

              <a
                href="#"
                title=""
                className="text-base font-medium text-gray-900 transition-all duration-200 rounded focus:outline-none font-pj hover:text-opacity-50 focus:ring-1 focus:ring-gray-900 focus:ring-offset-2"
              >
                {" "}
                Fees{" "}
              </a>

              <a
                href="#"
                title=""
                className="text-base font-medium text-gray-900 transition-all duration-200 rounded focus:outline-none font-pj hover:text-opacity-50 focus:ring-1 focus:ring-gray-900 focus:ring-offset-2"
              >
                {" "}
                About Rareblocks{" "}
              </a>
            </div>

            <div className="hidden lg:ml-auto lg:flex lg:items-center lg:space-x-8 xl:space-x-10">
              <a
                href="#"
                title=""
                className="text-base font-medium text-gray-900 transition-all duration-200 rounded focus:outline-none font-pj hover:text-opacity-50 focus:ring-1 focus:ring-gray-900 focus:ring-offset-2"
              >
                {" "}
                Sign in{" "}
              </a>

              <a
                href="#"
                title=""
                className="px-5 py-2 text-base font-bold leading-7 text-white transition-all duration-200 bg-gray-900 border border-transparent rounded-xl hover:bg-gray-600 font-pj focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                role="button"
              >
                Create free account
              </a>
            </div>
          </div>
        </div>
      </header>

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
                <motion.div
                  variants={textVariant(1)}
                  whileInView="show"
                  initial="hidden"
                  viewport={{ once: true, amount: 0.25 }}
                  className="flex justify-center"
                >
                  <motion.a
                    variants={zoomIn(0, 0, 1.05)}
                    whileHover="show"
                    initial="hidden"
                    href="tel:+917972659371"
                    className="inline-flex px-6 py-3 mt-5 text-lg font-bold text-white transition-all duration-200 bg-gray-900 rounded-lg  font-pj"
                  >
                    Schedule Your Appointment Now
                  </motion.a>
                </motion.div>
              </div>
            </div>

            <motion.div
              variants={fadeIn("bottom", "spring", 0, 1)}
              whileInView="show"
              initial="hidden"
              viewport={{ once: true, amount: 0.25 }}
              className="relative hidden"
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
