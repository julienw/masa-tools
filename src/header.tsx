import { Link } from "preact-router/match";
export default function Header() {
  return (
    <header>
      <nav>
        <Link href="/">Home</Link>
        <Link href="/export">Export</Link>
      </nav>
    </header>
  );
}
