import { useEffect, useState } from "react";
import { createPriceSocket } from "../services/binanceSocket.js";
import { PriceCard } from "./PriceCard.jsx";
import { CoinPriceChart } from "./charts/CoinPriceChart.jsx";
export function LiveCoinCard({ coin }) {
  const [price, setPrice] = useState(null);
  const [changePercent, setChangePercent] = useState(null);
  const [highPrice, setHighPrice] = useState(null);
  const [points, setPoints] = useState([]);
  useEffect(() => {
    const socket = createPriceSocket(`${coin}USDT`);
    socket.onmessage = (event) => {
      const ticker = JSON.parse(event.data);
      setPrice(ticker.c);
      setChangePercent(ticker.P);
      setHighPrice(ticker.h);
      setPoints((previous) => [
        ...previous.slice(-59),
        { time: Date.now(), price: Number(ticker.c) },
      ]);
    };
    return () => {
      socket.onmessage = null;
      socket.close();
    };
  }, [coin]);

  return (
  <div>
    <PriceCard
      coin={coin}
      price={price}
      changePercent={changePercent}
      highPrice={highPrice}
    />
    <CoinPriceChart coin={coin} points={points} />
  </div>
);
}
