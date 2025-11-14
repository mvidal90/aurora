
export interface User {
    username: string,
    email: string,
}

export interface AuthContextType {
    user: User | undefined;
    login: (data: { username: string, password: string }) => Promise<void>;
    logout: () => void;
    loading: boolean;
}