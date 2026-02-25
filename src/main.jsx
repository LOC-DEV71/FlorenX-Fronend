import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter } from 'react-router-dom';
import  socket  from "./socket/index.socket.jsx";

socket.connect();


createRoot(document.getElementById('root')).render(
      <BrowserRouter>
          <App />
    </BrowserRouter>
  
)
