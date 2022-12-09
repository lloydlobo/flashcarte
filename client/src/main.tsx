import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

/**
 * If you are getting this error on React 18
 * Unable to find draggable with id:
 * Try removing StrictMode
 * @see https://stackoverflow.com/a/72355197
 */
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />,
  </React.StrictMode>,
);
