import { Link } from "preact-router/match";
export default function Header() {
  let baseUrl = import.meta.env.BASE_URL;
  if (baseUrl.endsWith("/")) {
    baseUrl = baseUrl.slice(0, -1);
  }
  return (
    <header>
      <nav>
        <Link href={`${baseUrl}/`}>Home</Link>
        <Link href={`${baseUrl}/export`}>Export</Link>
      </nav>
    </header>
  );
}
