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
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    borderRadius: '10px', 
                    '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#65558F', // Outline border color
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#486284', // Border color on hover
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#486284', // Border color when focused
                    },
                },
                input: {
                    color: '#65558F', // Text color
                },
            },
        },
    MuiInputLabel: {
        styleOverrides: {
            root: {
                color: '#65558F', // Label color
                '&.Mui-focused': {
                    color: '#486284', // Label color when focused
                },
            },
        },
    },



    },
});

export default theme;