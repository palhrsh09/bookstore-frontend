import React, { createContext, useContext, useState, useEffect } from 'react';
import { getUserDetails } from './api';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState<boolean |null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await getUserDetails();
                if (response.data.success) {
                    setUser(true);
                    console.log(1,"1")
                } else {
                    setUser(null);
                    // Optionally, you can still navigate to login here
                    // navigate('/login');
                }
            } catch (error) {
                console.error('Error fetching user:', error);
                setUser(null);
                setError('Error fetching user data');
                console.log(2,"2")
                // Optionally, you can still navigate to login here
                // navigate('/login');
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, loading, error }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);