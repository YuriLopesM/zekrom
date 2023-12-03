import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

export const OpenLayout = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <>
      <Outlet />
    </>
  )
};