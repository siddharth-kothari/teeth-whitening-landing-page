"use client";

import React, { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { signIn, signOut, useSession } from "next-auth/react";
// import Loading from "@/app/loading";

const HamburgerMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const { data: session, status } = useSession();

  // if (status === "loading") {
  //   return <Loading />;
  // }

  const user = session?.user;
  var name = user?.name?.split(" ");
  var letter = user?.name?.charAt(0);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className="relative grid place-content-center lg:hidden">
      <button
        type="button"
        className="text-white focus:outline-none focus:white transition duration-300 ease-linear"
        onClick={toggleMenu}
      >
        {isOpen ? (
          <XMarkIcon className="h-6 w-6 text-black" />
        ) : (
          <Bars3Icon className="h-6 w-6 text-black" />
        )}
      </button>
      {isOpen && (
        <div
          className="absolute z-10 right-0 top-[20px] py-2 hover:font-bold text-black origin-top-center mt-1.5 w-48
          overflow-hidden rounded-md border bg-popover text-popover-foreground
          shadow-lg"
        >
          {!user && (
            <Link
              href="/login"
              className="cursor-pointer block px-4 py-2 text-sm hover:font-bold text-black"
            >
              Sign In
            </Link>
          )}
          <Link
            href="/"
            className="block px-4 py-2 text-sm hover:font-bold text-black transition duration-300"
          >
            Home
          </Link>

          <Link
            href="/about-us"
            className="block px-4 py-2 text-sm hover:font-bold text-black transition duration-300"
          >
            About Us
          </Link>
          <Link
            href="/contact-us"
            className="block px-4 py-2 text-sm hover:font-bold text-black transition duration-300"
          >
            Contact Us
          </Link>
          {status == "authenticated" && user && (
            <>
              <Link
                href={`/profile/my-appointments`}
                className="cursor-pointer block px-4 py-2 text-sm hover:font-bold text-black"
              >
                My Appointments
              </Link>
              <p
                onClick={() => signOut()}
                className="cursor-pointer block px-4 py-2 text-sm hover:font-bold text-black"
              >
                Log Out
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default HamburgerMenu;
