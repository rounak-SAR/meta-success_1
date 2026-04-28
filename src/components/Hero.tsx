"use client";
import { useEffect, useState } from "react";

type HeroStat = {
  label: string;
  value: string;
};

type HeroData = {
  title?: string;
  subtitle?: string;
  stats?: HeroStat[];
};

export default function Hero({ data }: { data?: HeroData | null }) {
  const { title, subtitle, stats } = data || {};
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: "HOME", target: "home" },
    { label: "ABOUT", target: "about" },
    { label: "SERVICES", target: "services" },
    { label: "TOKEN", target: "token" },
    { label: "CONTACT", target: "contact" },
  ];

  const balls = [
    { label: "MST", top: "14%", left: "8%", size: "sm", tone: "violet", delay: "0s" },
    { label: "MST", top: "28%", left: "35%", size: "md", tone: "teal", delay: "1s" },
    { label: "MST", top: "30%", right: "28%", size: "md", tone: "green", delay: "1.6s" },
    { label: "MST", top: "52%", left: "17%", size: "md", tone: "amber", delay: "0.5s" },
    { label: "MST", top: "60%", left: "28%", size: "md", tone: "blue", delay: "2s" },
    { label: "MST", top: "55%", right: "8%", size: "md", tone: "yellow", delay: "1.2s" },
    { label: "MST", top: "68%", right: "22%", size: "md", tone: "orange", delay: "0.8s" },
  ];

  const mobileBalls = [
    { label: "MST", top: "22%", left: "4%", size: "sm", tone: "violet", delay: "0.2s" },
    { label: "MST", top: "34%", right: "3%", size: "sm", tone: "teal", delay: "0.9s" },
    { label: "MST", top: "62%", left: "6%", size: "sm", tone: "amber", delay: "0.5s" },
    { label: "MST", top: "72%", right: "5%", size: "sm", tone: "blue", delay: "1.3s" },
  ];

  const scrollToSection = (target: string) => {
    if (target === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      document.getElementById(target)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setMobileMenuOpen(false);
  };

  return (
    <section id="home" className="hero-shell relative overflow-hidden px-4 pb-16 pt-28 sm:pt-32 sm:px-5 md:px-10">
      <div className="hero-bg-base" />
      <div className="hero-bg-glow" />
      <div className="hero-ellipse hero-ellipse-left" />
      <div className="hero-ellipse hero-ellipse-top-right" />
      <div className="hero-ellipse hero-ellipse-bottom-right" />
      <div className="hero-ellipse hero-ellipse-center-bottom" />
      <div className="hero-ellipse hero-ellipse-bottom-left" />
      <div className="hero-bubble hero-bubble-top-right" />
      <div className="hero-bubble hero-bubble-left-mid" />
      <div className="hero-bubble hero-bubble-bottom-right" />

      {balls.map((ball, i) => (
        <div
          key={i}
          className={`ett-ball ett-${ball.size} ett-${ball.tone} hidden md:grid`}
          style={{
            top: ball.top,
            left: (ball as { left?: string }).left,
            right: (ball as { right?: string }).right,
            animationDelay: ball.delay,
          }}
        >
          <span>{ball.label}</span>
        </div>
      ))}

      {mobileBalls.map((ball, i) => (
        <div
          key={`m-${i}`}
          className={`ett-ball ett-mobile ett-${ball.size} ett-${ball.tone} md:hidden`}
          style={{
            top: ball.top,
            left: (ball as { left?: string }).left,
            right: (ball as { right?: string }).right,
            animationDelay: ball.delay,
          }}
        >
          <span>{ball.label}</span>
        </div>
      ))}

      <div
        className={`left-1/2 z-50 flex -translate-x-1/2 justify-center transition-all duration-300 ${isScrolled
          ? "fixed top-0 w-full bg-[#0a1340]/95 backdrop-blur-md border-b border-white/5 shadow-2xl py-2"
          : "absolute top-0 sm:top-2 w-[min(96vw,1400px)] py-0"
          }`}
      >
        <div className={`flex w-full items-center justify-between px-2 sm:px-6 transition-all duration-300 ${isScrolled ? "max-w-[1400px]" : "px-0"}`}>
          <div className="flex items-center gap-2 shrink-0 -ml-2 sm:ml-0">
            <img
              src="/logo.png"
              alt="Meta Success"
              style={{
                height: isScrolled ? "70px" : "200px",
                width: "auto",
                transition: "height 0.3s ease"
              }}
              className="object-contain"
            />
          </div>

          <div
            className={`hidden md:flex rounded-full bg-gradient-to-r from-white/20 via-white/5 to-white/20 p-[1px] shadow-2xl shadow-black/40 transition-all duration-300 ${isScrolled ? "scale-[0.94]" : "scale-100"
              }`}
          >
            <nav
              className={`flex flex-1 max-w-[920px] items-center justify-center rounded-full bg-black/40 backdrop-blur-xl border border-white/5 transition-all duration-300 ${isScrolled ? "gap-8 px-12 py-2.5" : "gap-14 px-20 py-5"
                }`}
            >
              {navLinks.map((item) => (
                <button
                  key={item.target}
                  type="button"
                  onClick={() => scrollToSection(item.target)}
                  className={`cursor-pointer font-semibold tracking-[0.2em] text-white/70 hover:text-white transition-all hover:scale-110 ${isScrolled ? "text-[11px]" : "text-[14px]"
                    }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="hidden md:block rounded-full border border-white/30 bg-transparent p-[1px]">
            <button
              className={`rounded-full bg-transparent font-bold tracking-[0.2em] text-white transition-all hover:bg-white/10 hover:shadow-[0_0_20px_rgba(255,255,255,0.18)] active:scale-95 ${isScrolled ? "px-6 py-2.5 text-[11px]" : "px-8 py-3.5 text-[13px]"
                }`}
            >
              JOIN NOW
            </button>
          </div>

          <div className="relative md:hidden">
            <button
              type="button"
              aria-label="Toggle navigation"
              className="rounded-lg border border-white/20 bg-black/30 p-2.5 backdrop-blur"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6 text-white" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            </button>

            {mobileMenuOpen && (
              <nav className="absolute right-0 top-[calc(100%+10px)] z-40 flex w-[min(86vw,320px)] flex-col gap-2 rounded-2xl border border-white/15 bg-[#081136]/95 p-4 shadow-2xl backdrop-blur">
                {navLinks.map((item) => (
                  <button
                    key={`mobile-${item.target}`}
                    type="button"
                    onClick={() => scrollToSection(item.target)}
                    className="rounded-lg border border-white/10 px-4 py-3 text-left text-[12px] font-semibold tracking-[0.2em] text-white/90 hover:bg-white/10"
                  >
                    {item.label}
                  </button>
                ))}
                <button
                  type="button"
                  className="rounded-lg bg-[#4f90ef] px-4 py-3 text-[12px] font-bold tracking-[0.2em] text-white"
                >
                  JOIN NOW
                </button>
              </nav>
            )}
          </div>
        </div>
      </div>

      <div className="relative z-20 mx-auto mt-20 flex w-full max-w-5xl flex-col items-center text-center md:mt-24">
        <h1 className="whitespace-nowrap text-[clamp(2.2rem,9.2vw,3.25rem)] md:text-[88px] font-black uppercase leading-[1.06] tracking-[0.04em] text-[#ffd232] drop-shadow-[0_8px_24px_rgba(0,0,0,0.6)]">
          {title || "META-SUCCESS"}
        </h1>

        <p className="mt-6 max-w-[580px] text-[14px] font-medium leading-relaxed text-[#ffd232]/80">
          {subtitle ||
            "Comprehensive Bitcoin mining services including advanced hardware deployment, energy management, secure wallets, and instant exchange."}
        </p>

        <button className="mt-9 rounded-full bg-gradient-to-b from-[#7cb9ff] via-[#4f90ef] to-[#1f5fca] px-14 py-4 text-[13px] font-bold tracking-[0.18em] text-white shadow-[0_10px_35px_rgba(31,95,202,0.55)] transition-all hover:scale-105 hover:shadow-[0_14px_45px_rgba(31,95,202,0.65)] active:scale-95">
          JOIN NOW
        </button>
      </div>

      <div className="relative z-20 mx-auto mt-16 grid w-full max-w-4xl grid-cols-2 gap-8 text-center md:grid-cols-4">
        {(
          stats || [
            { label: "Active Miners", value: "18,420" },
            { label: "Live Monitoring", value: "24/7" },
            { label: "Uptime Guarantee", value: "99%" },
            { label: "Paid Out", value: "$2.4M+" },
          ]
        ).map((stat: HeroStat) => (
          <div key={stat.label} className="flex flex-col items-center">
            <span className="font-serif text-[52px] font-bold leading-none text-[#ffd232] md:text-[60px]">
              {stat.value}
            </span>
            <span className="font-serif mt-2 text-[12px] font-medium uppercase tracking-[0.1em] text-[#ffd232]/85">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
