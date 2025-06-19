import { Search } from "@mui/icons-material";
import { Box, Container, List, ListItem, TextField, Typography } from "@mui/material";
import { Category } from "../api/mealsTypes";
import boxStyles from "./BoxDefaultComponent";
import { Link } from "react-router-dom";
import { memo, useCallback } from "react";
import containerStyles from "./ContainerMealsCategoryComponent";

interface MealsCategoryCardsProps {
  filterMeals: Category[];
  filter: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
}

const MealsCategoryCards = memo(({ filterMeals, filter, setFilter }: MealsCategoryCardsProps) => {

  const handleFilterChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  }, [setFilter]);

  return (
    <Container sx={containerStyles}>
      <TextField
        id="search-category"
        name="searchCategory"
        sx={{ width: "20%", marginTop: "60px", position: "relative", alignItems: "center", backgroundColor: 'white' }}
        value={filter}
        onChange={handleFilterChange} // Utilizzo di useCallback per l'onChange
        placeholder="Search for a category"
        InputProps={{
          startAdornment: (
            <Search sx={{ backgroundColor: 'FFFFE0' }} />
          ),
        }}
      />
      <List sx={{ width: "80%", gap: "5px", display: "grid", gridTemplateColumns: { md: 'repeat(2, 1fr)', sm: 'repeat(1,1fr)' }, overflowY: "auto", overflowX: "auto", height: '80%', marginBottom: '100px', marginLeft: '-110px' }}>
        {filterMeals?.map((category: Category) => (
          <ListItem
            component={Link}
            to={`/meals/${category.strCategory}?image=${encodeURIComponent(category.strCategoryThumb)}`}
            key={category.idCategory} sx={{ margin: "10px", display: "flex", flexDirection: "column" }}
            state={ category.strCategory }
          >
            <Typography
              variant="h5"
              component="h3"
            >
              {category.strCategory}
            </Typography>
            <Box sx={boxStyles}>
              <img
                src={category.strCategoryThumb}
                alt={category.strCategory}
              />
              <Typography
                className="categoryText"
                variant="body1"
                component="div"
              >
                {category.strCategoryDescription}
              </Typography>
            </Box>
          </ListItem>
        ))}
      </List>
    </Container>
  );
});

export default MealsCategoryCards;
