import React from "react";
import { StoreProvider } from "easy-peasy";
import HeroStore from "../features/heroes/heroStore";

const CombinedStores = ({ children }: any) => {
  return <StoreProvider store={HeroStore}>s{children}</StoreProvider>;
};

export default CombinedStores;
