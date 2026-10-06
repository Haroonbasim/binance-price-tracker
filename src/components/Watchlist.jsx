import { useState } from "react";
import { supportedCoins } from "../data/supportedCoin.js";
export function Watchlist({ coins, onRemoveCoin, onAddCoin }) {
  const [selectedCoin, setSelectedCoin] = useState("BTC");
  return (
    <section>

      <h2>Coin List</h2>
      <select
        value={selectedCoin}
        onChange={(event) => setSelectedCoin(event.target.value)}
      >
        {supportedCoins.map((coin) => (
          <option key={coin} value={coin}>
            {coin}
          </option>
        ))}
      </select>

      <button type="button" onClick={() => onAddCoin(selectedCoin)}>
        Add coin
      </button>
      
      <ul>
        {coins.map((coin) => (
          <li key={coin}>
            {coin}
      
            <button type="button" onClick={() => onRemoveCoin(coin)}>
              Remove
            </button>
      
          </li>
        ))}
      </ul>
    </section>
  );
}
