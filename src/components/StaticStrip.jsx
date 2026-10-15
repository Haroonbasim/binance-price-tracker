export function StaticStrip() {
  return (
    <div className="flex items-center justify-between border-b border-[#e2e8f0] bg-white px-8 py-[0.6rem] text-[0.8rem] font-semibold text-[#64748b]">
      <div className="flex flex-wrap items-center gap-8">
        <div className="flex items-center gap-[0.4rem]">
          <span>Market Cap:</span>
          <b className="font-mono text-[#0f172a]">$2.71T</b>
          <span className="text-[#10b981]">+2.4%</span>
        </div>
        <div className="flex items-center gap-[0.4rem]">
          <span>24h Volume:</span>
          <b className="font-mono text-[#0f172a]">$84.18B</b>
        </div>
        <div className="flex items-center gap-[0.4rem]">
          <span>BTC Dominance:</span>
          <b className="font-mono text-[#4f46e5]">55.1%</b>
        </div>
        <div className="flex items-center gap-[0.4rem]">
          <span>ETH Gas:</span>
          <b className="font-mono text-[#0f172a]">14 Gwei</b>
        </div>
      </div>
      <div className="text-xs text-[#94a3b8]">BINANCE LIVE REST &amp; WS</div>
    </div>
  );
}
