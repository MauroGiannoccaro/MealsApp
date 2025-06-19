import { ThemeProvider } from "@emotion/react"
import { Box, TextField, Button } from "@mui/material"
import { Controller, useForm } from "react-hook-form"
import theme from "../defaultTheme/theme"


interface FormData {
    username: string;
    password: string;
}

interface LoggingFormCardProps {
    state: {isLoggedin: boolean};
    onSubmit: (data: FormData) => void;
    loggingFailed: string;
    formErrors: {username?: string; password?: string};
}

const LoggingFormCard = ({ state, onSubmit, loggingFailed, formErrors }: LoggingFormCardProps) => {

    const { control, handleSubmit } = useForm<FormData>();

    return (
        <ThemeProvider theme={theme}>
            {state.isLoggedin ? <p>You are logged in</p> : <Box sx={{ padding: '10px', margin: 5, display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#FFFFE0', width: '40%', marginLeft: '30%', boxShadow: '0 0 10px rgba(0,0,0,0.2)' }}>
                <Controller
                    control={control}
                    name="username"
                    defaultValue=""
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Username"
                            placeholder="Username"
                            onBlur={onBlur}
                            onChange={onChange}
                            value={value}
                            sx={{ marginBottom: 5 }}
                            error={!!formErrors.username}
                            helperText={formErrors.username}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="password"
                    defaultValue=""
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Password"
                            placeholder="Password"
                            type="password"
                            onBlur={onBlur}
                            onChange={onChange}
                            value={value}
                            sx={{ marginBottom: 12 }}
                            error={!!formErrors.password}
                            helperText={formErrors.password}
                        />
                    )}
                />
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleSubmit(onSubmit)}
                    sx={{ marginTop: -10 }}
                >
                    Login
                </Button>
                {loggingFailed && <p>{loggingFailed}</p>}
            </Box>
            }
        </ThemeProvider>
    )
}

export default LoggingFormCard