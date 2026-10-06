export const PriceCard = ({ price, changePercent, highPrice, coin }) => {
  
  return (
    <section>
      <h2>{coin}$</h2>
      <p>
        {price === null
          ? "Waiting For Live Price"
          : parseFloat(price).toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
      </p>
      <p>
        {changePercent === null
          ? "Waiting For Live Change Percent"
          : `${parseFloat(changePercent).toFixed(2)}%`}
      </p>
      <p>
        {highPrice === null
          ? "Waiting For Live High Price"
          : `${parseFloat(highPrice).toLocaleString("en-US", { style: "currency", currency: "USD" })}🔝`}
      </p>
    </section>
  );
};
