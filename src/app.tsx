import { LocationProvider, Router } from "preact-iso";
import Header from "./header";
import Home from "./pages/home";
import Export from "./pages/export";
import NotFound from "./pages/_404";

export function App() {
  return (
    <LocationProvider>
      <Header />
      <Router>
        <Home path="/" />
        <Export path="/export" />
        <NotFound default />
      </Router>
    </LocationProvider>
  );
}
