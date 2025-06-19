import { MealDetail } from "./mealDetailTypes";
import { Meals } from "./mealsTypes";
import { MealCategory } from "../api/mealsCategoryTypes";

export const fetchMealsList = async (url: string): Promise<Meals> => {   //fetch per il recupero delle categorie
    const response = await fetch(url);
    const data = await response.json();
    console.log("FetchData:", data);
    return data;
};

export const fetchMealDetailList = async (url: string): Promise<MealDetail> => {    //recupero della lista dei piatti
    const response = await fetch(url);
    const data = await response.json();
    console.log("FetchMealDetailData:", data);
    return data;
};

// lista dei dettalgi

export const fetchMealCategory = async (url: string, startIndex: number, endIndex: number): Promise<MealCategory> => {

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    const filterPages = data.meals.slice(startIndex, endIndex)
    console.log (filterPages, "fetch meal category")
    return {
        meals: filterPages
    }
}
