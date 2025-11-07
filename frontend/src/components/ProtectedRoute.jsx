import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function ProtectedRoute({ children }) {
    const token = Cookies.get("access_token");

    if (!token) {
        return <Navigate to="/signin" replace />;
    }

    return children;
}
