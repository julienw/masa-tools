import Router from "preact-router";
import Header from "./header";
import Home from "./pages/home";
import Export from "./pages/export";

export function App() {
  return (
    <>
      <Header />
      <Router>
        <Home path="/" />
        <Export path="/export" />
      </Router>
    </>
  );
}
