import { action, createStore, thunk } from "easy-peasy";
import { AntiHero, AntiHeroStoreModel } from "./antiHeroTypes";
import {
  deleteAntiHeroAxios,
  getAntiHeroesAxios,
  postAntiHeroAxios,
  putAntiHeroAxios,
} from "./antiHeroService";

const AntiHeroStore = createStore<AntiHeroStoreModel>(
  {
    /*states*/
    antiHeroes: [],
    antiHero: {} as AntiHero,
    loading: false,
    error: "",

    /*actions*/
    getAntiHeroesAction: action((state, payload) => {
      state.antiHeroes = payload;
    }),
    removeAntiHeroAction: action((state, payload) => {
      state.antiHeroes = state.antiHeroes.filter((h) => h.id !== payload);
    }),
    addAntiHeroAction: action((state, payload) => {
      state.antiHeroes.push(payload);
    }),
    updateAntiHeroAction: action((state, payload) => {
      const index = state.antiHeroes.findIndex((h) => h.id == payload.id);
      state.antiHeroes[index] = payload;
    }),

    toggleLoadingAction: action((state, payload) => {
      state.loading = payload;
    }),
    setAntiHeroAction: action((state, payload) => {
      state.antiHero = payload;
    }),

    /*actions thunk*/
    getAntiHeroesThunk: thunk(async (actions) => {
      actions.toggleLoadingAction(true);
      try {
        const { data } = await getAntiHeroesAxios();
        actions.getAntiHeroesAction(data);
      } catch (e) {
        alert("Something happened. Please try again later.");
        console.log(e);
      }
      actions.toggleLoadingAction(false);
    }),
    removeAntiHeroThunk: thunk(async (actions, payload) => {
      actions.toggleLoadingAction(true);
      try {
        await deleteAntiHeroAxios(payload);
        actions.removeAntiHeroAction(payload);
      } catch (e) {
        alert("Something happened. Please try again later.");
        console.log(e);
      }
      actions.toggleLoadingAction(false);
    }),
    addAntiHeroThunk: thunk(async (actions, payload) => {
      actions.toggleLoadingAction(true);
      try {
        const { data } = await postAntiHeroAxios(payload);
        actions.addAntiHeroAction(data);
      } catch (e) {}
      actions.toggleLoadingAction(false);
    }),
    updateAntiHeroThunk: thunk(async (actions, payload) => {
      actions.toggleLoadingAction(true);
      try {
        await putAntiHeroAxios(payload);
        actions.updateAntiHeroAction(payload);
      } catch (e) {
        alert("Something happened. Please try again later.");
        console.log(e);
      }
      actions.toggleLoadingAction(false);
    }),
  },
  {
    name: "AntiHeroStore",
  }
);

export default AntiHeroStore;
