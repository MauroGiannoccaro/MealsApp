import { Box } from '@mui/material'

function Footer() {
    return (
        <Box component="footer" sx={{ bgcolor: "secondary.main", color: "white", textAlign: "center", py: 2, mt: "auto" }}>
            <small>
                © {new Date().getFullYear()} | Meals App | All Rights Reserved.
            </small>
        </Box>
    )
}

export default Footer
