import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ApolloClient, InMemoryCache, HttpLink} from '@apollo/client'
import { ApolloProvider } from '@apollo/client/react'
import { AuthProvider } from "./context/AuthContext";

// create http link
const link = new HttpLink({
  uri: "http://localhost:4000/graphql", // GraphQL server URL
});

const client = new ApolloClient({
  link: link, // GraphQL endpoint
  cache: new InMemoryCache(),
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
    <ApolloProvider client={client}>
    <App />
    </ApolloProvider>
    </AuthProvider>
  </StrictMode>,
)
