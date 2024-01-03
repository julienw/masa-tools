import Router from "preact-router";
import { createHashHistory } from "history";
import Header from "./header";
import Home from "./pages/home";
import Export from "./pages/export";
import NotFound from "./pages/_404";

export function App() {
  return (
    <>
      <Header />
      {/* @ts-expect-error type we know this works, the type is just incorrect*/}
      <Router history={createHashHistory()}>
        {/* @ts-expect-error type {path:string} is not assignable to type IntrinsicAttributes*/}
        <Home path="/" />
        {/* @ts-expect-error type {path:string} is not assignable to type IntrinsicAttributes*/}
        <Export path="/export" />
        {/* @ts-expect-error type {default} is not assignable to type IntrinsicAttributes*/}
        <NotFound default />
      </Router>
    </>
  );
}
