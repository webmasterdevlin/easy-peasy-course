export type HeroStateType = {
  heroes: Hero[];
  hero: Hero;
  error: string;
  loading: boolean;
};

export type Hero = {
  id: string;
  firstName: string;
  lastName: string;
  house: string;
  knownAs: string;
};

export type HeroActionType = {
  getHeroes: () => Promise<void>;
  getHeroById: () => Promise<void>;
  postHero: () => Promise<void>;
  deleteHero: () => Promise<void>;
  putHero: () => Promise<void>;
  setHeroes: (heroes: Hero[]) => void;
  setHero: (hero: Hero) => void;
  setError: (message: string) => void;
  setIsLoading: () => void;
  addHero: (hero: Hero) => void;
  removeHero: (id: string) => void;
  updateHeroes: (hero: Hero) => void;
  totalHeroes: () => void;
};
