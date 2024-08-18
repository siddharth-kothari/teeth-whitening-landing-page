"use client";

import { headerLogo } from "@/assets";
import Image from "next/image";
import Link from "next/link";

import React, { useState } from "react";
import {
  HoveredLink,
  Menu,
  MenuItem,
  ProductItem,
} from "@/components/ui/navbar-menu";
import { cn } from "@/lib/utils";

const Header = () => {
  const [active, setActive] = useState<string | null>(null);
  return (
    <header className="sticky top-0 z-10 bg-blur">
      <div className="container px-4 mx-auto sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex-shrink-0">
            <Link href="/" title="home" className="flex rounded outline-none">
              <Image className="w-auto h-8" src={headerLogo} alt="" />
            </Link>
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

          <Menu setActive={setActive}>
            <MenuItem
              setActive={setActive}
              active={active}
              item="About Us"
              isSubMenu={false}
              href="/about-us"
            ></MenuItem>
            <MenuItem
              setActive={setActive}
              active={active}
              item="Treatments"
              isSubMenu={true}
            >
              <div className="grid grid-cols-3 gap-10 p-2">
                <HoveredLink href="/treatments/teeth-whitening">
                  Teeth Whitening
                </HoveredLink>
              </div>
            </MenuItem>
            <MenuItem
              setActive={setActive}
              active={active}
              item="Contact Us"
              isSubMenu={false}
              href="/contact-us"
            ></MenuItem>
          </Menu>

          <div className="hidden lg:flex lg:items-center lg:space-x-8 xl:space-x-10">
            <a
              href="#"
              title=""
              className="px-5 py-2 text-base font-bold leading-7 text-white transition-all duration-200 bg-gray-900 rounded-lg font-pj"
              role="button"
            >
              Book Appointment
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
