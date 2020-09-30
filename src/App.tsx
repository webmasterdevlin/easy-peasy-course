import React from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import RootRouter from "./root-router";
import HeaderNav from "./shared/components/HeaderNav";
import HeroStore from "./heroes/hero-store";
import VillainStore from "./villains/villain-store";

function App() {
  return (
    <HeroStore.Provider>
      <VillainStore.Provider>
        <BrowserRouter>
          <>
            <HeaderNav />
            <div className="container">
              <RootRouter />
            </div>
          </>
        </BrowserRouter>
      </VillainStore.Provider>
    </HeroStore.Provider>
  );
}

export default App;
