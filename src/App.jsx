import { CoinPage } from "./pages/CoinPage.jsx";
import { Navbar } from "./components/Navbar.jsx";
import { Routes, Route } from "react-router";
import { HomePage } from "./pages/HomePage.jsx";
import { useState, useEffect } from "react";
import { supportedCoins } from "./data/supportedCoin.js";
import { StaticStrip } from "./components/StaticStrip.jsx";
function App() {
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem("cryptoFavorites");
      const parsed = JSON.parse(saved);
      if (
        Array.isArray(parsed) &&
        parsed.every((coin) => supportedCoins.includes(coin))
      ) {
        return parsed;
      }
    } catch {
      console.warn("Could not load saved favourites.");
    }
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem("cryptoFavorites", JSON.stringify(favorites));
    } catch {
      console.warn("Could not save favourites on this browser.");
    }
  }, [favorites]);

  function removeFavorite(coinToRemove) {
    const remainingCoins = favorites.filter((coin) => coin !== coinToRemove);
    setFavorites(remainingCoins);
  }

  function addFavorite(coinToAdd) {
    if (favorites.includes(coinToAdd)) return;
    setFavorites([...favorites, coinToAdd]);
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] bg-[radial-gradient(at_10%_0%,rgba(79,70,229,0.05)_0px,transparent_50%),radial-gradient(at_90%_10%,rgba(16,185,129,0.04)_0px,transparent_50%)] font-sans text-[#0f172a]">
      <StaticStrip />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage favorites={favorites} />} />
        <Route
          path="/coins"
          element={
            <CoinPage
              favorites={favorites}
              onRemoveCoin={removeFavorite}
              onAddCoin={addFavorite}
            />
          }
        />
      </Routes>
      <footer className="mt-auto border-t border-[#e2e8f0] bg-white p-6 text-center text-[0.85rem] text-[#64748b]">
        <p>
          ApexCrypto • Built with Recharts &amp; Binance Real-Time APIs • Light
          Theme
        </p>
      </footer>
    </div>
  );
}
export default App;
