"use client";
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-[#080C14] pt-14 md:pt-20 pb-8 px-4 sm:px-6 border-t border-white/5">
      <div className="mx-auto max-w-7xl flex flex-col md:flex-row justify-between gap-12 md:gap-8 mb-14 md:mb-16">
        <div className="flex flex-col items-center md:items-start max-w-[360px] text-center md:text-left mx-auto md:mx-0">
          <div className="mb-6 flex justify-center md:justify-start">
            <img
              src="/logo.png"
              alt="Meta-Success"
              className="w-[180px] sm:w-[220px]"
              style={{ height: "auto" }}
              onError={(e) => {
                e.currentTarget.style.display = "none";
                e.currentTarget.nextElementSibling?.classList.remove("hidden");
              }}
            />
            <div className="hidden text-[#FEC722] font-bold text-3xl font-public-sans tracking-wide">Meta-Success</div>
          </div>

          <p className="text-white/80 font-prompt text-[15px] md:text-[16px] leading-relaxed">
            At the forefront of the cryptocurrency revolution, specializing in <span className="font-bold text-white">state-of-the-art Bitcoin mining</span> with cutting-edge technology.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-14 lg:gap-24 flex-1 justify-end text-center sm:text-left">
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-public-sans font-bold text-[18px] tracking-wide mb-2">What we offer</h4>
            <a href="#home" className="text-white/60 hover:text-[#FEC722] font-prompt text-[13px] transition-colors">Home</a>
            <a href="#about" className="text-white/60 hover:text-[#FEC722] font-prompt text-[13px] transition-colors">About Us</a>
            <a href="#services" className="text-white/60 hover:text-[#FEC722] font-prompt text-[13px] transition-colors">Services</a>
            <a href="#token" className="text-white/60 hover:text-[#FEC722] font-prompt text-[13px] transition-colors">Token</a>
            <a href="#contact" className="text-white/60 hover:text-[#FEC722] font-prompt text-[13px] transition-colors">Contact</a>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="text-white font-public-sans font-bold text-[18px] tracking-wide mb-2">Quick Links</h4>
            <a href="#home" className="text-white/60 hover:text-[#FEC722] font-prompt text-[13px] transition-colors">Back to Top</a>
            <a href="#services" className="text-white/60 hover:text-[#FEC722] font-prompt text-[13px] transition-colors">Our Services</a>
            <a href="#token" className="text-white/60 hover:text-[#FEC722] font-prompt text-[13px] transition-colors">Our Token</a>
            <a href="#contact" className="text-white/60 hover:text-[#FEC722] font-prompt text-[13px] transition-colors">Get in Touch</a>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="text-white font-public-sans font-bold text-[18px] tracking-wide mb-2">Contact Us</h4>
            <a href="tel:983-456-7892" className="text-white/60 hover:text-[#FEC722] font-prompt text-[13px] transition-colors">983-456-7892</a>
            <a href="mailto:support@euro20.world" className="text-white/60 hover:text-[#FEC722] font-prompt text-[13px] transition-colors">support@euro20.world</a>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl pt-8 border-t border-white/10 text-center md:text-left">
        <p className="text-white/60 font-prompt text-[13px] tracking-wide">© 2024 Meta-Success. All rights reserved.</p>
      </div>
    </footer>
  );
}
