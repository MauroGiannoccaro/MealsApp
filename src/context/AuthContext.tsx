import { createContext, useReducer, useState } from "react"

type AuthState = {
    isLoggedin: boolean,
}

type AuthStateLogin = {
    username: string,
    password: string,
}

type AuthAction = 
    | { type: 'LOGIN' }
    | { type: 'LOGOUT' };


const initialState: AuthState = {
    isLoggedin: false,
};

export const AuthContext = createContext<{
    state: AuthState;
    dispatch: React.Dispatch<AuthAction>;
    login: AuthStateLogin;
    setLogin: React.Dispatch<React.SetStateAction<AuthStateLogin>>;
    authorizedUser: {username: string, password: string};
} | undefined>(undefined);

function authReducer(state: AuthState, action: AuthAction): AuthState {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                isLoggedin: true,
            };
        case 'LOGOUT':
            return {
                ...state,
                isLoggedin: false,
            };
        default:
            return state;
    }
}

const initialStateLogin: AuthStateLogin = {
    username: '',
    password: '',
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);
    const [login, setLogin] = useState<AuthStateLogin>(initialStateLogin);
    const authorizedUser = { username: 'admin', password: 'admin' };

    return (
        <AuthContext.Provider value={{ state, dispatch, login, setLogin, authorizedUser }}>
            {children}
        </AuthContext.Provider>
    )

}

export default AuthContext


