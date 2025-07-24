import { createContext, useState, useEffect, ReactNode } from "react";
import { useLocation } from "wouter";
import { apiRequest } from "@/lib/queryClient";

type User = {
  id: number;
  username: string;
  name: string;
  role: string;
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  error: string | null;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  login: async () => {},
  logout: () => {},
  error: null,
});

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [_, setLocation] = useLocation();

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem("authToken");
    const storedUser = localStorage.getItem("user");
    
    if (token && storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (err) {
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
      }
    }
    
    setIsLoading(false);
  }, []);

  const login = async (username: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await apiRequest("POST", "/api/auth/login", { username, password });
      const data = await response.json();
      
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      
      setUser(data.user);
      setLocation("/dashboard");
    } catch (err) {
      setError("Invalid username or password");
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    setUser(null);
    setLocation("/login");
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, error }}>
      {children}
    </AuthContext.Provider>
  );
}
