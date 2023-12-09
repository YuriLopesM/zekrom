import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { Layout } from "../../Layout";


export const ProtectedLayout = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (isAuthenticated && location.pathname === "/") {
    return <Navigate to="/dashboard" replace />;
  } 

  return (
    <Layout>
      <Outlet />
    </Layout>
  )
};