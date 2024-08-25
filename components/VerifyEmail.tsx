"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { getSession } from "next-auth/react"; // or the equivalent method you're using

export default function VerifyEmail() {
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [email, setEmail] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  const [msgColor, setMsgColor] = useState<string | null>(null);

  useEffect(() => {
    const fetchEmailAndVerify = async () => {
      const session = await getSession(); // Retrieve session data
      if (session?.user?.email) {
        setEmail(session.user.email);
      } else {
        setMessage("No session found. Please log in.");
        setMsgColor("text-red-600");
        setIsLoading(false);
        return;
      }

      const token = searchParams.get("token");

      try {
        const response = await axios.get(`/api/verify-email?token=${token}`);
        setMessage(response.data.message);
        setMsgColor("text-green-600");
      } catch (error: any) {
        if (error.response?.status === 400 || error.response?.status === 404) {
          setMessage(error.response.data.message);
          setMsgColor("text-red-600");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchEmailAndVerify();
  }, [searchParams]);

  const resendVerificationEmail = async () => {
    if (!email) {
      setMessage("Email is missing. Please log in again.");
      return;
    }

    try {
      const response = await axios.post("/api/resend-verification-email", {
        email,
      });
      setMessage(response.data.message);
    } catch (error: any) {
      setMessage(
        error.response?.data?.message || "Failed to resend verification email."
      );
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 text-left bg-white shadow-md rounded-lg my-[10%]">
      <h2 className="text-2xl font-bold mb-4">Thank you for signing up!</h2>
      {message ? (
        <p>{message}</p>
      ) : (
        <p className="text-left">
          To get started, please verify your email address by clicking the link
          we’ve sent you. If you haven't received the email, click the "Resend
          Verification Email" button to request a new one.
        </p>
      )}

      <div className="mt-4 block md:flex md:justify-evenly">
        <button
          onClick={resendVerificationEmail}
          className="inline-flex px-6 py-3 mt-5 text-white transition-all duration-200 bg-gray-900 rounded-lg font-pj"
        >
          Resend Verification Email
        </button>

        <button
          onClick={() => router.push("/")}
          className="inline-flex px-6 py-3 mt-5 text-white transition-all duration-200 bg-gray-900 rounded-lg font-pj"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
}
