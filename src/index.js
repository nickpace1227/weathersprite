import React from 'react';
import ReactDOM from 'react-dom/client';
import "./index.css";
import Weatherspout from './components/Router';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Weatherspout />
  </React.StrictMode>
);
