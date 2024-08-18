"use client";

import { headerLogo } from "@/assets";
import { zoomIn } from "@/utils/motion";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { insta, mail, phone, whatsapp } from "@/assets";

const Footer = () => {
  var year = new Date().getFullYear();
  return (
    <section className="border-t py-10 bg-gray-50 sm:pt-16">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-2 md:col-span-3 lg:grid-cols-6 gap-y-16 gap-x-12">
          <div className="col-span-2 md:col-span-3 lg:col-span-2 lg:pr-8">
            <Image className="w-auto h-9" src={headerLogo} alt="" />

            <p className="text-base leading-relaxed text-gray-600 mt-7">
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do
              amet sint. Velit officia consequat duis enim velit mollit.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold tracking-widest text-gray-400 uppercase">
              Quick Links
            </p>

            <ul className="mt-6 space-y-4">
              <li>
                <Link
                  href="/"
                  title=""
                  className="flex text-base text-black transition-all duration-200 hover:font-extrabold"
                >
                  {" "}
                  Home{" "}
                </Link>
              </li>
              <li>
                <Link
                  href="/about-us"
                  title=""
                  className="flex text-base text-black transition-all duration-200 hover:font-extrabold"
                >
                  {" "}
                  About Us{" "}
                </Link>
              </li>
              <li>
                <Link
                  href="/about-us"
                  title=""
                  className="flex text-base text-black transition-all duration-200 hover:font-extrabold"
                >
                  {" "}
                  Treatments{" "}
                </Link>
              </li>
              <li>
                <Link
                  href="/about-us"
                  title=""
                  className="flex text-base text-black transition-all duration-200 hover:font-extrabold"
                >
                  {" "}
                  Blogs{" "}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold tracking-widest text-gray-400 uppercase">
              Help
            </p>

            <ul className="mt-6 space-y-4">
              <li>
                <Link
                  href="/contact-us"
                  title=""
                  className="flex text-base text-black transition-all duration-200 hover:font-extrabold"
                >
                  {" "}
                  Contact Us{" "}
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-2 md:col-span-3 lg:col-span-2 lg:pr-8">
            <p className="text-sm font-semibold tracking-widest text-gray-400 uppercase">
              Connect with us
            </p>

            <ul className="list-none flex items-center space-x-10 mt-6">
              <motion.li
                variants={zoomIn(0, 0.2, 1.25)}
                whileHover="show"
                initial="hidden"
                viewport={{ once: true, amount: 0.25 }}
                className={`cursor-pointer`}
              >
                <Link href="https://www.instagram.com/" target="blank">
                  <Image
                    quality={50}
                    src={insta}
                    width={28}
                    height={28}
                    alt="instagram"
                  />
                </Link>
              </motion.li>

              <motion.li
                variants={zoomIn(0, 0.2, 1.25)}
                whileHover="show"
                initial="hidden"
                viewport={{ once: true, amount: 0.25 }}
                className={`cursor-pointer`}
              >
                <Link href={`https://wa.me/917972659371`} target="blank">
                  <Image
                    quality={50}
                    src={whatsapp}
                    width={28}
                    height={28}
                    alt="whatsapp"
                  />
                </Link>
              </motion.li>

              <motion.li
                variants={zoomIn(0, 0.2, 1.25)}
                whileHover="show"
                initial="hidden"
                viewport={{ once: true, amount: 0.25 }}
                className={`cursor-pointer`}
              >
                <Link
                  href="mailto:dentalsmileshinellp@gmail.com"
                  target="blank"
                >
                  <Image
                    quality={50}
                    src={mail}
                    width={28}
                    height={28}
                    alt="mail"
                  />
                </Link>
              </motion.li>

              <motion.li
                variants={zoomIn(0, 0.2, 1.25)}
                whileHover="show"
                initial="hidden"
                viewport={{ once: true, amount: 0.25 }}
                className={`cursor-pointer`}
              >
                <Link href="tel:+917972659371" target="blank">
                  <Image
                    quality={50}
                    src={phone}
                    width={28}
                    height={28}
                    alt="phone"
                  />
                </Link>
              </motion.li>
            </ul>
          </div>
        </div>

        <hr className="mt-16 mb-10 border-gray-200" />

        <p className="text-sm text-center text-gray-600">
          &copy; Copyright {year}, All Rights Reserved by Dental Care Solutions.
        </p>
      </div>
    </section>
  );
};
export default Footer;
