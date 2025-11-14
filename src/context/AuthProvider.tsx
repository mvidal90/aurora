import { useEffect, useState, type ReactNode } from "react";
import AuthContext from "./AuthContext";

import { axiosInstance, login as loginApi } from "../api/api";

import type { User } from "./type";

function AuthProvider({ children }: { children: ReactNode }) {

    const [user, setUser] = useState<User | undefined>(undefined);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            setUser({ username: "test", email: "test@test.com" });
        }
    }, []);

    const login = async (data: { username: string, password: string }) => {
        setLoading(true);
        const resp = await loginApi(data);
        if (resp.error) {
            throw new Error(resp.error);
        }
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${resp.jwt}`;
        localStorage.setItem("token", resp.jwt);
        setUser(resp.user);
        setLoading(false);
    }

    const logout = () => {
        localStorage.removeItem("token");
        delete axiosInstance.defaults.headers.common['Authorization'];
        setUser(undefined);
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider