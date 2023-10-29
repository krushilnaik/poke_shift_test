import { Triangle, Type, TypeEffectiveness } from ".";

export interface Pokemon {
  // number: number;
  name: string;
  types: Type[];
  // species: string;
  weaknesses: {
    [Type]: number;
  };
  resistances: {
    [Type]: number;
  };
  immunities: {
    [Type]: number;
  };
  paths: Triangle[];
}
