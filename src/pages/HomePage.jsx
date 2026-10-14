import { MultiCoinChart } from "../components/charts/MultiCoinChart.jsx";
export function HomePage({ favorites }) {
  return (
    <main className="mx-auto w-full max-w-337.5 px-4 py-6 md:px-8 md:pt-[2.2rem] md:pb-16">
      <section className="rounded-[20px] border border-[#e2e8f0] bg-white px-[2.2rem] py-8 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.05),0_2px_6px_-1px_rgba(15,23,42,0.03)]">
        <h2 className="text-[1.65rem] font-extrabold tracking-[-0.03em]">
          Market Comparison (24h)
        </h2>
        <p className="mt-1 text-[0.92rem] text-[#64748b]">
          One unified chart displaying normalized percentage returns for all
          added coins
        </p>
        <MultiCoinChart coins={favorites} />
        <div className="mt-4 flex flex-wrap items-center justify-between gap-4 border-t border-[#e2e8f0] pt-[1.1rem] text-[0.85rem] text-[#64748b]">
          <div>
            <b>Performance Index:</b> Normalized % change across all coins from
            24 hours ago to live now.
          </div>
          <div>
            <b>Readings:</b> Hover over any point to inspect exact USD prices
            &amp; percentage returns for all assets.
          </div>
        </div>
      </section>
    </main>
  );
}
