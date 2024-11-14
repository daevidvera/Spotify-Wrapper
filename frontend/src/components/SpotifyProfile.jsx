import { Box, Container, Stack, ThemeProvider } from "@mui/material";
import theme from "../Theme";
import defaultPfp from '../assets/default_pfp.jpeg'

function SpotifyPreview({display_name, spotify_profile_url, profile_img = defaultPfp}) {

    const handleSpotifyRedirect = () => window.open(spotify_profile_url, '_blank')

    return display_name && spotify_profile_url && (
        <ThemeProvider theme={theme}>
            <Stack
                direction='row'
                spacing={2}
                sx = {{
                    height: '60px',
                    width: 'fit-content',
                    borderRadius: '30px',
                    paddingRight: '30px',
                    cursor: 'pointer',
                    // TODO: Ask Davi to tie these to theme
                    backgroundColor: '#486284',
                    color: 'white' // Text color
                }}
                onClick={handleSpotifyRedirect}
            >
                <img src={profile_img} style={{height: '100%', borderRadius: '50%'}}/>
                <Box>
                    <p> {display_name} </p>
                </Box>
            </Stack>
        </ThemeProvider>
    )

}

export default SpotifyPreview