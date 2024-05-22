import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx"; // Import the main App component
import "./index.css";// Import global CSS styles
import { BrowserRouter } from "react-router-dom"; // Import BrowserRouter for routing
import { Provider } from 'react-redux'; // Import Provider to connect the Redux store to the React application
import store from "./store/store.js"; // Import the configured Redux store

ReactDOM.createRoot(document.getElementById("root")).render(
     // Wrap the App component with Provider to make the Redux store available to the entire app
    <Provider store={store}>
         {/* Wrap the App component with BrowserRouter to enable client-side routing */}
        <BrowserRouter>
         {/* Render the main App component */}
            <App />
        </BrowserRouter>
    </Provider>
);
