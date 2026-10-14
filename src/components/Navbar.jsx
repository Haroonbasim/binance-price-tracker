import { Link, NavLink } from "react-router";
export function Navbar() {
  return (
    <nav
      aria-label="Main Navigation"
      className="sticky top-0 z-100 border-b border-[#e2e8f0] bg-white/92 px-4 py-[0.85rem] backdrop-blur-lg md:px-8 md:py-[0.9rem]"
    >
      <div className="mx-auto flex max-w-337.5  items-center justify-between">
        <Link to="/" className="flex items-center gap-[0.8rem]">
          <span className="flex size-9.5 items-center justify-center rounded-[11px] bg-[linear-gradient(135deg,#4f46e5_0%,#06b6d4_100%)] text-[1.15rem] font-extrabold text-white shadow-[0_4px_12px_rgba(79,70,229,0.25)]">
            ⚡
          </span>
          <span className="text-[1.25rem] font-extrabold tracking-[-0.03em]">
            ApexCrypto
          </span>
        </Link>
        <div className="flex gap-1 rounded-xl border border-[#e2e8f0] bg-[#f1f5f9] p-1">
          {" "}
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
           `rounded-[9px] px-[1.35rem] py-[0.55rem] text-[0.9rem] leading-[normal] font-bold transition-all duration-200 ease-[ease] ${isActive ? "bg-white text-[#4f46e5] shadow-[0_2px_8px_rgba(15,23,42,0.06)]" : "text-[#64748b]"}`
          }
          >
            Home
          </NavLink>{" "}
          <NavLink
            to="/coins"
            className={({ isActive }) =>
            `rounded-[9px] px-[1.35rem] py-[0.55rem] text-[0.9rem] leading-[normal] font-bold transition-all duration-200 ease-[ease] ${isActive ? "bg-white text-[#4f46e5] shadow-[0_2px_8px_rgba(15,23,42,0.06)]" : "text-[#64748b]"}`
            }
          >
            Coins
          </NavLink>{" "}
        </div>
        <div className="flex items-center gap-2 rounded-full border border-[#a7f3d0] bg-[#ecfdf5] px-[0.85rem] py-[0.4rem] text-[0.78rem] font-bold text-[#10b981]">
          <span className="relative size-2 rounded-full bg-current">
            <span className="absolute -inset-0.75 animate-ping rounded-full border-[1.5px] border-current [animation-duration:1.8s]" />
          </span>
          <span>BINANCE LIVE</span>
        </div>
      </div>
    </nav>
  );
}
