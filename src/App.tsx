import React from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Routes from "./routes";
import HeaderNav from "./components/HeaderNav";
import CombinedStores from "./store/combinedStores";

function App() {
  return (
    <CombinedStores>
      <BrowserRouter>
        <>
          <HeaderNav />
          <div className="container">
            <Routes />
          </div>
        </>
      </BrowserRouter>
    </CombinedStores>
  );
}

export default App;
