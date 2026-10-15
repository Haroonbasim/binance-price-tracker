import { useState } from "react";
import { supportedCoins } from "../data/supportedCoin.js";
export function Watchlist({ coins, onRemoveCoin, onAddCoin }) {
  const [selectedCoin, setSelectedCoin] = useState("BTC");
  return (
    <section className="mb-8 flex flex-wrap items-center justify-between gap-5">
      <div>
        <h2 className="text-[1.6rem] font-extrabold tracking-[-0.02em]">
          Cryptocurrency Watchlist
        </h2>
        <p className="mt-[0.2rem] text-[0.9rem] text-[#64748b]">
          Real-time prices, 24h market trends, and mini-charts with explicit
          readings
        </p>
      </div>
      <div className="flex w-fit items-center gap-[0.65rem] rounded-[14px] border border-[#e2e8f0] bg-white py-[0.45rem] pr-[0.55rem] pl-4 shadow-[0_2px_6px_rgba(15,23,42,0.04)] max-md:w-full max-md:justify-between"> 
        <label
          htmlFor="coin-picker"
          className="text-[0.8rem] font-bold text-[#94a3b8] uppercase"
        >
          Coin:
        </label>
        <select
          id="coin-picker"
          className="cursor-pointer border-0 bg-transparent text-[0.95rem] font-bold text-[#0f172a] outline-none"
          value={selectedCoin}
          onChange={(event) => setSelectedCoin(event.target.value)}
        >
          {supportedCoins.map((coin) => (
            <option key={coin} value={coin}>
              {coin} (
              {
                {
                  BTC: "Bitcoin",
                  ETH: "Ethereum",
                  SOL: "Solana",
                  BNB: "Binance Coin",
                  XRP: "Ripple",
                  DOGE: "Dogecoin",
                  ADA: "Cardano",
                  TRX: "TRON",
                  USDC: "USD Coin",
                }[coin]
              }
              )
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={() => onAddCoin(selectedCoin)}
          className="cursor-pointer rounded-[9px] border-0 bg-[#4f46e5] px-[1.35rem] py-[0.6rem] text-[0.88rem] leading-[normal] font-bold text-white shadow-[0_4px_12px_rgba(79,70,229,0.25)] transition-all duration-200 ease-[ease] hover:-translate-y-px hover:bg-[#4338ca] hover:shadow-[0_6px_16px_rgba(79,70,229,0.35)]"
        >
          + Add coin
        </button>
      </div>
    </section>
  );
}
