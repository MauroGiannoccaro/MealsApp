import { memo } from "react";
import { List, ListItem, Typography, Box } from "@mui/material";
import { Meal } from "../api/mealDetailTypes";
import { useAtom } from "jotai";
import { MealsDetailListAtom } from "../api/atom";


const MealsDetailCard = memo(() => {
    const [mealDetail,] = useAtom(MealsDetailListAtom);

    return (
        <Box sx={{ padding: "40px" }}>
            <Typography variant="h4" component="h1">
                Meal Details
            </Typography>
            <List sx={{ width: "100%", gap: "5px", display: "grid", overflowY: "auto", overflowX: "auto" }}>
                {mealDetail?.meals?.map((meal: Meal) => (
                    <ListItem
                        key={meal.idMeal}
                        sx={{ margin: "10px", display: "flex", flexDirection: "column", backgroundColor: "#f5f5f5", boxShadow: "0 0 10px rgba(0,0,0,0.2)" }}
                    >
                        <Typography
                            variant="h5"
                            component="h2"
                        >
                            {meal.strMeal}
                        </Typography>
                        <img
                            src={meal.strMealThumb}
                            alt={meal.strMeal}
                            style={{ width: "50%", borderRadius: "8px", boxShadow: "0 0 10px rgba(0,0,0,0.2)", margin: "10px" }}
                        />
                        <Typography
                            variant="body1"
                            component="p"
                        >
                            {meal.strInstructions}
                        </Typography>
                        <Typography
                            variant="body2"
                            component="p"
                        >
                            <strong>Category:</strong> {meal.strCategory}
                        </Typography>
                        <Typography
                            variant="body2"
                            component="p"
                        >
                            <strong>Area:</strong> {meal.strArea}
                        </Typography>
                        <Typography
                            variant="body2"
                            component="p"
                        >
                            <strong>Tags:</strong> {meal.strTags}
                        </Typography>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
})

export default MealsDetailCard;
