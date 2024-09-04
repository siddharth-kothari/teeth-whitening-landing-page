import { loading1 } from "@/assets";
import Image from "next/image";
import React from "react";

const Loading = () => {
  return (
    <div className="fixed z-20 top-0 grid w-[100vw] h-[100vh] bg-black/60 place-content-center">
      <Image src={loading1} alt="loading..." width={120} height={120} />
    </div>
  );
};

export default Loading;
