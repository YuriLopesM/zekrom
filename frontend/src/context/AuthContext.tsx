import { ReactNode, createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../hooks";

import { UserData } from "../types";

// import { api } from "../services/api";

interface AuthContextData {
  user: UserMock | null;
  isAuthenticated: boolean;
  userList: UserMock[];
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
  role: 'admin' | 'user';
}

type UserMock = User & UserData & { password: string }

export const AuthContext = createContext({} as AuthContextData);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useLocalStorage<UserMock | null>("user:zekron", null);
  const isAuthenticated = !!user;

  const navigate = useNavigate();

  const handleLogin = async (data: UserCredentials) => {
    if (data.code === "" || data.password === "") {
      alert('Preencha todos os campos!')
      return
    }

    try {
      // const { data: userData } = await api.post<UserCredentials, { data: User }>("/login", data);
      const userData = userList.find(user => user.code === data.code && user.password === data.password);
      
      if (!userData) {
        alert('Credenciais inválidas!')
        return
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

  const userList: UserMock[] = [
    {
      id: '09d1d186-ce25-4203-9464-5148b49a95bd',
      name: 'Yuri Lopes Machado',
      code: '111.111.111-11',
      role: 'admin',
      password: '123456',
      registration: '000001',
      sector: 'Administração',
      schedule: '1 - 08h-12h/13h-17h',
      location: 'Matriz - Criciúma/SC',
      imgUrl: 'https://github.com/YuriLopesM.png'
    },
    {
      id: 'bd0bdca2-093f-4c14-a09f-393aa2452fe0',
      name: 'Vitor Minatto Barp',
      code: '222.222.222-22',
      role: 'user',
      password: '123456',
      sector: 'Produção',
      registration: '000002',
      schedule: '1 - 08h-12h/13h-17h',
      location: 'Matriz - Criciúma/SC',
      imgUrl: 'https://instagram.fccm2-1.fna.fbcdn.net/v/t39.30808-6/378532507_18300854554139279_4774370215172445023_n.jpg?stp=dst-jpg_e35_p1080x1080_sh0.08&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDQweDE4MDAuc2RyIn0&_nc_ht=instagram.fccm2-1.fna.fbcdn.net&_nc_cat=111&_nc_ohc=f1EQAcgWmO4AX-tKuhC&edm=ACWDqb8AAAAA&ccb=7-5&ig_cache_key=MzE5NDc5MjExNTcwMjIyODA0NQ%3D%3D.2-ccb7-5&oh=00_AfBGHTZzhgxAn_yo24GMG1g_88dtL9tBekSI7PreFOmRGw&oe=657AEC70&_nc_sid=ee9879'
    }
  ]

  return <AuthContext.Provider value={{ user, isAuthenticated, userList, handleLogin, handleLogout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};