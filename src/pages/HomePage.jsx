import { MultiCoinChart } from "../components/charts/MultiCoinChart.jsx";
export function HomePage({ favorites }) {
    return (
        <main>
            <MultiCoinChart coins={favorites} />
        </main>
    );
}
