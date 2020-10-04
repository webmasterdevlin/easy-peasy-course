export type VillainStateType = {
  villains: Villain[];
  villain: Villain;
  error: string;
  loading: boolean;
};

export type Villain = {
  id: string;
  firstName: string;
  lastName: string;
  house: string;
  knownAs: string;
};

export type VillainActionType = {
  getVillains: () => Promise<void>;
  getVillainById: () => Promise<void>;
  postVillain: () => Promise<void>;
  deleteVillain: () => Promise<void>;
  putVillain: () => Promise<void>;
  setVillains: (villains: Villain[]) => void;
  setVillain: (villain: Villain) => void;
  setError: (message: string) => void;
  setIsLoading: () => void;
  addVillain: (villain: Villain) => void;
  removeVillain: (id: string) => void;
  updateVillains: (villain: Villain) => void;
  totalVillains: () => void;
};
