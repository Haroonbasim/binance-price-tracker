import { useEffect, useState } from "react";
import { CartesianGrid, Legend, Line, LineChart, ReferenceLine, Tooltip, XAxis, YAxis } from "recharts";
import { getPriceHistory } from "../../services/binanceHistory.js";

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
            byTime[time][coin] = ((price - startingPrice) / startingPrice) * 100;
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
    <LineChart width="100%" height={420} responsive data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis
        dataKey="time"
        type="number"
        domain={["dataMin", "dataMax"]}
        tickFormatter={(time) => new Date(time).toLocaleTimeString()}
      />
      <YAxis domain={["dataMin", "dataMax"]} width="auto" tickFormatter={(value) => `${value.toFixed(2)}%`} />
      <ReferenceLine y={0} stroke="#888" />
      <Tooltip
        labelFormatter={(time) => new Date(time).toLocaleTimeString()}
        formatter={(percent, coin, item) => [
          `${Number(percent).toFixed(2)}% · ${Number(item.payload[`${coin}Price`]).toLocaleString("en-US", { maximumFractionDigits: 8 })} USDT`,
          coin,
        ]}
      />
      <Legend />
      {coins.map((coin, index) => (
        <Line
          key={coin}
          dataKey={coin}
          type="monotone"
          stroke={colors[index]}
          dot={false}
          isAnimationActive={false}
        />
      ))}
    </LineChart>
  );
}
