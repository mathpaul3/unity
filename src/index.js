import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';



import Header from './components/header';
import Route from './components/route';

import './components/css/header.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <BrowserRouter>
      <Header />

        <Route />

    </BrowserRouter>

);



reportWebVitals();
