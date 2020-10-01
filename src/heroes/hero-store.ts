import { action, computed, createContextStore, thunk, ThunkCreator } from 'easy-peasy'
import { deleteHero, getHeroById, getHeroes, postHero, putHero } from './hero-service'
import { HeroActionType, HeroStateType } from './hero-types';



const initialValues: HeroStateType = {
  heroes: [],
  hero: {
    id: "",
    firstName: "",
    lastName: "",
    house: "",
    knownAs: ""
  },
  error: "",
  isLoading: false,
}

const HeroStore = createContextStore({
  /*states*/
 ...initialValues,
  /*actions thunk side effects*/
  getHeroes: thunk(async (actions: HeroActionType) => {
    actions.setIsLoading();
    try {
      const { data } = await getHeroes();
      actions.setHeroes(data);
    } catch (e) {
      actions.setError(e);
    }
    actions.setIsLoading();
  }),
  getHeroById: thunk(async (actions: HeroActionType, id) => {
    actions.setIsLoading();
    try {
      const { data } = await getHeroById(id);
      actions.setHero(data);
    } catch (e) {
      actions.setError(e);
    }
    actions.setIsLoading();
  }),
  postHero: thunk(async (actions: HeroActionType, newHero) => {
    actions.setIsLoading();
    try {
      const { data } = await postHero(newHero);
      actions.addHero(data);
    } catch (e) {
      actions.setError(e);
    }
    actions.setIsLoading();
  }),
  // Pessimistic UI update
  deleteHero: thunk(async (actions: HeroActionType, id) => {
    actions.setIsLoading();
    try {
      await deleteHero(id);
      actions.removeHero(id);
    } catch (e) {
      actions.setError(e);
    }
    actions.setIsLoading();
  }),
  putHero: thunk(async (actions: HeroActionType, updatedHero) => {
    actions.setIsLoading();

    try {
      await putHero(updatedHero);
      actions.updateHeroes(updatedHero);
    } catch (e) {
      actions.setError(e);
    }
    actions.setIsLoading();
  }),
  /*actions*/
  setHeroes: action((state:HeroStateType, heroes) => {
    state.heroes = heroes;
  }),
  setHero: action((state:HeroStateType, hero) => {
    state.hero = hero;
  }),
  setError: action((state:HeroStateType, error) => {
    state.error = error.message;
    alert(error.message);
  }),
  setIsLoading: action((state:HeroStateType) => {
    state.isLoading = !state.isLoading;
  }),
  addHero: action((state:HeroStateType, newHero) => {
    state.heroes.push(newHero);
  }),
  removeHero: action((state:HeroStateType, id) => {
    state.heroes = state.heroes.filter(h => h.id !== id);
  }),
  updateHeroes: action((state:HeroStateType, updatedHero) => {
    const index = state.heroes.findIndex(h => h.id === updatedHero.id);
    state.heroes[index] = updatedHero;
  }),
  /*computed values i.e. derived state*/
  totalHeroes: computed((state:HeroStateType) => Object.values(state.heroes).length)
});

export default HeroStore;