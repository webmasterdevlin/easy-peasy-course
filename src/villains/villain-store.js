import { action, createContextStore, thunk } from 'easy-peasy'
import { deleteVillain, getVillainById, getVillains, postVillain, putVillain } from './villain-service'

const VillainStore = createContextStore({
  /*states*/
  villains: [],
  villain: {
    id: "",
    firstName: "",
    lastName: "",
    house: "",
    knownAs: ""
  },
  error: "",
  isLoading: false,
  /*actions with thunk side effects*/
  getVillains: thunk(async actions => {
    actions.setIsLoading();
    try {
      const { data } = await getVillains();
      actions.setVillains(data);
    } catch (e) {
      actions.setError(e);
    }
    actions.setIsLoading();
  }),
  getVillainById: thunk(async (actions, id) => {
    actions.setIsLoading();
    try {
      const { data } = await getVillainById(id);
      actions.setVillain(data);
    } catch (e) {
      actions.setError(e);
    }
    actions.setIsLoading();
  }),
  postVillain: thunk(async (actions, newVillain) => {
    actions.setIsLoading();
    try {
      const { data } = await postVillain(newVillain);
      actions.addVillain(data);
    } catch (e) {
      actions.setError(e);
    }
    actions.setIsLoading();
  }),
  // Optimistic UI update
  deleteVillain: thunk(async (actions, id, { getStoreState }) => {
    const previousVillains = getStoreState().villains;
    actions.removeVillain(id);

    try {
      await deleteVillain(id);
    } catch (e) {
      actions.setVillains(previousVillains);
      actions.setError(e);
    }
  }),
  putVillain: thunk(async (actions, updatedVillain) => {
    actions.setIsLoading();
    try {
      await putVillain(updatedVillain);
      actions.updateVillains(updatedVillain);
    } catch (e) {
      actions.setError(e);
    }
    actions.setIsLoading();
  }),
  /*actions*/
  setVillains: action((state, villains) => {
    state.villains = villains;
  }),
  setVillain: action((state, villain) => {
    state.villain = villain;
  }),
  setError: action((state, error) => {
    state.error = error.message;
    console.log(error);
    alert(error.message);
  }),
  setIsLoading: action(state => {
    state.isLoading = !state.isLoading;
  }),
  addVillain: action((state, newVillain) => {
    state.villains.push(newVillain);
  }),
  removeVillain: action((state, id) => {
    state.villains = state.villains.filter(v => v.id !== id);
  }),
  updateVillains: action((state, updatedVillain) => {
    const index = state.villains.findIndex(v => v.id === updatedVillain.id);
    state.villains[index] = updatedVillain;
  })
});

export default VillainStore;
