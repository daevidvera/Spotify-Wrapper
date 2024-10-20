import React from 'react';

const CLIENT_ID = "7e9e20008d354b2aaf9a3653d7b2b393"
const SPOTIFY_AUTH = 'https://accounts.spotify.com/authorize';
const REDIRECT_URI = 'http://localhost:3000/'

function LoginPage() {

  const handleLogin = () => {
    window.location = `${SPOTIFY_AUTH}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=token&show_dialog=true`

  }

  return (
    <article className='logoCard'>
       <h1 className="logoCard-logo"> @wrapper. </h1>
            <aside>
              <button className='logoCard-Button' onClick={handleLogin}>
              Spotify account
            </button>

            </aside>
    </article>
    
    
  );
}

export default LoginPage;