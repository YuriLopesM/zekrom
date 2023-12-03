import { ReactNode, createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../hooks";

interface AuthContextData {
  user: User | null;
  isAuthenticated: boolean;
  handleLogin: (data: User) => void;
  handleLogout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

interface User {
  code: string;
  password: string;
}

export const AuthContext = createContext({} as AuthContextData);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useLocalStorage<User | null>("user:zekron", null);
  const isAuthenticated = !!user;

  const navigate = useNavigate();

  const handleLogin = async (data: User) => {
    if (data.code === "" || data.password === "") {
      alert('Preencha todos os campos!')
      return
    }
    setUser(data);
    navigate("/dashboard");
  };

  const handleLogout = () => {
    setUser(null);
    navigate("/login", { replace: true });
  };

  return <AuthContext.Provider value={{ user, isAuthenticated, handleLogin, handleLogout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
};