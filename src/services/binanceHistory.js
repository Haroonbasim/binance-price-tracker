export async function getPriceHistory(coin) {
  const symbol = `${coin}USDT`;
  const url = `https://data-api.binance.vision/api/v3/klines?symbol=${symbol}&interval=1h&limit=24`;
  const response = await fetch(url);
  if (!response.ok)
    throw new Error(`History request failed: ${response.status}`);
  const candles = await response.json();

  return candles.map((candle) => ({
    time: candle[0],
    price: Number(candle[4]),
  }));
}
