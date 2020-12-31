import { api, Endpoints } from "api/axios-config";
import { Hero } from "./heroTypes";

export async function getHeroesAxios() {
  return await api.get<Hero[]>(Endpoints.heroes);
}

export async function deleteHeroAxios(id) {
  return await api.delete<void>(`${Endpoints.heroes}/${id}`);
}

export async function postHeroAxios(hero) {
  return await api.post<Hero>(Endpoints.heroes, hero);
}

export async function putHeroAxios(hero) {
  return await api.put<void>(`${Endpoints.heroes}${hero.id}`, hero);
}
