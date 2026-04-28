"use client";
import React, { useState, useEffect } from "react";

const AnimatedNode = ({ name, color, delay, duration }: { name: string, color: string, delay: number, duration: number }) => {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    let animationFrameId: number;
    const startTime = Date.now() + delay;

    const animate = () => {
      const now = Date.now();
      if (now >= startTime) {
        const elapsed = (now - startTime) % duration;
        const currentPercent = Math.floor((elapsed / duration) * 100);
        setPercent(currentPercent);
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [delay, duration]);

  return (
    <div className="bg-[#1A1237]/60 border border-white/10 rounded-2xl p-4 flex items-center justify-between shadow-inner">
      <div className="flex items-center gap-3">
        {/* Status Dot - Blinks on completion/restart (wider range for better visibility) */}
        <div className={`w-2.5 h-2.5 rounded-full ${color} shadow-[0_0_8px_${color}] ${percent > 90 || percent < 10 ? 'animate-hard-blink' : ''}`} />
        <span className="text-white text-sm font-medium">{name}</span>
      </div>
      
      {/* Progress Bar & Percentage */}
      <div className="flex items-center gap-3 w-[100px]">
        <div className="h-1.5 flex-1 bg-white/10 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-[#FF9800] to-[#FFC107] rounded-full transition-all duration-75 ease-linear" 
            style={{ width: `${percent}%` }}
          />
        </div>
        <span className="text-white/70 text-[11px] font-medium w-6 text-right">{percent}%</span>
      </div>
    </div>
  );
};

export default function AboutUs({ data }: { data?: any }) {
  const title = data?.title || "Welcome to Meta-Success";
  const description = data?.description || "At Meta-Success, we are at the forefront of the cryptocurrency revolution, specializing in state-of-the-art ₿ Bitcoin mining with cutting-edge technology.";

  const nodes = [
    { name: "Node 01", color: "bg-[#00E676]", delay: 0, duration: 4000 },
    { name: "Node 02", color: "bg-[#00E676]", delay: 500, duration: 5000 },
    { name: "Node 03", color: "bg-[#FFEA00]", delay: 1200, duration: 3500 },
    { name: "Node 04", color: "bg-[#00E676]", delay: 200, duration: 4500 },
    { name: "Node 05", color: "bg-[#FF1744]", delay: 800, duration: 6000 },
    { name: "Node 06", color: "bg-[#00E676]", delay: 1500, duration: 3800 },
  ];

  const features = [
    "Advanced ASIC & GPU Technology",
    "Secure Cold Wallet Service",
    "Global Mining Network",
    "Clean Modern Interface",
    "Expert Blockchain Team",
    "Transparent Operations",
  ];

  return (
    <section id="about" className="bg-[#0B1434] py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header Section - Right Aligned */}
        <div className="flex flex-col items-end text-right">
          <span className="font-prompt text-lg md:text-xl font-semibold tracking-[0.4em] text-[#FEC722] uppercase">
            A b o u t &nbsp;&nbsp; U s
          </span>
          <h2 className="mt-6 text-5xl font-bold text-white md:text-[64px] leading-tight tracking-wide">
            {title.includes("Meta-Success") ? (
              <>
                {title.split("Meta-Success")[0]}
                <span className="text-[#FEC722]">Meta-Success</span>
                {title.split("Meta-Success")[1]}
              </>
            ) : (
              title
            )}
          </h2>
          {/* Custom Gradient Underline */}
          <div
            className="mt-6 w-[280px]"
            style={{
              borderBottom: "5px solid",
              borderImageSource: "linear-gradient(90deg, #FFD24C 0%, #FFC822 100%)",
              borderImageSlice: 1,
            }}
          />
        </div>

        {/* Content Layout: Phone Mockup (Left) & Features (Right) */}
        <div className="mt-20 flex flex-col md:flex-row items-start justify-center gap-8 md:gap-12">
          
          {/* Phone Mockup */}
          <div className="relative mx-auto md:mx-0 w-[320px] shrink-0">
            {/* Outer Frame & Body */}
            <div className="h-[660px] w-full rounded-[44px] border-[6px] border-[#F28C28] bg-[#2A0E4F] p-[2px] shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden ring-1 ring-black/20">
              
              {/* Black Bezel Layer (Slightly Thicker) */}
              <div className="h-full w-full rounded-[42px] bg-black p-[6px] relative flex flex-col">
                
                {/* Top Notch / Dynamic Island */}
                <div className="absolute left-1/2 top-2 h-7 w-[120px] -translate-x-1/2 rounded-full bg-black flex items-center justify-between px-1.5 z-30 shadow-lg">
                  <div className="flex items-center gap-1.5 w-full justify-between">
                    {/* Sensor Pill */}
                    <div className="w-14 h-4 rounded-full bg-[#0D0D0D]" />
                    {/* Camera Lens */}
                    <div className="w-4.5 h-4.5 rounded-full bg-[#0D0D0D] border border-white/10 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-[#1A265A] border border-blue-400/30 shadow-[inset_0_0_2px_rgba(255,255,255,0.2)]" />
                    </div>
                  </div>
                </div>

                {/* Inner Screen Content */}
                <div className="h-full w-full rounded-[38px] bg-gradient-to-b from-[#3C1A6A] via-[#211145] to-[#120B29] pt-12 pb-6 px-4 flex flex-col relative overflow-hidden">
                  
                  {/* Header Icons */}
                  <div className="flex justify-between items-center text-white/90 mb-6 px-1 z-20">
                    <span className="text-lg font-bold cursor-pointer hover:text-white transition-all">&lt;</span>
                    <div className="flex gap-4 items-center">
                      {/* Bell with red dot */}
                      <div className="relative cursor-pointer group">
                        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white/80 group-hover:fill-white transition-all">
                          <path d="M12 22a2 2 0 0 0 2-2h-4a2 2 0 0 0 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
                        </svg>
                        <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-[#FF1744] rounded-full border border-[#3C1A6A]" />
                      </div>
                      {/* Exit Icon */}
                      <div className="cursor-pointer group">
                        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-white/80 group-hover:stroke-white transition-all" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-center text-white/80 text-[10px] font-semibold tracking-widest mb-4 uppercase z-20">
                    Mining Server Status
                  </h3>

                  {/* Nodes List - Full Visibility, No Scrollbar */}
                  <div className="flex flex-col gap-2 flex-1 z-20">
                    {nodes.map((node, i) => (
                      <AnimatedNode key={i} name={node.name} color={node.color} delay={node.delay} duration={node.duration} />
                    ))}
                  </div>

                  {/* Bottom Stats Panel */}
                  <div className="mt-4 pt-4 border-t border-white/10 flex justify-between items-center px-1 z-20">
                    <div className="flex flex-col items-center">
                      <span className="text-[#00E676] text-xs font-bold">6/6</span>
                      <span className="text-white/50 text-[9px] font-medium mt-1">Active</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="text-[#FFC107] text-xs font-bold">248 TH/s</span>
                      <span className="text-white/50 text-[9px] font-medium mt-1">Hash Rate</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="text-[#448AFF] text-xs font-bold">38.c</span>
                      <span className="text-white/50 text-[9px] font-medium mt-1">Avg Temp</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
            
            {/* Phone physical buttons (decorative) */}
            <div className="absolute -left-[8px] top-28 h-8 w-1.5 rounded-l-md bg-[#F28C28] shadow-sm" /> {/* Mute switch */}
            <div className="absolute -left-[8px] top-44 h-14 w-1.5 rounded-l-md bg-[#F28C28] shadow-sm" /> {/* Vol up */}
            <div className="absolute -left-[8px] top-64 h-14 w-1.5 rounded-l-md bg-[#F28C28] shadow-sm" /> {/* Vol down */}
            <div className="absolute -right-[8px] top-48 h-20 w-1.5 rounded-r-md bg-[#F28C28] shadow-sm" /> {/* Power */}
          </div>

          {/* Features List (Right Side) */}
          <div className="flex-1 flex flex-col pt-4">
            <p className="text-[13px] md:text-[15px] leading-relaxed text-white/80 font-light text-right mb-12 ml-auto max-w-md">
              {description}
            </p>

            <div className="flex flex-col w-full max-w-lg ml-auto border-t border-white/10">
              {features.map((feature, i) => (
                <div key={i} className="flex items-center gap-4 py-6 border-b border-white/10">
                  <div className="w-5 h-5 rounded-full bg-[#2ECC71] flex items-center justify-center shrink-0">
                    <svg className="w-3 h-3 text-[#0B1434]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-white/90 text-lg md:text-xl font-medium tracking-wide">
                    {feature}
                  </span>
                </div>
              ))}

              <button className="mt-12 mr-auto border border-white/20 bg-transparent px-10 py-4 text-sm font-bold tracking-[0.2em] text-white hover:bg-white/5 transition-all">
                JOIN NOW
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
