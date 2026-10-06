import { Link } from "react-router";
export function Navbar() {
  return (
    <nav aria-label="Main Navigation">
      <Link to="/">Home</Link> <Link to="/coins">Coins</Link>
    </nav>
  );
}
