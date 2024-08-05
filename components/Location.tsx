"use client";

import React from "react";
import { motion } from "framer-motion";
import { textVariant } from "@/utils/motion";
import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

const Location = () => {
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
          Visit Us
        </motion.p>
        <motion.p
          variants={textVariant(0.5)}
          whileInView="show"
          initial="hidden"
          viewport={{ once: true, amount: 0.25 }}
          className="!leading-relaxed font-manrope md:text-[20px] mb-5 text-center"
        >
          Even better, visit us in person!
        </motion.p>
        <div className="block md:flex">
          <div className="md:w-1/2 md:hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.3127125536!2d73.8044870834696!3d18.55993533752529!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bf66003c3549%3A0xf1edb518aeda0409!2sDental%20Care%20Solutions%20-%20Dental%20clinic%20in%20Aundh%20%2FBest%20Dentist%20in%20Aundh%20%2CPune!5e0!3m2!1sen!2sin!4v1722612879058!5m2!1sen!2sin"
              width="100%"
              height="100%"
              allowFullScreen
              loading="lazy"
              className="min-h-80"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <div className="md:w-1/2 bg-black/80 p-5 md:rounded-tl-2xl md:rounded-bl-2xl text-white">
            <div className="mb-10">
              <h3 className="font-abril text-2xl mb-3">Clinic Address</h3>
              <p className="!leading-relaxed font-manrope md:text-[20px]">
                101, Elpis IVF and Maternity Hospital, Parihar Chowk, ITI Rd,
                beside Malabar Gold and Diamonds, Aundh, Pune, Maharashtra
                411007
              </p>
            </div>

            <div className="mb-10">
              <h3 className="font-abril text-2xl mb-3">Business Hours</h3>
              <p className="!leading-relaxed font-manrope md:text-[20px]">
                Monday to Saturday: 10:00 AM - 8:00 PM
              </p>
            </div>

            <div>
              <h3 className="font-abril text-2xl mb-3">Contact Information</h3>
              <div className="my-5">
                <div className="flex gap-2 items-center my-3">
                  <EnvelopeIcon className=" font-manrope w-6 h-6" />
                  <Link
                    href="mailto:dentalsmileshinellp@gmail.com"
                    className=" font-manrope md:text-lg"
                  >
                    dentalsmileshinellp@gmail.com
                  </Link>
                </div>
                <div className="flex gap-2 items-center my-3">
                  <PhoneIcon className=" font-manrope w-6 h-6" />
                  <Link
                    href="tel:+917972659371"
                    className=" font-manrope md:text-lg"
                  >
                    +91 79726 59371
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 hidden md:block">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.3127125536!2d73.8044870834696!3d18.55993533752529!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bf66003c3549%3A0xf1edb518aeda0409!2sDental%20Care%20Solutions%20-%20Dental%20clinic%20in%20Aundh%20%2FBest%20Dentist%20in%20Aundh%20%2CPune!5e0!3m2!1sen!2sin!4v1722612879058!5m2!1sen!2sin"
              width="100%"
              height="100%"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;
