import { createTheme, Theme } from "@mui/material";

export const customTheme: Theme = createTheme({
    palette: {
        background: {
            default: "#1C212C",
        },
    },
    components: {
        MuiInputLabel: {
            styleOverrides: {},
            defaultProps: {
                shrink: true, // Shrink the text label by default, prevent it overlapping with the value
            },
        },
    },
});
