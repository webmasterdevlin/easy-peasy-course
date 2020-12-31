import React from "react";
import { StoreProvider } from "easy-peasy";
import HeroStore from "../features/heroes/heroStore";

// TODO: Add AntiHeroStore
const CombinedStores = ({ children }: any) => {
  return <StoreProvider store={HeroStore}>{children}</StoreProvider>;
};

export default CombinedStores;
