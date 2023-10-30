import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

import { Dashboard, Login } from "../pages";
import { Layout } from "../components/Layout";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />,
    },
    {
        element: <Layout />,
        children: [
            {
                path: "/dashboard",
                element: <Dashboard />,
            },
        ],
    }
]);

const Routes = () => {
    return <RouterProvider router={router} />
}

export default Routes;