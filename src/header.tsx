import { Link } from "preact-router/match";
export default function Header() {
  const baseUrl = import.meta.env.BASE_URL;
  return (
    <header>
      <nav>
        <Link href={`${baseUrl}/`}>Home</Link>
        <Link href={`${baseUrl}/export`}>Export</Link>
      </nav>
    </header>
  );
}
