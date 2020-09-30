export type HeroStateType = {
    heroes: Hero[],
    hero: Hero,
    error: string,
    isLoading: boolean,
  }
  
  export type Hero = {
    id: string,
    firstName: string,
    lastName: string,
    house: string,
    knownAs:string
  }
  
  export type HeroActionType = {
    setHeroes: any;
    setHero: any;
    setError: any;
    setIsLoading: any;
    addHero:any;
    removeHero:any;
    updateHeroes:any;
    totalHeroes: any;
  }