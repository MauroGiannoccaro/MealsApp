import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import LoggingFormCard from "./LoggingFormCard";
import { validateForm } from "../utils/validateFormUtils";

type FormData = {
    username: string;
    password: string;
};

const LoginForm: React.FC = () => {
    const navigate = useNavigate();
    const [loggingFailed, setLoggingFailed] = useState<string>("");
    const [formErrors, setFormErrors] = useState<{ username?: string; password?: string }>({});

    const context = useContext(AuthContext);
    if (!context) {
        return null;
    }

    const { state, setLogin, dispatch, authorizedUser } = context;

    console.log('loggato?', state.isLoggedin);
    const onSubmit = (data: FormData) => {
        const errors = validateForm(data);
        if (Object.keys(errors).length > 0) {
          setFormErrors(errors);
          return;
        }
        const isLoggedin = data && data.username === authorizedUser.username && authorizedUser.password === data.password;
        setLogin(prevState => ({
            ...prevState,
            username: data.username,
            password: data.password,
        }));
        if (isLoggedin) {
            dispatch({ type: 'LOGIN' });
            navigate('/meals');
        } else {
            console.log("username or password is wrong");
            setLoggingFailed("Username or password is wrong");
        }
    };

    return (
      <LoggingFormCard state={state} onSubmit={onSubmit} loggingFailed={loggingFailed} formErrors={formErrors} />
    );
};

export default LoginForm;
