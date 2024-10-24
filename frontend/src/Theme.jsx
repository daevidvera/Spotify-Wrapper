import { createTheme } from '@mui/material/styles'

// Define the theme to be used throughout the website
// Refer to MUI doc --> https://mui.com/material-ui/customization/theming/

const theme = createTheme({
    components: {
        MuiCssBaseline: { // this is the global css variable
            styleOverrides: { //overriding styles
                ":root" :{
                   "--light-gradient": "linear-gradient(180deg, #ffffff, #9CD8EE)",
                    "--dark-gradient": "linear-gradient(180deg, #101517, #226DBD)",
                },

                "#root": {
                    width: '100',
                    height: '100',
                  },
                     
                body: {
                    backgroundImage: "var(--light-gradient)", 
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover", 
                },               
            },
        },
    },
});

export default theme;