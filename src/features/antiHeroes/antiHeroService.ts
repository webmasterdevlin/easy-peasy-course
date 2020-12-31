import { api, Endpoints } from "api/axios-config";
import { AntiHero } from "./antiHeroTypes";

export async function getAntiHeroesAxios() {
  return await api.get<AntiHero[]>(Endpoints.antiHeroes);
}

export async function deleteAntiHeroAxios(id) {
  return await api.delete<void>(`${Endpoints.antiHeroes}/${id}`);
}

export async function postAntiHeroAxios(antiHero) {
  return await api.post<AntiHero>(Endpoints.antiHeroes, antiHero);
}

export async function putAntiHeroAxios(antiHero) {
  return await api.put<void>(`${Endpoints.antiHeroes}${antiHero.id}`, antiHero);
}
