"use client";
import Image from "next/image";

type ServiceItem = {
  id?: string;
  title?: string;
  description?: string;
};

type ServicesData = {
  sectionTitle?: string;
  sectionSubtitle?: string;
  items?: ServiceItem[];
};

type DisplayService = {
  id: string;
  title: string;
  desc: string;
  icon?: string;
  iconSrc?: string;
};

const fallbackItems: DisplayService[] = [
  {
    id: "01",
    icon: "⛏",
    title: "Bitcoin Mining",
    desc: "High-performance mining with advanced ASIC hardware, optimized energy usage, and secure operations maximizing your yield.",
  },
  {
    id: "02",
    icon: "↔️",
    title: "Bitcoin Exchange",
    desc: "Instant exchange with competitive rates, secure transactions, and seamless processing for efficient crypto trading.",
  },
  {
    id: "03",
    icon: "🔐",
    title: "Secure Wallet",
    desc: "Cold storage solutions with multi-layer protection ensuring your digital assets are safe from any threats or vulnerabilities.",
  },
  {
    id: "04",
    icon: "📊",
    title: "Analytics Portal",
    desc: "Real-time dashboard showing income updates, hash rate performance, and comprehensive portfolio analytics 24/7.",
  },
  {
    id: "05",
    icon: "⚡",
    title: "Fast Payouts",
    desc: "All withdrawal requests are processed automatically and swiftly, giving you immediate access to your earnings.",
  },
  {
    id: "06",
    iconSrc: "/shield.svg",
    title: "Expert Support",
    desc: "Dedicated blockchain engineers and IT specialists providing round-the-clock support and cutting-edge solutions.",
  },
];

function getDefaultIconForTitle(title: string): { icon?: string; iconSrc?: string } {
  const key = title.toLowerCase();
  if (key.includes("expert support")) return { iconSrc: "/shield.svg" };
  if (key.includes("exchange")) return { icon: "↔️" };
  if (key.includes("wallet")) return { icon: "🔐" };
  if (key.includes("analytics")) return { icon: "📊" };
  if (key.includes("payout")) return { icon: "⚡" };
  if (key.includes("mining")) return { icon: "⛏" };
  return { icon: "•" };
}

export default function Services({ data }: { data?: ServicesData }) {
  const subtitle =
    data?.sectionSubtitle ||
    "Comprehensive mining infrastructure with advanced hardware deployment, energy management, and institutional security.";

  const services: DisplayService[] =
    data?.items?.length
      ? data.items.map((item, index) => {
          const title = item.title?.trim() || fallbackItems[index]?.title || `Service ${index + 1}`;
          const iconMeta = getDefaultIconForTitle(title);
          return {
            id: item.id?.trim() || String(index + 1).padStart(2, "0"),
            title,
            desc: item.description?.trim() || fallbackItems[index]?.desc || "",
            ...iconMeta,
          };
        })
      : fallbackItems;

  return (
    <section id="services" className="bg-[#0B1434] py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-start text-left">
          <span className="font-prompt text-2xl font-semibold tracking-[0.4em] text-[#FEC722] uppercase">
            W h a t &nbsp;&nbsp; W e &nbsp;&nbsp; O f f e r
          </span>
          <h2 className="mt-6 text-6xl font-bold text-white md:text-[80px] leading-tight tracking-wide">
            Services We <span className="text-[#FEC722]">Provides</span>
          </h2>
          <div
            className="mt-8 w-[320px]"
            style={{
              borderBottom: "6px solid",
              borderImageSource: "linear-gradient(270deg, #FFD24C 0%, #FFC822 100%)",
              borderImageSlice: 1,
            }}
          />
          <p className="mt-10 max-w-4xl text-2xl leading-relaxed text-white/80 font-normal">{subtitle}</p>
        </div>

        <div className="mt-24 grid grid-cols-1 border border-white/10 md:grid-cols-3">
          {services.map((service, index) => (
            <div
              key={`${service.id}-${service.title}-${index}`}
              className="group border-b border-white/10 p-12 transition-colors hover:bg-white/[0.02] md:border-r [&:nth-child(3n)]:border-r-0 [&:nth-last-child(-n+3)]:border-b-0"
            >
              <span className="text-sm font-medium text-white/40">{service.id}</span>
              <div className="mt-8 flex h-[64px] w-[64px] items-center justify-center rounded-full border border-white/20 bg-gradient-to-b from-white/10 to-transparent text-[32px] group-hover:border-[#FEC722]/50 group-hover:bg-[#FEC722]/10 transition-all overflow-hidden">
                {service.iconSrc ? (
                  <img src={service.iconSrc} alt={`${service.title} icon`} width={48} height={48} className="object-contain" />
                ) : (
                  <span aria-hidden="true">{service.icon}</span>
                )}
              </div>
              <h3 className="mt-10 text-[26px] font-bold text-white tracking-wide">{service.title}</h3>
              <p className="mt-6 text-base leading-relaxed text-white/60 font-light">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
