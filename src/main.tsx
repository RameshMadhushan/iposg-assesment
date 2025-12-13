import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider, } from 'react-redux';

import './index.css';

import { store } from './app/store';

// Roboto fonts
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import Root from './Root';


createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <Provider store={store}>
      <Root />
    </Provider>
  </StrictMode>
);
