import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated, isAdmin } from '../auth.js';

const ProtectedRoute = ({ component: Component, role, ...rest }) => {
    if (!isAuthenticated()) {
        return <Navigate to="/login" />;
    }

    if (role === 'admin' && !isAdmin()) {
        return <Navigate to="/login" />;
    }

    return <Component {...rest} />;
};

export default ProtectedRoute;
