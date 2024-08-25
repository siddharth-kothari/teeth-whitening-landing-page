import VerifyEmail from "@/components/VerifyEmail";
import React, { Suspense } from "react";

const VerifyEmailPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyEmail />
    </Suspense>
  );
};

export default VerifyEmailPage;
