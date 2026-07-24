import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ApolloProvider } from '@apollo/client/react'
import { AuthProvider } from "./context/AuthContext";
import client from "./apollo/client";


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ApolloProvider client={client}>
    <AuthProvider>
    <App />
    </AuthProvider>
    </ApolloProvider>
  </StrictMode>,
)
