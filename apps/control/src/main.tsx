import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import App from './app/app';
import { AuthContextProvider } from './app/context/AuthContext';
import { ThemeProvider } from './app/context/AuthContext2';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <ThemeProvider>

    <AuthContextProvider>
    <App />
    </AuthContextProvider>
    </ThemeProvider>
  </StrictMode>
);
