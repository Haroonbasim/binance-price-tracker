export function createPriceSocket(symbol) {
  const stream = `${symbol.toLowerCase()}@ticker`;
  return new WebSocket(`wss://stream.binance.com:9443/ws/${stream}`);
}
