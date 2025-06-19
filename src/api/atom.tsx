import { atom } from "jotai";
import { Category, Meals } from "./mealsTypes";
import { MealDetail } from "./mealDetailTypes";
import { Meal } from "./mealsCategoryTypes";

// atom per la lista dei piatti
// atom per la lista dei dettalgi
//  filtri per gli atomi
// atomo per la lista dei piatti

export const MealsListAtom = atom<Meals>();

export const newCategoryAtom = atom<Category []|undefined>(undefined);

export const filterAtomMealList = atom<string>("");

export const MealsDetailListAtom = atom<MealDetail>();

export const filterAtomMealDetailList = atom<string>("");

export const allMealsAtom = atom<Meal[]>([]);

export const filterAtomAllMeals = atom<string>("");

export const allMealsFilteredAtom = atom((get)=>{
const filter = get(filterAtomAllMeals).toLowerCase();
const list = get(allMealsAtom);
console.log("list", list);
return list.filter((item) => item.strMeal.toLowerCase().includes(filter));
});
