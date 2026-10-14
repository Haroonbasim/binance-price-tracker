import { useEffect, useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ReferenceLine,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { getPriceHistory } from "../../services/binanceHistory.js";
import { createPriceSocket } from "../../services/binanceSocket.js";
const colors = [
  "#2563eb",
  "#dc2626",
  "#16a34a",
  "#9333ea",
  "#ea580c",
  "#0891b2",
  "#be185d",
  "#65a30d",
  "#7c3aed",
];

export function MultiCoinChart({ coins }) {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [livePrices, setLivePrices] = useState({});
  const [legendHeight, setLegendHeight] = useState(0);
  const [hoveredPercent, setHoveredPercent] = useState(null);
  useEffect(() => {
    const sockets = coins.map((coin) => {
      const socket = createPriceSocket(`${coin}USDT`);
      socket.onmessage = (event) => {
        const price = Number(JSON.parse(event.data).c);

        if (Number.isFinite(price) && price > 0) {
          setLivePrices((previous) => ({ ...previous, [coin]: price }));
          setData((previous) => {
            const basePrice = previous[0]?.[`${coin}Price`];
            if (!basePrice) return previous;
            return previous.map((point, index) =>
              index === previous.length - 1
                ? {
                    ...point,
                    [coin]: Number(
                      (((price - basePrice) / basePrice) * 100).toFixed(2),
                    ),
                    [`${coin}Price`]: price,
                  }
                : point,
            );
          });
        }
      };
      return socket;
    });
    return () =>
      sockets.forEach((socket) => {
        socket.onmessage = null;
        socket.close();
      });
  }, [coins]);
  useEffect(() => {
    let active = true;
    Promise.all(coins.map(getPriceHistory))
      .then((histories) => {
        if (!active) return;
        const byTime = {};
        histories.forEach((history, index) => {
          const coin = coins[index];
          const startingPrice = history[0]?.price;
          if (!startingPrice) return;
          history.forEach(({ time, price }) => {
            if (!byTime[time]) byTime[time] = { time };
            byTime[time][coin] =
              ((price - startingPrice) / startingPrice) * 100;
            byTime[time][`${coin}Price`] = price;
          });
        });
        setData(Object.values(byTime).sort((a, b) => a.time - b.time));
      })
      .catch((problem) => {
        if (active) setError(problem.message);
      });
    return () => {
      active = false;
    };
  }, [coins]);
  if (coins.length === 0) return <p>Add a coin on the Coins page.</p>;
  if (error) return <p>Chart unavailable: {error}</p>;
  if (data.length === 0) return <p>Loading chart...</p>;

  return (
    <LineChart
      width="100%"
      height={440 + legendHeight}
      responsive
      data={data}
      onMouseMove={({ activeTooltipIndex, isTooltipActive }) =>
        setHoveredPercent(
          isTooltipActive
            ? (data[activeTooltipIndex]?.[coins[0]] ?? null)
            : null,
        )
      }
      onMouseLeave={() => setHoveredPercent(null)}
    >
      <CartesianGrid vertical={false} stroke="#e2e8f0" />
      <CartesianGrid horizontal={false} stroke="#f1f5f9" />

      <XAxis
        dataKey="time"
        type="number"
        domain={["dataMin", "dataMax"]}
        ticks={data
          .filter((_, index) => index % Math.ceil(data.length / 8) === 0)
          .map((point) => point.time)}
        tickFormatter={(time) =>
          new Date(time).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })
        }
        tick={{
          fontSize: 11,
          fontFamily: "Plus Jakarta Sans",
          fill: "#64748b",
        }}
        tickLine={false}
        axisLine={{ stroke: "#e2e8f0" }}
      />

      <YAxis
        orientation="right"
        domain={["auto", "auto"]}
        tickCount={7}
        width={80}
        tickFormatter={(value) => `${Number(value) >= 0 ? "+" : ""}${value}%`}
        tick={{
          fontSize: 12,
          fontFamily: "JetBrains Mono",
          fontWeight: 600,
          fill: "#475569",
        }}
        tickLine={false}
        axisLine={{ stroke: "#e2e8f0" }}
        label={{
          value: "24h Change (%)",
          angle: 90,
          position: "insideRight",
          fontSize: 11,
          fontFamily: "Plus Jakarta Sans",
          fontWeight: 700,
          fill: "#64748b",
        }}
      />
      <ReferenceLine y={0} stroke="rgba(148,163,184,0.6)" strokeWidth={1.5} />
      {hoveredPercent !== null && (
        <ReferenceLine
          y={hoveredPercent}
          stroke="rgba(100,116,139,0.45)"
          strokeWidth={1}
          strokeDasharray="4 4"
        />
      )}
      <Tooltip
        cursor={{
          stroke: "rgba(100,116,139,0.45)",
          strokeWidth: 1,
          strokeDasharray: "4 4",
        }}
        content={({ active, payload, label }) =>
          active && payload?.length ? (
            <div className="rounded-[10px] border border-[#334155] bg-[#0f172a]/94 p-3.5 text-white">
              <p className="mb-1 text-xs font-bold">
                Timestamp:{" "}
                {new Date(Number(label)).toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}
              </p>
              <div className="font-mono text-[11px]">
                {payload.map((item) => {
                  const price = Number(item.payload[`${item.dataKey}Price`]);
                  return (
                    <div key={item.dataKey} className="flex items-center gap-1">
                      <svg
                        className="size-2.5 shrink-0"
                        viewBox="0 0 10 10"
                        aria-hidden="true"
                      >
                        <rect
                          x="1"
                          y="1"
                          width="8"
                          height="8"
                          fill={item.color}
                          stroke="white"
                        />
                      </svg>
                      <span>
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
                          }[item.dataKey]
                        }{" "}
                        ({item.dataKey}): {Number(item.value) >= 0 ? "+" : ""}
                        {Number(item.value).toFixed(2)}% (
                        {price < 1
                          ? `$${price.toFixed(4)}`
                          : price.toLocaleString("en-US", {
                              style: "currency",
                              currency: "USD",
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                        )
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : null
        }
      />

      <Legend
        verticalAlign="top"
        align="left"
        width="100%"
        itemSorter={null}
        onBBoxUpdate={(box) => setLegendHeight(box?.height ?? 0)}
        content={({ payload }) => (
          <div
            className="flex flex-wrap items-center gap-3 pt-5 pb-6"
            ref={(element) => {
              if (!element) return;
              const measure = () =>
                setLegendHeight(element.getBoundingClientRect().height);
              measure();
              const observer = new ResizeObserver(measure);
              observer.observe(element);
              return () => observer.disconnect();
            }}
          >
            {" "}
            {payload?.map(({ value, color }) => (
              <div
                key={value}
                className="flex items-center gap-2 rounded-[10px] border border-[#e2e8f0] bg-[#f1f5f9] px-[0.85rem] py-[0.4rem] text-[0.82rem] font-bold"
              >
                <svg
                  className="size-2.5 shrink-0"
                  viewBox="0 0 10 10"
                  aria-hidden="true"
                >
                  <circle cx="5" cy="5" r="5" fill={color} />
                </svg>
                <span>
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
                    }[value]
                  }{" "}
                  ({value})
                </span>
                <span className="min-w-21.25 font-mono text-[#0f172a] tabular-nums">
                  {livePrices[value]
                    ? `$${livePrices[value].toLocaleString("en-US")}`
                    : "$--"}
                </span>
              </div>
            ))}
          </div>
        )}
      />
      {coins.map((coin, index) => (
        <Line
          key={coin}
          dataKey={coin}
          type="monotone"
          strokeWidth={2.5}
          stroke={
            {
              BTC: "#f59e0b",
              ETH: "#6366f1",
              SOL: "#10b981",
              BNB: "#ca8a04",
              XRP: "#0284c7",
              DOGE: "#d97706",
              ADA: "#2563eb",
              TRX: "#dc2626",
              USDC: "#16a34a",
            }[coin]
          }
          dot={({ cx, cy, stroke, index }) => (
            <circle
              key={index}
              cx={cx}
              cy={cy}
              r={2}
              fill={stroke}
              stroke="#ffffff"
              strokeWidth={2}
            />
          )}
          activeDot={{ r: 6, stroke: "#ffffff", strokeWidth: 2 }}
          isAnimationActive={false}
        />
      ))}
    </LineChart>
  );
}
