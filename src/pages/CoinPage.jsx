import { LiveCoinCard } from "../components/LiveCoinCard.jsx";
import { Watchlist } from "../components/Watchlist.jsx";
export function CoinPage({ favorites, onRemoveCoin, onAddCoin }) {
  return (
    <main>
      {favorites.map((coin) => (
        <LiveCoinCard key={coin} coin={coin} />
      ))}
     <Watchlist coins={favorites} onRemoveCoin={onRemoveCoin} onAddCoin={onAddCoin} />
    </main> 
  );
}
