import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import ApolloProvider from "./ApolloServer";

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error('Failed to find the root element');
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
      <ApolloProvider>
          <BrowserRouter>
              <App />
          </BrowserRouter>
      </ApolloProvider>
  </React.StrictMode>
);
