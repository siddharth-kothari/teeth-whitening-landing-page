"use client";

import { insta, mail, phone, whatsapp } from "@/assets";
import { zoomIn } from "@/utils/motion";
import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";
import Image from "next/image";

const Footer = () => {
  var year = new Date().getFullYear();

  return (
    <footer className="border-t px-4 md:px-8 w-full flex items-center py-10 z-20">
      <div className="w-full block text-center md:flex justify-between items-center max-w-7xl mx-auto">
        <p className="font-manrope mb-5 md:m-0">
          &copy; {year} Dental Care Solutions. All Rights Reserved.
        </p>

        <ul className="list-none flex flex-row gap-10 justify-center">
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
            <Link href={`https://wa.me/911234567890`} target="blank">
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
            <Link href="mailto:dentalsmileshinellp@gmail.com" target="blank">
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
    </footer>
  );
};

export default Footer;
