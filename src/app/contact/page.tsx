"use client";
import React from "react";
import ContactForm from "@/components/contactForm";

export default function Page() {
  return (
    <div className="relative min-h-screen flex justify-center items-center lg:px-4">
      {/* Transparent form wrapper */}
      <div className="">
        <ContactForm />
      </div>
    </div>
  );
}
