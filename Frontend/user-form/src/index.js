import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css'; // Correct import for Bootstrap CSS
import 'bootstrap/dist/js/bootstrap.bundle'; // Correct import for Bootstrap JS
import '@fortawesome/fontawesome-free/css/all.css'; // Import Font Awesome CSS

import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
