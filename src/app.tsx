import Router from "preact-router";
import { createHashHistory } from "history";
import Header from "./header";
import Home from "./pages/home";
import Export from "./pages/export";
import NotFound from "./pages/_404";

export function App() {
  let baseUrl = import.meta.env.BASE_URL;
  if (baseUrl.endsWith("/")) {
    baseUrl = baseUrl.slice(0, -1);
  }
  return (
    <>
      <Header />
        {/* eslint-disable-line */ /* @ts-ignore type we know this works, the type is just incorrect*/}
      <Router history={createHashHistory()}>
        {/* eslint-disable-line */ /* @ts-ignore type {path:string} is not assignalbe to type IntrinsicAttributes*/}
        <Home path={`${baseUrl}/`} />
        {/* eslint-disable-line */ /* @ts-ignore type {path:string} is not assignalbe to type IntrinsicAttributes*/}
        <Export path={`${baseUrl}/export`} />
        {/* eslint-disable-line */ /* @ts-ignore type {default} is not assignalbe to type IntrinsicAttributes*/}
        <NotFound default />
      </Router>
    </>
  );
}
