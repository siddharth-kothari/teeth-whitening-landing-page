"use client";

import { contactImage, loading } from "@/assets";
import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { textVariant, zoomIn, fadeIn } from "@/utils/motion";
import ReCAPTCHA from "react-google-recaptcha";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [aptDate, setAptDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [showtoast, setShowToast] = useState(false);
  const recaptcha = useRef<ReCAPTCHA>(null);

  interface Errors {
    name?: string;
    email?: string;
    phone?: string;
    message?: string;
    aptDate?: string;
  }

  useEffect(() => {
    const input = document.getElementById("aptDate") as HTMLInputElement;

    if (input) {
      const date = new Date();
      const offset = 5.5 * 60 * 60 * 1000;
      const now = new Date(date.getTime() + offset).toISOString().slice(0, 16);
      setAptDate(now);
    }
  }, []);

  if (hydrated) {
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const phoneRegex = /^[0-9]{10}$/;
    // var phoneResult = phoneRegex.test(phone);

    // Validate form fields
    const validationErrors: Errors = {};
    if (name.trim() === "") {
      validationErrors.name = "First Name is required";
    }

    if (email.trim() === "") {
      validationErrors.email = "Email is required";
    }

    if (phone.trim() === "") {
      validationErrors.phone = "Phone number is required";
    }

    if (!phoneRegex.test(phone)) {
      validationErrors.phone = "Please enter a valid number";
    }

    if (message.trim() === "") {
      validationErrors.message = "Message is required";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    console.log(aptDate);
    function formatDate(date: any) {
      console.log(date);
      const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      };
      if (date != "" || date != null) {
        return new Intl.DateTimeFormat("en-US", options).format(date);
      }
    }

    const currentDate = new Date(aptDate);
    const formattedDate = hydrated ? formatDate(currentDate) : "";

    var msg =
      "Hello, I want to book an appointment.\n Details:\n Name: " +
      name +
      " " +
      "\n Email: " +
      email +
      "\n Mobile No.: " +
      phone +
      "\n Appointment date: " +
      formattedDate +
      "\n Message: " +
      message;
    setIsLoading(true);

    const captchaValue = recaptcha.current?.getValue();

    if (!captchaValue) {
      setIsLoading(false);
      setShowToast(true);
      //   toast.error("Please verify the reCAPTCHA!", {
      //     position: "top-center",
      //     autoClose: 2000,
      //     hideProgressBar: false,
      //     closeOnClick: true,
      //     pauseOnHover: true,
      //     draggable: true,
      //     progress: undefined,
      //     theme: "dark",
      //   });
    } else {
      window.open(
        "https://wa.me/918668295955?text=" + encodeURIComponent(msg),
        "_blank"
      );

      //   emailjs
      //     .send(
      //       "service_husnupj",
      //       "template_ydxe9p8",
      //       {
      //         from_name: name + " " + lastname,
      //         to_name: "Glam2Door Support",
      //         from_email: email,
      //         to_email: "contact.glam2door@gmail.com",
      //         reply_to: email,
      //         message: msg,
      //       },
      //       "KOjcP3ph_caGJz32n"
      //     )
      //     .then(
      //       () => {
      //         setIsLoading(false);
      //         // alert(
      //         //   "Thanks for reaching out to us. We will get back to you as soon as possible."
      //         // );

      //         setFirstname("");
      //         setLastname("");
      //         setEmail("");
      //         setPhone("");
      //         setMessage("");
      //         setAptDate("");
      //         setService("");
      //         setShowToast(true);
      //         toast.success("Message sent successfully!", {
      //           position: "top-center",
      //           autoClose: 2000,
      //           hideProgressBar: false,
      //           closeOnClick: true,
      //           pauseOnHover: true,
      //           draggable: true,
      //           progress: undefined,
      //           theme: "dark",
      //         });

      //         setTimeout(() => {
      //           window.open("/", "");
      //         }, 2500);
      //       },
      //       (error) => {
      //         setIsLoading(false);
      //         console.log(error.text);
      //         setShowToast(true);
      //         toast.error("Something went wrong!", {
      //           position: "top-center",
      //           autoClose: 2000,
      //           hideProgressBar: false,
      //           closeOnClick: true,
      //           pauseOnHover: true,
      //           draggable: true,
      //           progress: undefined,
      //           theme: "dark",
      //         });
      //       }
      //     );
    }
  };

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
          Contact Us
        </motion.p>
        <motion.p
          variants={textVariant(0.5)}
          whileInView="show"
          initial="hidden"
          viewport={{ once: true, amount: 0.25 }}
          className="!leading-relaxed font-manrope md:text-[20px] lg:mb-0 text-center"
        >
          Ready to unveil a brighter, more confident smile? Don’t wait any
          longer—your dazzling new look is just an appointment away! Schedule
          your teeth whitening session today.
        </motion.p>

        <div className="grid grid-cols-1 mx-auto md:max-w-full md:items-center md:grid-cols-2 gap-y-6 mt-10 border border-slate-800 p-5 rounded-xl">
          <motion.div
            variants={fadeIn("bottom", "spring", 0, 1)}
            whileInView="show"
            initial="hidden"
            viewport={{ once: true, amount: 0.25 }}
            className="relative"
          >
            <Image className="w-full max-w-[90%]" src={contactImage} alt="" />
          </motion.div>
          <form
            onSubmit={handleSubmit}
            className="lg:w-[100%] sm:max-w-[80%] mx-auto"
          >
            <p className="m-0 font-abril text-2xl mb-3 py-2">
              Request Your Appointment
            </p>
            <div className="block md:flex md:justify-between md:items-center md:gap-8">
              <div className="mb-4 w-full">
                <label
                  htmlFor="name"
                  className="block text-black font-manrope text-sm font-medium mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className={`w-full p-2 border rounded px-2 bg-inherit placeholder:text-slate-500 text-black font-manrope outline-none ${
                    errors.name ? "border-red-500" : "border-black"
                  }`}
                  placeholder="Enter your first name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>
            </div>

            <div className="mb-4 w-full">
              <label
                htmlFor="email"
                className="block text-black font-manrope text-sm font-medium mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className={`w-full p-2 border rounded px-2 bg-inherit placeholder:text-slate-500 text-black font-manrope outline-none ${
                  errors.email ? "border-red-500" : "border-black"
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
                htmlFor="phone"
                className="block text-black font-manrope text-sm font-medium mb-2"
              >
                Phone
              </label>
              <div className="relative">
                <input
                  type="tel"
                  id="phone"
                  className={`w-full p-2 border rounded px-2 bg-inherit placeholder:text-slate-500 text-black font-manrope outline-none ${
                    errors.phone ? "border-red-500" : "border-black"
                  }`}
                  placeholder="Enter your phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
              )}
            </div>

            <div className="mb-4 w-full">
              <label
                htmlFor="aptDate"
                className="block text-black font-manrope text-sm font-medium mb-2"
              >
                Appointment Date
              </label>
              <div className="relative">
                <input
                  type="datetime-local"
                  id="aptDate"
                  className={`w-full p-2 border rounded px-2 bg-inherit placeholder:text-slate-500 text-black font-manrope outline-none ${
                    errors.aptDate ? "border-red-500" : "border-black"
                  }`}
                  placeholder="Enter Appointment date"
                  value={aptDate}
                  onChange={(e) => setAptDate(e.target.value)}
                />
              </div>
              {errors.aptDate && (
                <p className="text-red-500 text-sm mt-1">{errors.aptDate}</p>
              )}
            </div>

            <div className="mb-4 ">
              <label
                htmlFor="message"
                className="block text-black font-manrope text-sm font-medium mb-2"
              >
                Comments/Questions
              </label>
              <div className="relative">
                <textarea
                  id="message"
                  className={`w-full p-2 border rounded px-2 bg-inherit placeholder:text-slate-500 text-black font-manrope outline-none ${
                    errors.message ? "border-red-500" : "border-black"
                  }`}
                  placeholder="Write your message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>

              {errors.message && (
                <p className="text-red-500 text-sm mt-1">{errors.message}</p>
              )}
            </div>

            <ReCAPTCHA
              ref={recaptcha}
              sitekey={
                process.env.NEXT_PUBLIC_RECAPTCHA_KEY != null
                  ? process.env.NEXT_PUBLIC_RECAPTCHA_KEY
                  : "process.env.RECAPTCHA_KEY"
              }
            />

            <div className="w-full flex justify-center">
              <button
                type="submit"
                className="inline-flex px-6 py-3 mt-5 text-lg font-bold text-white transition-all duration-200 bg-gray-900 rounded-lg  font-pj"
              >
                Send Message
                {isLoading && (
                  <>
                    &nbsp;&nbsp;
                    <Image
                      quality={50}
                      src={loading}
                      alt="loading..."
                      className="h-6 w-6"
                    />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
