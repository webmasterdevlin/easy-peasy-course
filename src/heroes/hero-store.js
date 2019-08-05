import { action, createContextStore, thunk } from 'easy-peasy'
import { deleteHero, getHeroById, getHeroes, postHero, putHero } from './hero-service'

const HeroStore = createContextStore({
  /*states*/
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
  /*actions thunk side effects*/
  getHeroes: thunk(async actions => {
    actions.setIsLoading();
    try {
      const { data } = await getHeroes();
      actions.setHeroes(data);
    } catch (e) {
      actions.setError(e);
    }
    actions.setIsLoading();
  }),
  getHeroById: thunk(async (actions, id) => {
    actions.setIsLoading();
    try {
      const { data } = await getHeroById(id);
      actions.setHero(data);
    } catch (e) {
      actions.setError(e);
    }
    actions.setIsLoading();
  }),
  postHero: thunk(async (actions, newHero) => {
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
  deleteHero: thunk(async (actions, id) => {
    actions.setIsLoading();
    try {
      await deleteHero(id);
      actions.removeHero(id);
    } catch (e) {
      actions.setError(e);
    }
    actions.setIsLoading();
  }),
  putHero: thunk(async (actions, updatedHero) => {
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
  setHeroes: action((state, heroes) => {
    state.heroes = heroes;
  }),
  setHero: action((state, hero) => {
    state.hero = hero;
  }),
  setError: action((state, error) => {
    state.error = error.message;
    alert(error.message);
  }),
  setIsLoading: action(state => {
    state.isLoading = !state.isLoading;
  }),
  addHero: action((state, newHero) => {
    state.heroes.push(newHero);
  }),
  removeHero: action((state, id) => {
    state.heroes = state.heroes.filter(h => h.id !== id);
  }),
  updateHeroes: action((state, updatedHero) => {
    const index = state.heroes.findIndex(h => h.id === updatedHero.id);
    state.heroes[index] = updatedHero;
  })
});

export default HeroStore;
