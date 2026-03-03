import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter } from 'react-router-dom';
import  socket  from "./socket/index.socket.jsx";
import { GoogleOAuthProvider } from '@react-oauth/google';


socket.connect();


createRoot(document.getElementById('root')).render(
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
    {/* <GoogleOAuthProvider clientId="763879280271-nvuif23lgm05jhdpetnnoa4m0rvih453.apps.googleusercontent.com"> */}
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </GoogleOAuthProvider>

)
