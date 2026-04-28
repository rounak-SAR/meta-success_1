"use client";
import React, { useEffect, useState } from "react";
import { submitContactMessage } from "@/services/api";

type Advantage = {
  icon: string;
  title: string;
  desc: string;
};

type WhyData = {
  title?: string;
  subtitle?: string;
  advantages?: Advantage[];
};

type ContactFormState = {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
};

function BitcoinMark({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-label="Bitcoin symbol" role="img">
      <g fill="#FEC722">
        <rect x="27" y="8" width="3" height="10" rx="1.5" />
        <rect x="34" y="8" width="3" height="10" rx="1.5" />
        <rect x="27" y="46" width="3" height="10" rx="1.5" />
        <rect x="34" y="46" width="3" height="10" rx="1.5" />
        <path d="M21 16H35.5C43 16 47 19.7 47 25.4C47 29.4 44.8 32.4 41.1 33.9C45.8 35.2 48.6 38.8 48.6 43.5C48.6 50.1 44 54 35.1 54H21V16ZM28 22.2V31.1H35C38.7 31.1 40.5 29.3 40.5 26.6C40.5 23.9 38.7 22.2 35 22.2H28ZM28 36.7V47.8H35.3C39.9 47.8 42.1 45.8 42.1 42.5C42.1 39 39.9 36.7 35.3 36.7H28Z" />
      </g>
    </svg>
  );
}

export default function WhyChooseUs({ data }: { data?: WhyData }) {
  const { title, subtitle, advantages: dataAdvantages } = data || {};
  const [stats, setStats] = useState({ btc: 1482, doge: 892340, ltc: 23410, rvn: 5821, bch: 741 });
  const [form, setForm] = useState<ContactFormState>({ firstName: "", lastName: "", email: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prev) => ({
        btc: prev.btc + (Math.random() > 0.8 ? 1 : 0),
        doge: prev.doge + Math.floor(Math.random() * 5),
        ltc: prev.ltc + (Math.random() > 0.5 ? 1 : 0),
        rvn: prev.rvn + Math.floor(Math.random() * 3),
        bch: prev.bch + (Math.random() > 0.9 ? 1 : 0),
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const advantages =
    dataAdvantages?.length
      ? dataAdvantages
      : [
          { icon: "⚙", title: "State-of-the-Art Hardware", desc: "Latest ASIC and GPU equipment from Bitmain, Canaan, and NVIDIA for maximum hash output." },
          { icon: "📈", title: "Stable Daily Profit", desc: "Income automatically updated daily on our user-friendly portal ensuring full transparency." },
          { icon: "⚡", title: "Fast Regular Payouts", desc: "All withdrawals processed swiftly and automatically, giving you instant access to earnings." },
          { icon: "🔒", title: "Safe & Secure Platform", desc: "Funds stored in fully secured cold wallets with multi-layer protection against threats." },
          { icon: "👥", title: "Expert Team", desc: "Blockchain engineers and IT specialists providing cutting-edge solutions and 24/7 support." },
          { icon: "🔄", title: "Instant Exchange", desc: "Immediate, seamless trading of Bitcoin and cryptocurrencies with quick market access." },
        ];

  const handleChange = (key: keyof ContactFormState, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFeedback(null);
    setSubmitting(true);

    try {
      await submitContactMessage(form);
      setFeedback({ type: "success", text: "Message sent successfully. Our team will contact you soon." });
      setForm({ firstName: "", lastName: "", email: "", message: "" });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to send message";
      setFeedback({ type: "error", text: message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="flex flex-col w-full">
      <div className="bg-[#0B1434] py-20 px-6">
        <div className="mx-auto max-w-5xl flex flex-col items-center text-center">
          <h2 className="text-[32px] sm:text-[42px] md:text-[56px] font-bold text-white tracking-wide leading-tight">{title || "Why Choose Us"}</h2>
          <div className="mt-4 w-[280px]" style={{ borderBottom: "3px solid", borderImageSource: "linear-gradient(270deg, #FFD24C 0%, #FFC822 100%)", borderImageSlice: 1 }} />
          <p className="mt-8 max-w-3xl text-[14px] md:text-[15px] leading-relaxed text-white/80 font-prompt tracking-wide font-light">{subtitle || "Cutting-edge technology, sustainability, and unparalleled expertise in Bitcoin mining for maximum efficiency and profitability."}</p>
        </div>
      </div>

      <div className="bg-[#0f1423] py-20 md:py-24 px-6">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12 md:gap-y-16">
            {advantages.map((item, i) => (
              <div key={i} className="flex items-start gap-6 md:gap-8">
                <div className="w-16 h-16 md:w-20 md:h-20 shrink-0 rounded-2xl bg-[#1e2335] border border-white/10 flex items-center justify-center text-3xl md:text-4xl shadow-xl">{item.icon}</div>
                <div className="flex flex-col gap-3 pt-1">
                  <h3 className="font-public-sans text-white text-[21px] md:text-[24px] font-bold tracking-wide">{item.title}</h3>
                  <p className="font-prompt text-white/70 text-[15px] md:text-[17px] leading-[1.7] font-light">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div id="token" className="bg-[#0B1434] pt-20 pb-12 px-6 scroll-mt-24">
        <div className="mx-auto max-w-6xl flex flex-col items-center text-center">
          <span className="font-prompt text-[15px] font-medium tracking-[0.4em] text-[#FEC722] uppercase">Our Token</span>
          <h2 className="mt-4 text-[32px] sm:text-[42px] md:text-[52px] font-bold text-white tracking-wide leading-tight">Flagship Token <span className="text-[#FEC722] whitespace-nowrap">ETT</span></h2>
          <div className="mt-6 w-[200px]" style={{ borderBottom: "3px solid", borderImageSource: "linear-gradient(270deg, #FFD24C 0%, #FFC822 100%)", borderImageSlice: 1 }} />
          <div className="mt-16 md:mt-20 w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative">
            <div className="flex flex-col items-center text-center pr-0 md:pr-8">
              <div className="w-[120px] h-[120px] rounded-full border border-[#FEC722]/40 flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(254,199,34,0.20)] bg-[#0B1434]">
                <img src="/bitcoin-token.svg" alt="Bitcoin" className="w-[66px] h-[66px] object-contain" />
              </div>
              <h3 className="text-[26px] font-public-sans tracking-wide text-white mb-2">Euro Token</h3>
              <h4 className="text-[26px] font-public-sans tracking-wide text-white mb-8 uppercase">ETT / USDT</h4>
              <p className="max-w-[280px] text-white/70 font-prompt text-[13px] leading-loose">The ETT token powers the Euro 20 ecosystem, enabling seamless transactions, staking rewards, and governance participation.</p>
            </div>
            <div className="hidden md:block absolute left-1/2 top-1/2 h-[80%] w-[1px] bg-white/10 -translate-x-1/2 -translate-y-1/2" />
            <div className="flex flex-col pl-0 md:pl-16 w-full max-w-md mx-auto md:mx-0 pt-4">
              <div className="flex flex-col gap-[18px] w-full">
                <div className="flex justify-between items-center w-full"><span className="text-white/80 font-public-sans text-[15px] font-medium tracking-wide">Symbol</span><span className="text-[#FEC722] font-bold font-public-sans text-[15px] tracking-widest">ETT_USDT</span></div>
                <div className="flex justify-between items-center w-full"><span className="text-white/80 font-public-sans text-[15px] font-medium tracking-wide">Last Price</span><span className="text-white/90 font-public-sans text-[15px] tracking-wider">$0.11000000</span></div>
                <div className="flex justify-between items-center w-full"><span className="text-white/80 font-public-sans text-[15px] font-medium tracking-wide">Highest Bid</span><span className="text-white/90 font-public-sans text-[15px] tracking-wider">$0.02000000</span></div>
                <div className="flex justify-between items-center w-full"><span className="text-white/80 font-public-sans text-[15px] font-medium tracking-wide">Base Volume</span><span className="text-white/90 font-public-sans text-[15px] tracking-wider">0.00000000</span></div>
                <div className="flex justify-between items-center w-full"><span className="text-white/80 font-public-sans text-[15px] font-medium tracking-wide">Quote Volume</span><span className="text-white/90 font-public-sans text-[15px] tracking-wider">0.00000000</span></div>
                <div className="flex justify-between items-center w-full"><span className="text-white/80 font-public-sans text-[15px] font-medium tracking-wide">High 24hr</span><span className="text-white/90 font-public-sans text-[15px] tracking-wider">$0.00000000</span></div>
                <div className="flex justify-between items-center w-full"><span className="text-white/80 font-public-sans text-[15px] font-medium tracking-wide">Low 24hr</span><span className="text-white/90 font-public-sans text-[15px] tracking-wider">$0.00000000</span></div>
                <div className="flex justify-between items-center w-full"><span className="text-white/80 font-public-sans text-[15px] font-medium tracking-wide">Status</span><span className="text-[#00E676] font-bold font-public-sans text-[15px] tracking-wide">Active</span></div>
              </div>
              <button className="mt-10 w-full md:w-[280px] self-start border border-white/10 bg-[#0c1229] hover:bg-white/5 py-4 text-[13px] font-public-sans font-bold tracking-[0.2em] text-white transition-all rounded-sm shadow-lg">TRADE ETT NOW</button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#0B1434] px-6"><div className="mx-auto max-w-5xl h-[1px] bg-white/10" /></div>

      <div className="bg-[#0B1434] py-24 px-6">
        <div className="mx-auto max-w-6xl flex flex-col items-center text-center">
          <span className="font-prompt text-[15px] font-medium tracking-[0.4em] text-[#FEC722] uppercase">Mining Power</span>
          <h2 className="mt-4 text-[32px] sm:text-[42px] md:text-[56px] font-bold text-white tracking-wide leading-tight">Blocks Mined with <span className="text-[#FEC722] whitespace-nowrap">Meta-Success</span></h2>
          <div className="mt-6 w-[280px]" style={{ borderBottom: "3px solid", borderImageSource: "linear-gradient(270deg, #FFD24C 0%, #FFC822 100%)", borderImageSlice: 1 }} />
          <div className="mt-16 w-full max-w-5xl bg-[#060A1F] border border-[#1C2341] rounded-[24px] py-10 px-4 sm:px-6 md:px-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 shadow-2xl">
            <div className="flex flex-col items-center"><BitcoinMark className="h-11 w-11 mb-1" /><span className="text-white font-public-sans font-bold text-[24px] sm:text-[28px] tracking-wide mb-1">{stats.btc.toLocaleString()}</span><span className="text-[#FEC722] font-prompt text-[10px] tracking-[0.15em] font-semibold uppercase">Bitcoin</span></div>
            <div className="flex flex-col items-center"><span className="text-[#FEC722] text-4xl font-serif font-bold mb-2">Ð</span><span className="text-white font-public-sans font-bold text-[24px] sm:text-[28px] tracking-wide mb-1">{stats.doge.toLocaleString()}</span><span className="text-[#FEC722] font-prompt text-[10px] tracking-[0.15em] font-semibold uppercase">Dogecoin</span></div>
            <div className="flex flex-col items-center"><span className="text-[#FEC722] text-4xl font-serif font-bold mb-2">Ł</span><span className="text-white font-public-sans font-bold text-[24px] sm:text-[28px] tracking-wide mb-1">{stats.ltc.toLocaleString()}</span><span className="text-[#FEC722] font-prompt text-[10px] tracking-[0.15em] font-semibold uppercase">Litecoin</span></div>
            <div className="flex flex-col items-center"><span className="text-[#FEC722] text-4xl font-serif font-bold mb-2">R</span><span className="text-white font-public-sans font-bold text-[24px] sm:text-[28px] tracking-wide mb-1">{stats.rvn.toLocaleString()}</span><span className="text-[#FEC722] font-prompt text-[10px] tracking-[0.15em] font-semibold uppercase">Ravencoin</span></div>
            <div className="flex flex-col items-center"><BitcoinMark className="h-11 w-11 mb-1" /><span className="text-white font-public-sans font-bold text-[24px] sm:text-[28px] tracking-wide mb-1">{stats.bch.toLocaleString()}</span><span className="text-[#FEC722] font-prompt text-[10px] tracking-[0.15em] font-semibold uppercase">Bitcoin Cash</span></div>
          </div>
        </div>

        <div id="contact" className="mx-auto max-w-6xl mt-24 md:mt-32 scroll-mt-24">
          <div className="text-left mb-16 pl-2">
            <span className="font-prompt text-[14px] font-semibold tracking-[0.4em] text-[#FEC722] uppercase">Get In Touch</span>
            <h2 className="mt-4 text-[36px] md:text-[46px] font-public-sans font-bold text-white tracking-wide">Contact <span className="text-[#FEC722]">Us</span></h2>
            <div className="mt-6 w-[160px]" style={{ borderBottom: "3px solid", borderImageSource: "linear-gradient(270deg, #FFD24C 0%, #FFC822 100%)", borderImageSlice: 1 }} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="flex flex-col px-2">
              <p className="text-white/80 font-prompt text-[17px] leading-relaxed mb-10 max-w-lg">Our team of experts is ready to answer your questions and help you get started with Bitcoin mining.</p>
              <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="flex flex-col flex-1 gap-2">
                    <label className="text-white/60 font-prompt text-[11px] uppercase tracking-wider">First Name</label>
                    <input value={form.firstName} onChange={(e) => handleChange("firstName", e.target.value)} required type="text" className="w-full bg-[#0c1229] border border-white/10 rounded-[8px] h-[48px] px-4 text-white focus:outline-none focus:border-[#FEC722]/50 transition-colors" />
                  </div>
                  <div className="flex flex-col flex-1 gap-2">
                    <label className="text-white/60 font-prompt text-[11px] uppercase tracking-wider">Last Name</label>
                    <input value={form.lastName} onChange={(e) => handleChange("lastName", e.target.value)} required type="text" className="w-full bg-[#0c1229] border border-white/10 rounded-[8px] h-[48px] px-4 text-white focus:outline-none focus:border-[#FEC722]/50 transition-colors" />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-white/60 font-prompt text-[11px] uppercase tracking-wider">Email</label>
                  <input value={form.email} onChange={(e) => handleChange("email", e.target.value)} required type="email" className="w-full bg-[#0c1229] border border-white/10 rounded-[8px] h-[48px] px-4 text-white focus:outline-none focus:border-[#FEC722]/50 transition-colors" />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-white/60 font-prompt text-[11px] uppercase tracking-wider">Message</label>
                  <textarea value={form.message} onChange={(e) => handleChange("message", e.target.value)} required className="w-full bg-[#0c1229] border border-white/10 rounded-[8px] h-[140px] p-4 text-white resize-none focus:outline-none focus:border-[#FEC722]/50 transition-colors" />
                </div>

                {feedback && (
                  <p className={`text-sm ${feedback.type === "success" ? "text-[#00E676]" : "text-[#ff6b6b]"}`}>
                    {feedback.text}
                  </p>
                )}

                <button disabled={submitting} className="mt-4 w-full border border-white/10 bg-[#0c1229] hover:bg-white/5 py-[18px] rounded-[8px] text-[13px] font-public-sans font-bold tracking-[0.2em] text-white transition-all shadow-lg disabled:opacity-60">
                  {submitting ? "SENDING..." : "SEND MESSAGE"}
                </button>
              </form>
            </div>

            <div className="flex flex-col gap-10 pl-2 lg:pl-28 pt-4">
              <div className="flex flex-col"><span className="text-white/60 font-prompt text-[11px] mb-2 uppercase tracking-wide">Phone / WhatsApp</span><span className="text-white font-public-sans text-[18px] tracking-wide">+44 7454 256299</span></div>
              <div className="flex flex-col"><span className="text-white/60 font-prompt text-[11px] mb-2 uppercase tracking-wide">Email</span><span className="text-white font-public-sans text-[18px] tracking-wide">support@euro20.world</span></div>
              <div className="flex flex-col"><span className="text-white/60 font-prompt text-[11px] mb-2 uppercase tracking-wide">Office</span><span className="text-white font-public-sans text-[18px] tracking-wide leading-relaxed">27 Old Gloucester Street<br />London, WC1N 3AX, UK</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
