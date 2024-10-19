// src/components/ProtectedRoutes.js
import { Navigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();
     console.log(user,"user")

    if (loading) {
        return <div>Loading...</div>; // Show loading state if fetching user
    }

    if (!user) {
        return <Navigate to="/login" />; // Redirect to login if not authenticated
    }

    return children; // Render children if authenticated
};

export default ProtectedRoute;
