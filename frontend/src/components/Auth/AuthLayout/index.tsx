import { Outlet } from "react-router-dom";
import { AuthProvider } from "../../../context/AuthContext"
import { FakeDataProvider } from "../../../context/FakeDataContext";

export const AuthLayout = () => {
  return (
    <AuthProvider>
      <FakeDataProvider>
        <Outlet />
      </FakeDataProvider>
    </AuthProvider>
  );
};