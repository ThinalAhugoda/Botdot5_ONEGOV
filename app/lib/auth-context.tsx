import React, { createContext, useContext, useEffect, useState } from "react";
import { Models } from "react-native-appwrite";
import { account } from "./appwrite";

type AuthContextType = {
    user: Models.User<Models.Preferences> | null;
    signUp: (email: string, password: string) => Promise<string | null>;
    signIn: (email: string, password: string) => Promise<string | null>;
    signOut: () => Promise<void>;
    checkUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({children}: {children: React.ReactNode}) {
    const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Rate limiting helper
    const rateLimitDelay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    const checkUser = async () => {
        try {
            setIsLoading(true);
            const user = await account.get();
            setUser(user);
        } catch (error) {
            // User not logged in - this is expected
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    };

    const signUp = async (email: string, password: string) => {
        try {
            console.log('Attempting signup with:', { email });
            
            // Add small delay to prevent rate limiting
            await rateLimitDelay(1000);
            
            await account.create('unique()', email, password);
            await rateLimitDelay(1000);
            await signIn(email, password);
            return null;
        } catch (error) {
            console.error('Signup error:', error);
            if (error instanceof Error){
                return error.message;
            }
            return "An error occurred during sign up.";
        }
    };

    const signIn = async (email: string, password: string) => {
        try {
            console.log('Attempting login with:', { email });
            
            // Add small delay to prevent rate limiting
            await rateLimitDelay(1000);
            
            const session = await account.createEmailPasswordSession(email, password);
            await rateLimitDelay(500);
            const user = await account.get();
            setUser(user);
            return null;
        } catch (error) {
            console.error('Login error:', error);
            if (error instanceof Error){
                return error.message;
            }
            return "An error occurred during sign in.";
        }
    };

    const signOut = async () => {
        try {
            await account.deleteSession('current');
            setUser(null);
        } catch (error) {
            console.error('Signout error:', error);
        }
    };

    // Check user on mount only once
    useEffect(() => {
        let isMounted = true;
        
        if (isMounted) {
            checkUser();
        }
        
        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <AuthContext.Provider value={{user, signUp, signIn, signOut, checkUser}}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
