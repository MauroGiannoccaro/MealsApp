import { Avatar, Box, ListItem, TextField, Typography } from '@mui/material'
import { useAtom, useAtomValue } from 'jotai';
import { Link, useLocation } from 'react-router-dom';
import { allMealsAtom, allMealsFilteredAtom, filterAtomAllMeals } from '../api/atom';
import { Search } from '@mui/icons-material';

// card con filtro su atom

interface MealsForCategoryCardProps {
  category: string;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  pageSize: number;
  handleFilterChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function MealsFromCategoryCard({ category, page, setPage, pageSize, handleFilterChange }: MealsForCategoryCardProps) {

  const [allMeals,] = useAtom(allMealsAtom);
  const [filterAllMeals,] = useAtom(filterAtomAllMeals);
  const filteredAllMeals = useAtomValue(allMealsFilteredAtom);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const image = params.get('image');
  
  console.log(allMeals, "allMeals");

  return (
    <Box sx={{ padding: "20px" }}>
      <Box sx={{ display: "flex", justifyContent: "center", flexDirection: "row", marginTop: "20px", alignItems: "center" }}>      
      <Typography variant="h4" component="h1" margin={'20px'} sx={{borderRadius: '10px', boxShadow:'5px 5px 5px #888888'}}>
        <p>Meals Category</p>
        <Avatar
          src={image || ''}
          alt="Category Image"
          sx={{ width: 70, height: 70, marginLeft: "50px", marginTop: "-20px" }}
        />  
      </Typography>
      <TextField
          id="search-category"
          name="searchCategory"
          sx={{ width: "100%", marginbotton: "20px", position: "relative", alignItems: "center", padding: "10px", boxShadow:'5px 5px 5px #888888', borderRadius: '10px' }}
          value={filterAllMeals}
          onChange={handleFilterChange} // Utilizzo di useCallback per l'onChange
          placeholder="Search for a category"
          InputProps={{
            startAdornment: (
              <Search />
            ),
          }} />
      </Box>
      <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "20px", marginTop: "10px" }}>
        {filteredAllMeals.map((meal) => (
          <ListItem 
          component={Link} 
          to={`/meals/${category}/${meal.idMeal}`} 
          key={meal.idMeal} 
          sx={{ border: "1px solid #ddd", borderRadius: "8px", padding: "10px", textAlign: "center", backgroundColor:' #EAE0C8' }}
          >
            <Box 
            key={meal.idMeal} 
            sx={{ border: "1px solid #ddd", borderRadius: "8px", padding: "10px", textAlign: "center", boxShadow:'5px 5px 5px #888888'}}
            >
              <img src={meal.strMealThumb} alt={meal.strMeal} style={{ width: "100%", borderRadius: "8px" }} />
              <Typography variant="h6" component="h2">
                {meal.strMeal}
              </Typography>
            </Box>
          </ListItem>
        ))}
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <button onClick={() => setPage(page => Math.max(page - 1, 1))} disabled={page === 1}>
          Previous
        </button>
        <button onClick={() => setPage(page => page + 1)} disabled={allMeals.length < pageSize}>
          Next
        </button>
      </Box>
    </Box>
  )
}

export default MealsFromCategoryCard
