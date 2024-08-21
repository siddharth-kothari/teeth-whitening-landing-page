"use client";

import { headerLogo } from "@/assets";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { cn } from "@/lib/utils";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { signOut, useSession } from "next-auth/react";
import HamburgerMenu from "./HamBurgerMenu";

const Header = () => {
  const { data: session, status } = useSession();

  const user: any = session?.user;
  const name = user?.name.split(" ") ?? "User";
  const components: { title: string; href: string }[] = [
    {
      title: "Teeth Whitening",
      href: "/treatments/teeth-whitening",
    },
  ];
  return (
    <header className="py-5 sticky top-0 z-10 bg-[#f9fafb]">
      <div className="container px-4 mx-auto sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="lg:w-1/3">
            <Link href="/" title="home" className="flex rounded outline-none">
              <Image className="w-auto h-8" src={headerLogo} alt="" />
            </Link>
          </div>

          <div className="flex lg:hidden">
            {/* <button type="button" className="text-gray-900">
              <svg
                className="w-7 h-7"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  stroke-linejoin="round"
                  strokeWidth="1.5"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </button> */}
            <HamburgerMenu />
          </div>

          <div className="hidden lg:block w-1/3">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link href="/about-us" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      About Us
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Treatments</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:grid-cols-3 lg:w-[600px] ">
                      {components.map((component) => (
                        <ListItem
                          key={component.title}
                          title={component.title}
                          href={component.href}
                        ></ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/contact-us" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      Contact Us
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="hidden lg:block w-1/3 ">
            {status === "authenticated" && user && (
              <NavigationMenu className="m-0 ml-auto">
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Hi, {name[0]}</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="p-2 w-[200px]">
                        <ListItem
                          key="My Appointments"
                          title="My Appointments"
                          href="/profile/my-appointments"
                        ></ListItem>
                        <div
                          onClick={() => signOut()}
                          className="text-sm font-medium block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer"
                        >
                          Log Out
                        </div>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            )}
            {!user && (
              <div className="hidden lg:block text-end">
                <Link href="/login" className="mr-2">
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="text-white bg-black border-0 p-2 rounded"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export default Header;
