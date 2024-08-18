import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Teeth Whitening Treatment",
  description:
    "Dental Care Solutions offers comprehensive dental services, including advanced teeth whitening treatments, to enhance your smile. Our expert team provides personalized care in a comfortable and welcoming environment.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#f9fafb]">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
