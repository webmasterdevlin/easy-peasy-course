import React from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import RootRouter from "./root-router";
import HeaderNav from "./shared/components/HeaderNav";
import { StoreProvider } from "easy-peasy";
import HeroStore from "./heroes/hero-store";
import VillainStore from "./villains/villain-store";

function App() {
  return (
    <StoreProvider store={HeroStore}>
      <BrowserRouter>
        <>
          <HeaderNav />
          <div className="container">
            <RootRouter />
          </div>
        </>
      </BrowserRouter>
    </StoreProvider>
  );
}

export default App;
