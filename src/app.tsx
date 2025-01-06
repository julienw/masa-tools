import { Router, Route, Switch } from "preact-wouter";
import { useHashLocation } from "wouter/use-hash-location";
import Header from "./header";
import Home from "./pages/home";
import Export from "./pages/export";
import NotFound from "./pages/_404";

export function App() {
  return (
    <Router hook={useHashLocation}>
      <Header />
      <Switch>
        <Route path="/export" component={Export} />
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}
