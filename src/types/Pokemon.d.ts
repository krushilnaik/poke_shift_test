export interface Pokemon {
  number: number;
  name: string;
  types: (
    | "Normal"
    | "Fire"
    | "Water"
    | "Electric"
    | "Grass"
    | "Ice"
    | "Fighting"
    | "Poison"
    | "Ground"
    | "Flying"
    | "Psychic"
    | "Bug"
    | "Rock"
    | "Ghost"
    | "Dragon"
    | "Dark"
    | "Steel"
    | "Fairy"
  )[];
  weaknesses: TypeEffectiveness[];
  resistances: TypeEffectiveness[];
  immunities: TypeEffectiveness[];
  paths: {
    points: string;
    color: string;
  }[];
}
