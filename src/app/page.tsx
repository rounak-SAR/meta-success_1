import Hero from "@/components/Hero";
import Ticker from "@/components/Ticker";
import Services from "@/components/Services";
import AboutUs from "@/components/AboutUs";
import WhyChooseUs from "@/components/WhyChooseUs";
import Footer from "@/components/Footer";
import { getPageContent } from "@/services/api";

export default async function Home() {
  const pageData = await getPageContent("homepage");

  return (
    <main className="min-h-screen bg-background flex flex-col">
      {/* Passing data from backend to components */}
      <Hero data={pageData?.hero} />
      <Ticker data={pageData?.tickers} />
      <Services data={pageData?.services} />
      <AboutUs data={pageData?.about} />
      <WhyChooseUs data={pageData?.whyChooseUs} />
      <Footer />
    </main>
  );
}
