import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

import { Dashboard, Login } from "../pages";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />,
    },
    {
        path: "/dashboard",
        element: <Dashboard />,
    },
]);

const Routes = () => {
    return <RouterProvider router={router} />
}

export default Routes;