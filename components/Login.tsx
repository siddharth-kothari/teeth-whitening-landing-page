"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { google_logo, logo } from "@/assets";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { LoginHelper } from "@/utils/loginHelper";

interface Errors {
  email?: string;
  password?: string;
}

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const { status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/");
    }
  }, [status, router]);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    // Validate form fields
    const validationErrors: Errors = {};
    if (email.trim() === "") {
      validationErrors.email = "Email is required";
    }
    if (password.trim() === "") {
      validationErrors.password = "Password is required";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const loginres = await LoginHelper({
      email,
      password,
    });

    //setShowToast(true);
    if (loginres && loginres.ok) {
      setEmail("");
      setPassword("");
      setErrors({});
      router.push("/");
    } else {
      // toast.error("Invalid Email or Password", {
      //   position: "top-center",
      //   autoClose: 5000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      //   theme: "light",
      // });
    }
    // Reset the form fields and errors
  };

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <section className="w-full p-4 my-5 sm:p-10 md:w-3/4 max-w-2xl mx-auto">
      <Image src={logo} alt="pats_logo" className="mx-auto max-w-[100px]" />
      <div className="w-full bg-white rounded-md shadow-lg p-6 sm:py-8 sm:px-14  mt-5">
        <p className="text-black text-center font-abril text-2xl leading-loose">
          Welcome to Dental Care Solution
        </p>

        <form onSubmit={handleLogin} className="mt-5">
          <div className="mb-4">
            <input
              type="text"
              id="email"
              className={`w-full  p-3 border text-black text-left bg-inherit rounded-lg outline-none ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div className="mb-6 relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className={`w-full  p-3 border text-black text-left bg-inherit rounded-lg outline-none ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute right-3 top-[70%] transform -translate-y-1/2 text-gray-500"
              onClick={toggleShowPassword}
            >
              {showPassword ? (
                <EyeSlashIcon className="h-5 w-5" />
              ) : (
                <EyeIcon className="h-5 w-5" />
              )}
            </button>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full mx-auto bg-[black] rounded-lg text-white py-2 px-4 outline-none button"
          >
            Sign In
          </button>
        </form>
        <div className="text-[#4f516e] w-full flex space-x-3 items-center justify-center font-light text-center font-sans uppercase my-5 text-sm">
          <Separator className="w-[100px]" />
          <span>or continue with</span>
          <Separator className="w-[100px]" />
        </div>

        <div className="flex gap-3 justify-evenly my-5">
          <div
            onClick={() => {
              signIn("google");
            }}
            className=" w-full py-3 px-5 bg-black shadow-xl rounded-md flex gap-2 justify-center items-center cursor-pointer"
          >
            <Image src={google_logo} alt="" className="w-[20px] h-[20px]" />
            <button className="text-white">Google</button>
          </div>
          <div
            onClick={() => {
              signIn("google");
            }}
            className=" w-full py-3 px-5 bg-black shadow-xl rounded-md flex gap-2 justify-center items-center cursor-pointer"
          >
            <Image src={google_logo} alt="" className="w-[20px] h-[20px]" />
            <button className="text-white">Facebook</button>
          </div>
        </div>

        <div className="text-center text-sm text-[#4f516e]">
          Don&apos;t have an account?{" "}
          <Link className="text-black font-extrabold" href="/register">
            Sign Up Now.
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Login;
