import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { LoginPopup } from "../components";
import { useNavigate } from "react-router-dom";

function AuthLayout({ children, authentication }) {
    const navigate = useNavigate(); // Initialize the useNavigate hook
    const authStatus = useSelector((state) => state.auth.status); // Get the auth status from the Redux store

    useEffect(() => {
        if (!authentication && authStatus !== authentication) {
            return; // No action needed if authentication is not required
        }
    }, [authStatus, authentication, navigate]); // Dependencies for the useEffect hook

    // Render LoginPopup if authentication is required but user is not authenticated
    if (authentication && authStatus !== authentication) {
        return <LoginPopup />;
    }

    // Render the children components if authentication check passes
    return children;
}

// Export the AuthLayout component as the default export
export default AuthLayout;
