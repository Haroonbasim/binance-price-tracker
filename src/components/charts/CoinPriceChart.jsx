import { Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";
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

  const chartPoints = [...history, ...points].sort((a, b) => a.time - b.time);
  return (
    <section aria-label={`${coin} price chart`}>
      <h3>{coin} live chart</h3>
      <LineChart width={500} height={220} data={chartPoints}>
        <XAxis
          dataKey="time"
          type="number"
          domain={["dataMin", "dataMax"]}
          tickFormatter={(time) => new Date(time).toLocaleTimeString()}
        />
        <YAxis domain={["auto", "auto"]} />
        <Tooltip />
        <Line
          dataKey="price"
          type="monotone"
          dot={false}
          isAnimationActive={false}
        />
      </LineChart>
    </section>
  );
}
