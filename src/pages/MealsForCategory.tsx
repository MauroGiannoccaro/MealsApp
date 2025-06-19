import { useParams } from "react-router-dom";
import { memo, useCallback, useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import { MealCategory } from "../api/mealsCategoryTypes"; // Assicurati di importare le interfacce corrette
import { fetchMealCategory } from "../api/api";
import MealsForCategoryCard from "../components/MealsFromCategoryCard";
import { useAtom, useAtomValue } from "jotai";
import { allMealsAtom, allMealsFilteredAtom, filterAtomAllMeals } from "../api/atom";

// piatti per categoria con paginazione e fetch e filtro per la searchbar
//la loading circularProgress causa il re-render alternative?

const MealsForCategory = memo(() => {
  const { category } = useParams();
  const [allMeals, setAllMeals] = useAtom(allMealsAtom);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [filterAllMeals, setFilterAllMeals] = useAtom(filterAtomAllMeals);
  const filteredAllMeals = useAtomValue(allMealsFilteredAtom);
  console.log("category", category);
  const pageSize = 10;
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const categoryUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;

  useEffect(() => {
    if (category && allMeals) {
      fetchMealCategory(categoryUrl, startIndex, endIndex)
        .then((data: MealCategory) => {
          if (data.meals) {
            setAllMeals(data.meals);
            setLoading(false);
          } else {
            setAllMeals([]);
          }
          setLoading(false);
        })
        .catch((error: Error) => {
          console.error("Error fetching meals:", error);
          setLoading(false);
        });
    }
  }, [page]);

  console.log("meals", "allMeals", allMeals, "filtered", filteredAllMeals, filterAllMeals);

  const handleFilterChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterAllMeals(event.target.value);
  }, [setFilterAllMeals]);


  return (
    <>
      {loading ? <CircularProgress /> : (
        <MealsForCategoryCard
          category="category"
          page={page}
          setPage={setPage}
          pageSize={pageSize}
          handleFilterChange={handleFilterChange}
        />
      )}
    </>
  );
});

export default MealsForCategory;
