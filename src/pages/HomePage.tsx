
import { Typography } from "@mui/material"
import CustomPageContainer from "../components/CustomPageContainer"
import LoginForm from "../components/LoginFormComponent"
import { Link } from "react-router-dom"
import homeImg from "../assets/mealsApp.jpg"

// schermata home con login

function HomePage() {
    return (
        <>
            <CustomPageContainer>
                <Typography variant="h5" component="h1" sx={{marginTop: '30px'}}>
                    <p>Benvenuto su Meals App</p>
                    <Link to="/meals">
                    <img src={homeImg} alt="Meals" style={{width: '50%', borderRadius: '8px', boxShadow: '0 0 10px rgba(0,0,0,0.2)'}}/>
                    <p>Clicca sulla foto Per accedere come utente</p>                    
                    </Link>
                    <p>o Accedi come amministratore: admin pw admin</p>
                </Typography>
                <LoginForm/>
            </CustomPageContainer>
        </>
    )
}

export default HomePage
