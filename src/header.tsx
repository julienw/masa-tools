import { Link } from "preact-wouter";

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
