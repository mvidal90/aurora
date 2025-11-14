import { createContext } from "react";
import type { AuthContextType } from "./type";

const AuthContext = createContext<AuthContextType>({
    user: undefined,
    login: async () => {},
    logout: () => {},
    loading: false,
});

export default AuthContext;