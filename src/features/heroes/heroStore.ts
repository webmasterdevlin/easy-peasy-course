import { action, createStore, thunk } from "easy-peasy";
import { Hero, HeroStoreModel } from "./heroTypes";
import {
  deleteHeroAxios,
  getHeroesAxios,
  postHeroAxios,
  putHeroAxios,
} from "./heroService";

const HeroStore = createStore<HeroStoreModel>(
  {
    /*states*/
    heroes: [],
    hero: {} as Hero,
    loading: false,
    error: "",

    /*actions*/
    getHeroesAction: action((state, payload) => {
      state.heroes = payload;
    }),
    removeHeroAction: action((state, payload) => {
      state.heroes = state.heroes.filter((h) => h.id !== payload);
    }),
    addHeroAction: action((state, payload) => {
      state.heroes.push(payload);
    }),
    updateHeroAction: action((state, payload) => {
      const index = state.heroes.findIndex((h) => h.id == payload.id);
      state.heroes[index] = payload;
    }),

    toggleLoadingAction: action((state, payload) => {
      state.loading = payload;
    }),
    setHeroAction: action((state, payload) => {
      state.hero = payload;
    }),

    /*actions thunk*/
    getHeroesThunk: thunk(async (actions) => {
      actions.toggleLoadingAction(true);
      try {
        const { data } = await getHeroesAxios();
        actions.getHeroesAction(data);
      } catch (e) {
        alert("Something happened. Please try again later.");
        console.log(e);
      }
      actions.toggleLoadingAction(false);
    }),
    removeHeroThunk: thunk(async (actions, payload) => {
      actions.toggleLoadingAction(true);
      try {
        await deleteHeroAxios(payload);
        actions.removeHeroAction(payload);
      } catch (e) {
        alert("Something happened. Please try again later.");
        console.log(e);
      }
      actions.toggleLoadingAction(false);
    }),
    addHeroThunk: thunk(async (actions, payload) => {
      actions.toggleLoadingAction(true);
      try {
        const { data } = await postHeroAxios(payload);
        actions.addHeroAction(data);
      } catch (e) {}
      actions.toggleLoadingAction(false);
    }),
    updateHeroThunk: thunk(async (actions, payload) => {
      actions.toggleLoadingAction(true);
      try {
        await putHeroAxios(payload);
        actions.updateHeroAction(payload);
      } catch (e) {
        alert("Something happened. Please try again later.");
        console.log(e);
      }
      actions.toggleLoadingAction(false);
    }),
  },
  {
    name: "HeroStore",
  }
);

export default HeroStore;
