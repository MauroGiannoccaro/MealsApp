import { CircularProgress } from "@mui/material";
import { useAtom } from "jotai";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchMealDetailList } from "../api/api";
import { MealsDetailListAtom } from "../api/atom";
import { MealDetail } from "../api/mealDetailTypes";
import MealsDetailCard from "../components/MealsDetailCard";

// Pagina dei dettagli del piatto
// semplice fetch per il recupero delle informazioni

const MealsDetailPage = () => {
  const { id } = useParams();
  const [mealDetail, setMealDetail] = useAtom(MealsDetailListAtom);
  const [loading, setLoading] = useState(true);
  const urlDetail = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`

  useEffect(() => {
    if (id && id !== "") {
      fetchMealDetailList(urlDetail)
        .then((data: MealDetail) => {
          setMealDetail((prev) => {
            return { ...prev, meals: data.meals };
          });
          setLoading(false);
        })
        .catch((error: Error) => {
          console.error("Error fetching meal detail:", error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [id, setMealDetail]);

  console.log("Rendered MealsDetailCard, mealDetail:", mealDetail);

  if (loading) return <CircularProgress />;

  return (
    <MealsDetailCard />
  );
};

export default MealsDetailPage;
