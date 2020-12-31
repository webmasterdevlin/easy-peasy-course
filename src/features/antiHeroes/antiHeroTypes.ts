import { Action, Thunk, Computed, createTypedHooks } from "easy-peasy";

export type AntiHeroStoreModel = {
  antiHeroes: AntiHero[];
  antiHero: AntiHero;
  error: string;
  loading: boolean;

  getAntiHeroesAction: Action<AntiHeroStoreModel, AntiHero[]>;
  removeAntiHeroAction: Action<AntiHeroStoreModel, string>;
  addAntiHeroAction: Action<AntiHeroStoreModel, AntiHero>;
  updateAntiHeroAction: Action<AntiHeroStoreModel, AntiHero>;
  toggleLoadingAction: Action<AntiHeroStoreModel, boolean>;
  setAntiHeroAction: Action<AntiHeroStoreModel, AntiHero>;

  addAntiHeroThunk: Thunk<AntiHeroStoreModel, AntiHero>;
  getAntiHeroesThunk: Thunk<AntiHeroStoreModel>;
  removeAntiHeroThunk: Thunk<AntiHeroStoreModel, string>;
  updateAntiHeroThunk: Thunk<AntiHeroStoreModel, AntiHero>;
};

export type AntiHero = {
  id: string;
  firstName: string;
  lastName: string;
  house: string;
  knownAs: string;
};

const typedHooks = createTypedHooks<AntiHeroStoreModel>();

export const useAntiHeroStoreActions = typedHooks.useStoreActions;
export const useAntiHeroStoreDispatch = typedHooks.useStoreDispatch;
export const useAntiHeroStoreState = typedHooks.useStoreState;
