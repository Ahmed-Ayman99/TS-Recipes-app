import ReactDOM from 'react-dom/client';
import React from 'react';

import { Provider } from 'react-redux';

import './index.css';
import App from './App.tsx';
import store from './store.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
