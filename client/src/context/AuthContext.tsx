import {  createContext, useContext, useEffect, useState, type ReactNode } from "react";


interface AuthContextType{
    token:string | null;
    login:(token: string)=>void;
    logout:()=>void;
    isAuthenticated:boolean; 
}

const AuthContext=createContext<AuthContextType | undefined>(undefined);

export const AuthProvider=({children}:{children:ReactNode})=>{
    const [token,setToken]=useState<string | null>(
        localStorage.getItem('token'));
    const login=(newToken:string)=>{
        setToken(newToken);
        localStorage.setItem('token',newToken);
    };
    const logout=()=>{
        setToken(null);
        localStorage.removeItem('token');
    };

    useEffect(()=>{
        const storedToken=localStorage.getItem('token');
        if(storedToken){
            setToken(storedToken);
        }
    },[]);

    return (
        <AuthContext.Provider value={{token,login,logout,isAuthenticated:!!token}}>
            {children}
        </AuthContext.Provider>
    );
    
};

export const useAuth=()=>{
    const context=useContext(AuthContext);
    if(context==undefined){
        throw new Error('useAuth must be used within an AuthProvider');

    }
    return context;
};