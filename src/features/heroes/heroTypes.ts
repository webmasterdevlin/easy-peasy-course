import { Action, Thunk, Computed, createTypedHooks } from "easy-peasy";

export type HeroStoreModel = {
  heroes: Hero[];
  hero: Hero;
  error: string;
  loading: boolean;

  getHeroesAction: Action<HeroStoreModel, Hero[]>;
  removeHeroAction: Action<HeroStoreModel, string>;
  addHeroAction: Action<HeroStoreModel, Hero>;
  updateHeroAction: Action<HeroStoreModel, Hero>;
  toggleLoadingAction: Action<HeroStoreModel, boolean>;
  setHeroAction: Action<HeroStoreModel, Hero>;

  addHeroThunk: Thunk<HeroStoreModel, Hero>;
  getHeroesThunk: Thunk<HeroStoreModel>;
  removeHeroThunk: Thunk<HeroStoreModel, string>;
  updateHeroThunk: Thunk<HeroStoreModel, Hero>;
};

export type Hero = {
  id: string;
  firstName: string;
  lastName: string;
  house: string;
  knownAs: string;
};

const typedHooks = createTypedHooks<HeroStoreModel>();

export const useHeroStoreActions = typedHooks.useStoreActions;
export const useHeroStoreDispatch = typedHooks.useStoreDispatch;
export const useHeroStoreState = typedHooks.useStoreState;
