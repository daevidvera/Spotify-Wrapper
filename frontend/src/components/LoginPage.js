import React from 'react';
import { Button } from '@radix-ui/themes';

function LoginPage() {
  return (
    <div>
      <div className="container-login">
        <img src={`${process.env.PUBLIC_URL}/logo spotify wrapper.png`} alt="Logo" className="logo" />
        <div className='spotify-button'>
          <Button radius="full" variant="soft">
            Log in with your Spotify account
          </Button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;