import { Outlet } from "react-router-dom";
import { Layout } from "../../Layout";

export const ProtectedLayout = () => {
  return (
    <Layout>
      <Outlet />
    </Layout>
  )
};