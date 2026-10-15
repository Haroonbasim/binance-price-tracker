import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useEffect, useState } from "react";
import { getPriceHistory } from "../../services/binanceHistory.js";

export function CoinPriceChart({ coin, points }) {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    let active = true;
    getPriceHistory(coin)
      .then((data) => {
        if (active) setHistory(data);
      })
      .catch((error) => console.error("Could not load chart history:", error));
    return () => {
      active = false;
    };
  }, [coin]);

  const chartPoints = history.map((point, index) =>
    index === history.length - 1 && points.length > 0
      ? { ...point, price: points.at(-1).price }
      : point,
  );
  const chartColor =
    chartPoints.length > 0 && chartPoints.at(-1).price < chartPoints[0].price
      ? "#f43f5e"
      : "#10b981";
  return (
    <section
      aria-label={`${coin} price chart`}
      className="relative mt-2 mb-4 h-35 w-full rounded-xl border border-[#e2e8f0] bg-[#fafcff] pt-[0.6rem] pr-[0.8rem] pb-[0.4rem] pl-[0.4rem]"
    >
      <AreaChart width="100%" height={122} responsive data={chartPoints}>
        <defs>
          <linearGradient id={`coin-fill-${coin}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={chartColor} stopOpacity={40 / 255} />
            <stop offset="100%" stopColor={chartColor} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} stroke="#f1f5f9" />
        <XAxis
          dataKey="time"
          type="number"
          domain={["dataMin", "dataMax"]}
          ticks={chartPoints
            .filter(
              (_, index) => index % Math.ceil(chartPoints.length / 5) === 0,
            )
            .map((point) => point.time)}
          tickFormatter={(time) =>
            new Date(time).toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })
          }
          tick={{
            fontSize: 9,
            fontFamily: "Plus Jakarta Sans",
            fill: "#94a3b8",
          }}
          tickLine={false}
          tickMargin={3}
          height={18}
          axisLine={{ stroke: "#e2e8f0" }}
        />
        <YAxis
          orientation="right"
          domain={["auto", "auto"]}
          tickCount={3}
          width={48}
          tickMargin={3}
          tickLine={false}
          axisLine={{ stroke: "#e2e8f0" }}
          tick={{
            fontSize: 10,
            fontFamily: "JetBrains Mono",
            fontWeight: 600,
            fill: "#64748b",
          }}
          tickFormatter={(value) =>
            Number(value) >= 1000
              ? `$${(Number(value) / 1000).toFixed(1)}k`
              : Number(value) < 1
                ? `$${Number(value).toFixed(3)}`
                : `$${Number(value).toLocaleString("en-US")}`
          }
        />
        <Tooltip
          cursor={false}
          content={({ active, payload, label }) =>
            active && payload?.length ? (
              <div className="rounded-md bg-[#0f172a]/92 p-2 text-white">
                <p className="mb-1 text-[10px] font-bold">
                  Time:{" "}
                  {new Date(Number(label)).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </p>
                <p className="font-mono text-[11px] font-semibold">
                  {Number(payload[0].value) < 1
                    ? `$${Number(payload[0].value).toFixed(4)}`
                    : Number(payload[0].value).toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                </p>
              </div>
            ) : null
          }
        />
        <Area
          dataKey="price"
          type="monotone"
          stroke={chartColor}
          strokeWidth={2}
          fill={`url(#coin-fill-${coin})`}
          fillOpacity={1}
          dot={false}
          activeDot={{ r: 4, stroke: "#ffffff", strokeWidth: 2 }}
          isAnimationActive={false}
        />
      </AreaChart>
    </section>
  );
}
