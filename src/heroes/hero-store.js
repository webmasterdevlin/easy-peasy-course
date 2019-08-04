import { createContextStore, createStore } from "easy-peasy";
import HeroModel from "./hero-model";

const HeroStore = createContextStore(HeroModel);

export default HeroStore;
