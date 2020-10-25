import { action, computed, createStore, thunk } from "easy-peasy";
import {
  deleteVillain,
  getVillainById,
  getVillains,
  postVillain,
  putVillain,
} from "./villain-service";
import { Villain, VillainActionType, VillainStateType } from "./villain-types";

const VillainStore = createStore({
  /*states*/
  villains: [],
  villain: {
    id: "",
    firstName: "",
    lastName: "",
    house: "",
    knownAs: "",
  },
  error: "",
  loading: false,
  /*actions with thunk side effects*/
  getVillains: thunk(async (actions: VillainActionType) => {
    actions.setIsLoading();
    try {
      const { data } = await getVillains();
      actions.setVillains(data);
    } catch (e) {
      actions.setError(e);
    }
    actions.setIsLoading();
  }),
  getVillainById: thunk(async (actions: VillainActionType, id: string) => {
    actions.setIsLoading();
    try {
      const { data } = await getVillainById(id);
      actions.setVillain(data);
    } catch (e) {
      actions.setError(e);
    }
    actions.setIsLoading();
  }),
  postVillain: thunk(
    async (actions: VillainActionType, newVillain: Villain) => {
      actions.setIsLoading();
      try {
        const { data } = await postVillain(newVillain);
        actions.addVillain(data);
      } catch (e) {
        actions.setError(e);
      }
      actions.setIsLoading();
    }
  ),
  // Optimistic UI update
  deleteVillain: thunk(
    async (actions: VillainActionType, id: string, { getStoreState }: any) => {
      const previousVillains = getStoreState().villains;
      actions.removeVillain(id);

      try {
        await deleteVillain(id);
      } catch (e) {
        actions.setVillains(previousVillains);
        actions.setError(e);
      }
    }
  ),
  putVillain: thunk(
    async (actions: VillainActionType, updatedVillain: Villain) => {
      actions.setIsLoading();
      try {
        await putVillain(updatedVillain);
        actions.updateVillains(updatedVillain);
      } catch (e) {
        actions.setError(e);
      }
      actions.setIsLoading();
    }
  ),
  /*actions*/
  setVillains: action((state: VillainStateType, villains: Villain[]) => {
    state.villains = villains;
  }),
  setVillain: action((state: VillainStateType, villain: Villain) => {
    state.villain = villain;
  }),
  setError: action((state: VillainStateType, error: any) => {
    state.error = error.message;
    console.log(error);
    alert(error.message);
  }),
  setIsLoading: action((state: VillainStateType) => {
    state.loading = !state.loading;
  }),
  addVillain: action((state: VillainStateType, newVillain: Villain) => {
    state.villains.push(newVillain);
  }),
  removeVillain: action((state: VillainStateType, id: string) => {
    state.villains = state.villains.filter((v) => v.id !== id);
  }),
  updateVillains: action((state: VillainStateType, updatedVillain: Villain) => {
    const index = state.villains.findIndex((v) => v.id === updatedVillain.id);
    state.villains[index] = updatedVillain;
  }),
  /*computed values i.e. derived state*/
  totalVillains: computed(
    (state: VillainStateType) => Object.values(state.villains).length
  ),
});

export default VillainStore;
