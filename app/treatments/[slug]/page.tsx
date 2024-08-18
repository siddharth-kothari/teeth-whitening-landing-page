import React from "react";
import type { Metadata } from "next";

export const generateMetadata = ({
  params,
}: {
  params: { slug: string };
}): Metadata => {
  // Capitalize the first letter of each word in the slug
  const capitalizeSlug = params.slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return {
    title: `${capitalizeSlug} | Dental Care Solutions`,
    description:
      "Dental Care Solutions offers comprehensive dental services, including advanced teeth whitening treatments, to enhance your smile. Our expert team provides personalized care in a comfortable and welcoming environment.",
  };
};

const Treatment = ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  return <div>{slug.replace(/-/g, " ")}</div>;
};

export default Treatment;
