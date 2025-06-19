
import { useAtom } from "jotai";
import { filterAtomMealList, MealsListAtom, newCategoryAtom } from "../api/atom";
import { Category, Meals } from "../api/mealsTypes";
import { useEffect, useState } from "react";
import { fetchMealsList } from "../api/api";
import MealsCategoryCards from "../components/MealsCategoryCard";


// pagina per il recupero con fetch delle categorie con controllo se sono stati aggiunte altre caregorie dal form apposito


function MealsCategories() {
    const [MealsList, setMealsList] = useAtom(MealsListAtom);
    const [filter, setFilter] = useAtom<string>(filterAtomMealList);
    const [loading, setLoading] = useState<boolean>(false);
    const url = "https://www.themealdb.com/api/json/v1/1/categories.php";
    const [newCategory, setNewCategory] = useAtom(newCategoryAtom);

    // controllo per l' aggiunta di nuove categoria
    useEffect(() => {
        if (newCategory && newCategory?.length > 0) {
            setMealsList((prev) => {
                if (prev) {
                    return { ...prev, categories: [...prev.categories, ...(Array.isArray(newCategory) ? newCategory : [newCategory])] };
                }
                return prev;
            });
            setNewCategory(undefined);
        }
        if (MealsList && MealsList.categories && MealsList.categories.length > 0) return;

        setLoading(true);

        try {
            fetchMealsList(url).then((list: Meals) => {
                setMealsList((prev) => {
                    return { ...prev, categories: list.categories };
                });
                
            });
            setLoading(false);
        } catch (error) {
            console.error("Error fetching meals list:", error);
            setLoading(false);
        }
        setFilter("");
    }, [setFilter]);

    if (loading) return <p>Loading...</p>;

    const filterMeals = MealsList?.categories.filter((category: Category) => {
        return category.strCategory.toLowerCase().includes(filter.toLowerCase());
    });

    console.log("MealsList", MealsList, "filtered", filterMeals, "NewCategory", newCategory);

    return (
        <>
            {filterMeals && filterMeals.length > 0 ? (
                <MealsCategoryCards
                    filterMeals={filterMeals}
                    filter={filter}
                    setFilter={setFilter}
                />
            ) : (
                <p>No meals found</p>
            )}
        </>
    );
}

export default MealsCategories;
