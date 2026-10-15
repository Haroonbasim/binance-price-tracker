import { LiveCoinCard } from "../components/LiveCoinCard.jsx";
import { Watchlist } from "../components/Watchlist.jsx";
export function CoinPage({ favorites, onRemoveCoin, onAddCoin }) {
  return (
    <main className="mx-auto w-full max-w-337.5 px-4 py-6 md:px-8 md:pt-[2.2rem] md:pb-16">
      <Watchlist
        coins={favorites}
        onRemoveCoin={onRemoveCoin}
        onAddCoin={onAddCoin}
      />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-[repeat(auto-fill,minmax(360px,1fr))]">
        {favorites.map((coin) => (
          <LiveCoinCard key={coin} coin={coin} onRemoveCoin={onRemoveCoin} />
        ))}
      </div>
    </main>
  );
}
