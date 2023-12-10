import { ReactNode, createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../hooks";

// import { api } from "../services/api";

interface AuthContextData {
  user: User | null;
  isAuthenticated: boolean;
  handleLogin: (data: UserCredentials) => void;
  handleLogout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

interface UserCredentials {
  code: string;
  password: string;
}

interface User {
  name: string;
  code: string;
  token: string;
  role: 'admin' | 'user';
}

export const AuthContext = createContext({} as AuthContextData);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useLocalStorage<User | null>("user:zekron", null);
  const isAuthenticated = !!user;

  const navigate = useNavigate();

  const handleLogin = async (data: UserCredentials) => {
    if (data.code === "" || data.password === "") {
      alert('Preencha todos os campos!')
      return
    }

    try {
      // const { data: userData } = await api.post<UserCredentials, { data: User }>("/login", data);
      const userData: User = {
        name: 'Yuri Lopes Machado',
        code: data.code,
        token: 'fake-token',
        role: 'admin'
      }
      setUser(userData);
      navigate("/dashboard");
    } catch (error) {
      alert('Credenciais inválidas!')
    }
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