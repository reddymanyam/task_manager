import React from 'react'
import { useAuth } from "./AuthContext";
import { useNavigate } from 'react-router-dom';

const ProtectedRoutes = ({ children }) => {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
    return (
        isAuthenticated ? children : navigate('/')
    )
}

export default ProtectedRoutes