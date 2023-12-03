import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { Layout } from "../../Layout";


export const ProtectedLayout = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <Layout>
      <Outlet />
    </Layout>
  )
};