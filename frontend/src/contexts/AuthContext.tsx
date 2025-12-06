"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';
import { loginUser, registerUser } from '@/services/auth.service';
import type { User } from '@/types';

interface AuthContextType {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (name: string, email: string, password: string) => Promise<void>;
    logout: () => void;
    updateUser: (user: User) => void;
}

interface DecodedToken {
    id: string;
    exp: number;
}

// Create Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider Component
export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    // Initialize auth state from localStorage
    useEffect(() => {
        const initAuth = () => {
            try {
                const storedToken = localStorage.getItem('token');
                const storedUser = localStorage.getItem('user');

                if (storedToken && storedUser) {
                    // Check if token is expired
                    const decoded = jwtDecode<DecodedToken>(storedToken);
                    const currentTime = Date.now() / 1000;

                    if (decoded.exp > currentTime) {
                        setToken(storedToken);
                        setUser(JSON.parse(storedUser));
                    } else {
                        // Token expired, clear storage
                        localStorage.removeItem('token');
                        localStorage.removeItem('user');
                    }
                }
            } catch (error) {
                console.error('Error initializing auth:', error);
                localStorage.removeItem('token');
                localStorage.removeItem('user');
            } finally {
                setIsLoading(false);
            }
        };

        initAuth();
    }, []);

    // Login function
    const login = async (email: string, password: string) => {
        try {
            const response = await loginUser({ email, password });
            const { token: newToken, user: newUser } = response;

            // Save to state
            setToken(newToken);
            setUser(newUser);

            // Save to localStorage
            localStorage.setItem('token', newToken);
            localStorage.setItem('user', JSON.stringify(newUser));

            // Redirect to dashboard
            router.push('/dashboard');
        } catch (error: any) {
            console.error('Login error:', error);
            throw new Error(error.response?.data?.error?.message || 'Login failed');
        }
    };

    // Register function
    const register = async (name: string, email: string, password: string) => {
        try {
            const response = await registerUser({ name, email, password });
            const { token: newToken, user: newUser } = response.data.data;

            // Save to state
            setToken(newToken);
            setUser(newUser);

            // Save to localStorage
            localStorage.setItem('token', newToken);
            localStorage.setItem('user', JSON.stringify(newUser));

            // Redirect to dashboard
            router.push('/dashboard');
        } catch (error: any) {
            console.error('Register error:', error);
            throw new Error(error.response?.data?.error?.message || 'Registration failed');
        }
    };

    // Logout function
    const logout = () => {
        // Clear state
        setToken(null);
        setUser(null);

        // Clear localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        // Redirect to login
        router.push('/login');
    };

    // Update user function
    const updateUser = (updatedUser: User) => {
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
    };

    const value: AuthContextType = {
        user,
        token,
        isAuthenticated: !!token && !!user,
        isLoading,
        login,
        register,
        logout,
        updateUser,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom hook to use auth context
export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
