import Loading from "@/components/Loading";
import VerifyEmail from "@/components/VerifyEmail";
import React, { Suspense } from "react";

const VerifyEmailPage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <VerifyEmail />
    </Suspense>
  );
};

export default VerifyEmailPage;
