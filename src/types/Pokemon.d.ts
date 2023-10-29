import { Triangle, Type, TypeEffectiveness } from ".";

export interface Pokemon {
  // number: number;
  name: string;
  types: Type[];
  // species: string;
  weaknesses: object;
  resistances: object;
  immunities: object;
  paths: Triangle[];
}
