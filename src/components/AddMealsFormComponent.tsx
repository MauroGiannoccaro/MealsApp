import { Box, Container, TextField, Typography } from "@mui/material";
import { useAtom } from "jotai";
import { useForm, Controller } from "react-hook-form";
import { MealsListAtom, newCategoryAtom } from "../api/atom";
import { Category } from "../api/mealsTypes";
import { useState } from "react";
import { validateFormAddMeals } from "../utils/validateFormUtils";

type FormDataMeals = {
    mealsName: string;
    mealsFoto: string;
    mealsDescription: string;
};

const AddMealsFormComponent = () => {

    const { control, handleSubmit, reset } = useForm<FormDataMeals>();

    const [category, setNewCategory] = useAtom(newCategoryAtom);

    const [added, setAdded] = useState<string>("");

    const [formErrors, setFormErrors] = useState<{ [key: string]: string | null }>({});
    
    const [MealsList, setMealsList] = useAtom(MealsListAtom);


    const onSubmit = (data: FormDataMeals) => {
        const errors = validateFormAddMeals(data);
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }
        const newCategory: Category = {
            idCategory: (Math.floor(Math.random() * 1000)).toString(),
            strCategory: data.mealsName,
            strCategoryThumb: data.mealsFoto,
            strCategoryDescription: data.mealsDescription
        }
        setNewCategory(prev => [...(prev || []), newCategory]);
        setAdded("Nuova Categoria Creata");
        if (MealsList && MealsList.categories.length > 0) {
            setMealsList((prev) => {
                return { ...prev, categories: MealsList.categories };
            });
        }
        setFormErrors({});
        reset();
    };
    console.log('newCategory', category);
    return (
        <Container sx={{ padding: '10px', margin: 5, width: '150%', marginLeft: '-20%' }}>
        <Box sx={{ padding: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#f5f5f5', width: '100%', marginLeft: '-1%', boxShadow: '0 0 10px rgba(0,0,0,0.2)' }}>
            <Controller
                control={control}
                name="mealsName"
                defaultValue=""
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Meal Name"
                        placeholder=""
                        onBlur={onBlur}
                        onChange={onChange}
                        value={value}
                        sx={{ marginBottom: 5 }}
                        error={!!formErrors.mealsName}
                        helperText={formErrors.mealsName}
                    />
                )}
            />
            <Controller
                control={control}
                name="mealsFoto"
                defaultValue=""
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Meal Foto"
                        placeholder=""
                        onBlur={onBlur}
                        onChange={onChange}
                        value={value}
                        sx={{ marginBottom: 12 }}
                        error={!!formErrors.mealsFoto}
                        helperText={formErrors.mealsFoto}
                    />
                )}
            />
            <Controller
                control={control}
                name="mealsDescription"
                defaultValue=""
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Description"
                        placeholder=""
                        onBlur={onBlur}
                        onChange={onChange}
                        value={value}
                        sx={{ marginBottom: 12 }}
                        error={!!formErrors.mealsDescription}
                        helperText={formErrors.mealsDescription}
                    />
                )}
            />
            <Typography>
                {added}
            </Typography>

            <button onClick={handleSubmit(onSubmit)}>Submit</button>
        </Box>
        </Container>
    )
}

export default AddMealsFormComponent
