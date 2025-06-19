
import './App.css'
import { ThemeProvider } from '@emotion/react'
import theme from './defaultTheme/theme'
import { CssBaseline } from '@mui/material'
import Header from './partials/Header'
import HomePage from './pages/HomePage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Footer from './partials/Footer'
import MealsFromCategory from './pages/MealsForCategory'
import MealsDetailsPage from './pages/MealsDetailsPage'
import { AuthProvider } from './context/AuthContext'
import MealsCategories from './pages/MealsCategories'
import AddMealsPage from './pages/AddMealsPage'
import AboutUsPage from './pages/AboutUsPage'


<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap"
/>

function App() {

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
        <AuthProvider>
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/meals" element={<MealsCategories />} />
              <Route path="/meals/:category" element={<MealsFromCategory />} />
              <Route path="/meals/:category/:id" element={<MealsDetailsPage />} />
              <Route path="/addMeals" element={<AddMealsPage />} />
              <Route path="/about" element={<AboutUsPage />} />
            </Routes>
          </main>
          </AuthProvider>
        </BrowserRouter>
        <Footer />
      </ThemeProvider>
    </>
  )
}

export default App
