import { useEffect, useRef, useState } from "react";
export const PriceCard = ({
  price,
  changePercent,
  highPrice,
  coin,
  onRemoveCoin,
}) => {
  const [priceFlash, setPriceFlash] = useState(null);
  const previousPrice = useRef(null);
  useEffect(() => {
    if (price === null) return;
    const current = Number(price);
    if (!Number.isFinite(current) || current <= 0) return;
    const previous = previousPrice.current;
    previousPrice.current = current;
    if (previous === null || current === previous) return;
    setPriceFlash(current > previous ? "up" : "down");
    const timer = setTimeout(() => setPriceFlash(null), 700);
    return () => clearTimeout(timer);
  }, [price]);
  return (
    <section>
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-[0.85rem]">
          <div
            className={`flex size-11 shrink-0 items-center justify-center rounded-xl text-[1.1rem] font-extrabold ${{ BTC: "bg-[#fffbeb] text-[#f59e0b]", ETH: "bg-[#eef2ff] text-[#6366f1]", SOL: "bg-[#ecfdf5] text-[#10b981]", BNB: "bg-[#fefce8] text-[#ca8a04]", XRP: "bg-[#f0f9ff] text-[#0284c7]", DOGE: "bg-[#fffbeb] text-[#d97706]", ADA: "bg-[#eff6ff] text-[#2563eb]", TRX: "bg-[#fef2f2] text-[#dc2626]", USDC: "bg-[#f0fdf4] text-[#16a34a]" }[coin]}`}
          >
            {coin.slice(0, 3)}
          </div>
          <div>
            <h3 className="text-[1.18rem] font-extrabold tracking-[-0.02em]">
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
            </h3>
            <span className="font-mono text-[0.78rem] font-semibold text-[#94a3b8]">
              {coin} / USDT • BINANCE WS
            </span>
          </div>
        </div>
        <button
          type="button"
          onClick={() => onRemoveCoin(coin)}
          className="cursor-pointer rounded-lg border border-[#e2e8f0] bg-[#f1f5f9] px-[0.8rem] py-[0.4rem] text-[0.8rem] leading-[normal] font-bold text-[#64748b] transition-all duration-200 ease-[ease] hover:border-[#fecdd3] hover:bg-[#fff1f2] hover:text-[#f43f5e]"
        >
          Remove
        </button>
      </div>
      <div className="mb-[0.6rem] flex items-baseline justify-between">
        <span
          className={`font-mono text-[2.1rem] font-extrabold tracking-[-0.03em] tabular-nums transition-colors duration-300 ease-[ease] ${priceFlash === "up" ? "text-[#10b981]" : priceFlash === "down" ? "text-[#f43f5e]" : "text-[#0f172a]"}`}
        >
          {price === null
            ? "Connecting..."
            : Number(price).toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
                minimumFractionDigits: Number(price) < 1 ? 4 : 2,
              })}
        </span>
        <span
          className={`inline-flex items-center gap-[0.3rem] whitespace-nowrap rounded-full border px-[0.65rem] py-1 font-mono text-[0.82rem] font-bold ${changePercent === null ? "border-[#e2e8f0] bg-[#f1f5f9] text-[#64748b]" : Number(changePercent) >= 0 ? "border-[#a7f3d0] bg-[#ecfdf5] text-[#10b981]" : "border-[#fecdd3] bg-[#fff1f2] text-[#f43f5e]"}`}
        >
          {changePercent === null
            ? "--%"
            : `${Number(changePercent) >= 0 ? "▲ +" : "▼ "}${Number(changePercent).toFixed(2)}%`}
        </span>
      </div>
    </section>
  );
};
