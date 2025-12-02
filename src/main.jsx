import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { GameProvider } from './context/GameProvider.jsx';
import App from './App.jsx';

import './styles/variables.css';
import './styles/mobile.css';
import './styles/tablet.css';
import './styles/desktop.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GameProvider>
      <App />
    </GameProvider>
  </StrictMode>
);
