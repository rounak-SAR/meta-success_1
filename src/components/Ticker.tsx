"use client";
import React, { useState, useEffect } from "react";

type TickerItem = {
  pair: string;
  price: string;
  change: string;
};

export default function Ticker({ data }: { data?: any[] }) {
  const [marketData, setMarketData] = useState<TickerItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPrices = async () => {
    try {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,bitcoin-cash&vs_currencies=usd&include_24hr_change=true"
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const json = await response.json();

      if (!json.bitcoin || !json.ethereum || !json.solana || !json["bitcoin-cash"]) {
        throw new Error("Invalid API response format");
      }

      const items: TickerItem[] = [
        {
          pair: "BTC",
          price: `$${json.bitcoin.usd.toLocaleString()}`,
          change: `${json.bitcoin.usd_24h_change >= 0 ? "+" : ""}${json.bitcoin.usd_24h_change.toFixed(2)}%`,
        },
        {
          pair: "ETH",
          price: `$${json.ethereum.usd.toLocaleString()}`,
          change: `${json.ethereum.usd_24h_change >= 0 ? "+" : ""}${json.ethereum.usd_24h_change.toFixed(2)}%`,
        },
        {
          pair: "SOL",
          price: `$${json.solana.usd.toLocaleString()}`,
          change: `${json.solana.usd_24h_change >= 0 ? "+" : ""}${json.solana.usd_24h_change.toFixed(2)}%`,
        },
        {
          pair: "BCH",
          price: `$${json["bitcoin-cash"].usd.toLocaleString()}`,
          change: `${json["bitcoin-cash"].usd_24h_change >= 0 ? "+" : ""}${json["bitcoin-cash"].usd_24h_change.toFixed(2)}%`,
        },
      ];
      setMarketData(items);
      setLoading(false);
    } catch (error) {
      console.warn("Ticker fallback used due to error:", error);
      // Fallback to demo data if API fails or rate limited
      setMarketData([
        { pair: "BTC", price: "$64,230.10", change: "+1.24%" },
        { pair: "ETH", price: "$3,450.75", change: "-0.45%" },
        { pair: "SOL", price: "$145.20", change: "+2.10%" },
        { pair: "BCH", price: "$412.50", change: "+0.98%" },
      ]);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrices();
    const interval = setInterval(fetchPrices, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  // Triple the data for a smoother continuous infinite scroll loop
  const slidingData = [...marketData, ...marketData, ...marketData];

  if (loading && marketData.length === 0) {
    return (
      <section className="ticker-band">
        <div className="ticker-band-inner">
          <div className="ticker-scroller">
            <div className="ticker-scroller-track">
              <div className="ticker-chip">
                <span className="ticker-pair">Loading Market Data...</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="ticker-band">
      <div className="ticker-band-inner">
        <div className="ticker-scroller" aria-label="Live market ticker">
          <div className="ticker-scroller-track">
            {slidingData.map((item, index) => (
              <div key={`${item.pair}-${index}`} className="ticker-chip">
                <span className="ticker-pair">{item.pair}</span>
                <span className="ticker-price">{item.price}</span>
                <span className={`ticker-change ${item.change.startsWith("+") ? "is-up" : "is-down"}`}>
                  {item.change}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
