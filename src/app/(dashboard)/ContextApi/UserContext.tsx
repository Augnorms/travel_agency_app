"use client";

import React, { createContext, useContext, useState } from "react";

export interface User {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    gender: string;
    nationality: string;
    residence: string;
    role: string;
    date_of_birth: string;
    created_at: string;
}

interface UserContextType {
    user: User | null;
    setUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextType>({
    user: null,
    setUser: () => {}
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
