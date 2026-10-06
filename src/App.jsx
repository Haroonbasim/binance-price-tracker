import { CoinPage } from "./pages/CoinPage.jsx";
import { Navbar } from "./components/Navbar.jsx";
import { Routes, Route } from "react-router";
import { HomePage } from "./pages/HomePage.jsx";
import { useState, useEffect } from "react";
import { supportedCoins } from "./data/supportedCoin.js";

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
    <div>
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
    </div>
  );
}
export default App;
