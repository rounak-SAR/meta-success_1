"use client";

import { useEffect, useState } from "react";
import Hero from "@/components/Hero";
import Ticker from "@/components/Ticker";
import Services from "@/components/Services";
import AboutUs from "@/components/AboutUs";
import WhyChooseUs from "@/components/WhyChooseUs";
import Footer from "@/components/Footer";
import { getPageContent } from "@/services/api";

export default function Home() {
  const [pageData, setPageData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPageContent("homepage");
        setPageData(data);
      } catch (error) {
        console.error("API error:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Hero data={pageData?.hero} />
      <Ticker data={pageData?.tickers} />
      <Services data={pageData?.services} />
      <AboutUs data={pageData?.about} />
      <WhyChooseUs data={pageData?.whyChooseUs} />
      <Footer />
    </main>
  );
}