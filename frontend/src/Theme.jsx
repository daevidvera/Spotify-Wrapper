import { createTheme } from '@mui/material/styles'

// Define the theme to be used throughout the website
// Refer to MUI doc --> https://mui.com/material-ui/customization/theming/

const theme = createTheme({
    components: {
        MuiCssBaseline: { // this is the global css variable
            styleOverrides: { //overriding styles
                ":root" :{
                  background: '#FFFF'
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
    MuiButton: {
        styleOverrides: {
            root: {
                fontFamily: '"League Spartan", sans-serif',  // font-family
                fontWeight: 900
            },
        },

    },
    
});

export default theme;