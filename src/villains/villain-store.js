import VillainModel from "./villain-model";
import { createContextStore } from "easy-peasy";

const VillainStore = createContextStore(VillainModel);

export default VillainStore;
