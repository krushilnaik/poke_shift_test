import { Triangle, Type, TypeEffectiveness } from ".";

export interface Pokemon {
  number: number;
  name: string;
  types: Type[];
  species: string;
  weaknesses: TypeEffectiveness[];
  resistances: TypeEffectiveness[];
  immunities: TypeEffectiveness[];
  paths: Triangle[];
}
