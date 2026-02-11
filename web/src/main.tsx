import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// Switch between AppNeural (3D Neural Network) and App (Traditional)
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
