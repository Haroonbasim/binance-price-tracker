import { useEffect, useState } from "react";
import { createPriceSocket } from "../services/binanceSocket.js";
import { PriceCard } from "./PriceCard.jsx";
import { CoinPriceChart } from "./charts/CoinPriceChart.jsx";
export function LiveCoinCard({ coin, onRemoveCoin }) {
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
    <div className="flex min-w-0 flex-col justify-between rounded-[20px] border border-[#e2e8f0] bg-white p-6 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.05),0_2px_6px_-1px_rgba(15,23,42,0.03)] transition duration-250 ease-[ease] hover:-translate-y-1 hover:border-[#cbd5e1] hover:shadow-[0_16px_32px_-4px_rgba(15,23,42,0.09)]">
      <PriceCard
        coin={coin}
        onRemoveCoin={onRemoveCoin}
        price={price}
        changePercent={changePercent}
        highPrice={highPrice}
      />
      <CoinPriceChart coin={coin} points={points} />
    </div>
  );
}
