import React from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/scss/bootstrap.scss';
import 'normalize.css/normalize.css';
import '@fortawesome/fontawesome-free/css/fontawesome.css';
import '@fortawesome/fontawesome-free/css/regular.css';
import '@fortawesome/fontawesome-free/css/solid.css';
import '@fortawesome/fontawesome-free/css/brands.css';
import App from './App';

const root = createRoot(document.getElementById('root')!);

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
