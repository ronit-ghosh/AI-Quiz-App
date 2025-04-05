import type { Metadata } from "next";
import Navbar from "@/components/pages/Navbar";

export const metadata: Metadata = {
  title: "AI Quiz App",
  description: "AI Generated Quizes from pdf, images and text",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
