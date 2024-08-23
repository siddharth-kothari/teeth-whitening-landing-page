"use client";

import React, { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { api } from "@/app/api";
import { useRouter } from "next/navigation";
import axios from "axios";
import { LoginHelper } from "@/utils/loginHelper";
import Image from "next/image";
import bcrypt from "bcryptjs";
import { logo } from "@/assets";
import IntlTelInput, { intlTelInput } from "intl-tel-input/react";
import "intl-tel-input/build/css/intlTelInput.css";
import Link from "next/link";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const errorMap = [
  "Invalid number",
  "Invalid country code",
  "Too short",
  "Too long",
  "Invalid number",
];

const Register: React.FC = () => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [country, setCountry] = useState("");
  const [email, setEmail] = useState("");
  const [mobileno, setMobileNo] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [errorCode, setErrorCode] = useState<number | null>(null);
  const router = useRouter();

  interface Errors {
    firstname?: string;
    lastname?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    mobileno?: string;
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const countryData = intlTelInput.getCountryData();

    const countryname: any = countryData.find((item) => item.iso2 === country);

    // Get the country name if it exists
    const countryName = country ? countryname.name : "Country not found";

    console.log("countryName", countryName);
    // Validate form fields
    const validationErrors: Errors = {};
    if (firstname.trim() === "") {
      validationErrors.firstname = "First name is required";
    }
    if (lastname.trim() === "") {
      validationErrors.lastname = "Last name is required";
    }
    if (email.trim() === "") {
      validationErrors.email = "Email is required";
    }
    if (password.trim() === "") {
      validationErrors.password = "Password is required";
    }
    if (confirmPassword.trim() === "") {
      validationErrors.confirmPassword = "Confirm Password is required";
    }
    if (password !== confirmPassword) {
      validationErrors.password = "Passwords do not match";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    //var filename;

    // if (profilePicture) {
    //   const checksum = await computeSHA256(profilePicture);
    //   filename = `${Date.now()}_${profilePicture?.name.replaceAll(" ", "_")}`;
    //   const signedURLResult = await getSignedURL(
    //     "register",
    //     "users",
    //     filename,
    //     profilePicture?.type,
    //     profilePicture?.size,
    //     checksum
    //   );

    //   if (signedURLResult.failure !== undefined) {
    //     console.error(signedURLResult.failure);
    //     alert(signedURLResult.failure);
    //     return;
    //   }

    //   const url = signedURLResult.success.url;
    //   var response;
    //   response = await fetch(url, {
    //     method: "PUT",
    //     headers: {
    //       "Content-Type": profilePicture.type,
    //     },
    //     body: profilePicture,
    //   });
    // }
    if (isValid) {
      try {
        const hashedPass = await bcrypt.hash(password, 5);
        //if (typeof response === "undefined" || response?.status == 200) {
        const userData = {
          firstname,
          lastname,
          email,
          password: hashedPass,
          mobileno,
        };
        var body = JSON.stringify(userData);
        const { data } = await api.post(`/api/register`, body);

        if (data.status === 201) {
          const loginres = await LoginHelper({
            email,
            password,
          });
          if (loginres && loginres.ok) {
            setFirstName("");
            setLastName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            setErrors({});
            router.push("/");
          }
        }
        // } else {
        //   alert(response?.status + " " + response?.statusText);
        // }
      } catch (error: any) {
        if (axios.isAxiosError(error)) {
          if (error.response) {
            const message = error.response.data.message || error.response.data;
            validationErrors.email = message;
            setErrors(validationErrors);
          } else if (error.request) {
            alert("No response received from server.");
          } else {
            alert(`Error setting up request: ${error.message}`);
          }
        } else {
          alert(`Unexpected error: ${error.message}`);
        }
        console.error(error.message);
      }
    } else {
      const errorMessage = errorMap[errorCode || 0] || "Invalid number";
      validationErrors.mobileno = errorMessage;
      setErrors(validationErrors);
    }

    // Reset the form fields and errors
  };

  // const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files && event.target.files[0];

  //   if (file) {
  //     setProfilePicture(file);
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setProfilePicturePreview(reader.result as string);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <section className="w-full p-4 my-5 sm:p-10 lg:w-3/4 max-w-3xl mx-auto">
      <Image src={logo} alt="pats_logo" className="mx-auto max-w-[100px]" />
      <div className="w-full bg-white rounded-md shadow-lg p-6 sm:py-8 sm:px-5  mt-5">
        <p className="text-black text-center font-abril text-2xl leading-loose">
          Welcome to Dental Care Solution
        </p>
        <form onSubmit={handleSubmit} className="mt-8 w-full">
          {/* <div className=" w-fit mx-auto mb-4 items-center">
            <div className="mx-auto relative">
              {profilePicturePreview ? (
                <img
                  src={profilePicturePreview}
                  alt="Profile Preview"
                  className="mt-2 w-32 h-32 object-fill object-center rounded-[50%]"
                />
              ) : (
                <>
                  <Image
                    className="mt-2 max-w-[8rem] relative object-cover cursor-pointer object-center rounded-[50%]"
                    src={defaultPic}
                    alt=" Default Profile Preview"
                  />
                  <label
                    className="w-full absolute bottom-0 overflow-hidden text-center text-black h-[25%] bg-[#000]/40 cursor-pointer hover:cursor-pointer"
                    htmlFor="profilePicture"
                  >
                    Browse
                  </label>
                </>
              )}

              <input
                type="file"
                id="profilePicture"
                accept="image/*"
                className="w-full absolute bottom-0 overflow-hidden opacity-0"
                onChange={handleFileChange}
              />
            </div>
          </div> */}
          <div className="block sm:flex sm:space-x-3 w-full">
            <div className="mb-4 w-full">
              <label
                htmlFor="first_name"
                className="block text-black text-sm font-medium mb-2"
              >
                First Name
              </label>
              <input
                type="text"
                id="first_name"
                className={`w-full px-3 py-2 border bg-inherit text-black rounded-md outline-none ${
                  errors.firstname ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter first name"
                value={firstname}
                onChange={(e) => setFirstName(e.target.value)}
              />
              {errors.firstname && (
                <p className="text-red-500 text-sm mt-1">{errors.firstname}</p>
              )}
            </div>
            <div className="mb-4 w-full">
              <label
                htmlFor="lastname"
                className="block text-black text-sm font-medium mb-2"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastname"
                className={`w-full px-3 py-2 border bg-inherit text-black rounded-md outline-none ${
                  errors.lastname ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter your lastname"
                value={lastname}
                onChange={(e) => setLastName(e.target.value)}
              />
              {errors.lastname && (
                <p className="text-red-500 text-sm mt-1">{errors.lastname}</p>
              )}
            </div>
          </div>

          <div className="block sm:flex sm:space-x-3 w-full">
            <div className="mb-4 w-full">
              <label
                htmlFor="email"
                className="block text-black text-sm font-medium mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className={`w-full px-3 py-2 border bg-inherit text-black rounded-md outline-none ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>
            <div className="mb-4 w-full">
              <label
                htmlFor="mobileno"
                className="block text-black text-sm font-medium mb-2"
              >
                Mobile Number
              </label>
              <div
                className={`w-full px-3 py-2 border bg-inherit text-black rounded-md outline-none ${
                  errors.mobileno ? "border-red-500" : "border-gray-300"
                }`}
              >
                <IntlTelInput
                  onChangeNumber={setMobileNo}
                  onChangeCountry={setCountry}
                  onChangeValidity={setIsValid}
                  onChangeErrorCode={setErrorCode}
                  inputProps={{
                    className: "bg-transparent outline-none ring-transparent",
                  }}
                  initOptions={{
                    initialCountry: "in",
                    utilsScript:
                      "https://cdn.jsdelivr.net/npm/intl-tel-input@23.8.1/build/js/utils.js",
                  }}
                />
              </div>
              {errors.mobileno && (
                <p className="text-red-500 text-sm mt-1">{errors.mobileno}</p>
              )}
            </div>
          </div>

          <div className="block sm:flex sm:space-x-3 w-full">
            <div className="mb-4 w-full">
              <label
                htmlFor="password"
                className="block text-black text-sm font-medium mb-2"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className={`w-full px-3 py-2 border bg-inherit text-black rounded-md outline-none ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute top-[30%] right-2 focus:outline-none"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <EyeIcon className="h-5 w-5 text-black" />
                  ) : (
                    <EyeSlashIcon className="h-5 w-5 text-black" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>
            <div className="mb-4 w-full">
              <label
                htmlFor="confirmPassword"
                className="block text-black text-sm font-medium mb-2"
              >
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  className={`w-full px-3 py-2 border bg-inherit text-black rounded-md outline-none ${
                    errors.confirmPassword
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute top-[30%] right-2 focus:outline-none"
                  onClick={toggleConfirmPasswordVisibility}
                >
                  {showConfirmPassword ? (
                    <EyeIcon className="h-5 w-5 text-black" />
                  ) : (
                    <EyeSlashIcon className="h-5 w-5 text-black" />
                  )}
                </button>
              </div>

              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>
          </div>

          <div>
            <span className="text-sm font-light text-[#4f516e]">
              By continuing, you agree to Dental Care Solutions'{" "}
              <Link href="/" className="font-extrabold">
                Terms of Service
              </Link>{" "}
              &{" "}
              <Link href="/" className="font-extrabold">
                Privacy Policy
              </Link>
            </span>
          </div>

          <div className="w-full flex">
            <button
              type="submit"
              className="w-[40%] mx-auto bg-black text-white py-2 px-4 rounded-md focus:outline-none mt-4"
            >
              Register
            </button>
          </div>
        </form>

        <div className="mt-5 text-center text-sm text-[#4f516e]">
          Already have an account?{" "}
          <Link className="text-black font-extrabold" href="/login">
            Sign In.
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Register;
