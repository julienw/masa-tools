import Router from "preact-router";
import Header from "./header";
import Home from "./pages/home";
import Export from "./pages/export";

export function App() {
  return (
    <>
      <Header />
      <Router>
        {/* eslint-disable-line */ /* @ts-ignore type {path:string} is not assignalbe to type IntrinsicAttributes*/}
        <Home path="/" />
        {/* eslint-disable-line */ /* @ts-ignore type {path:string} is not assignalbe to type IntrinsicAttributes*/}
        <Export path="/export" />
      </Router>
    </>
  );
}