import {
    createBrowserRouter,
    createRoutesFromElements,
    Navigate,
    Route,
    RouterProvider
} from "react-router-dom";

import { Dashboard, Login } from "../pages";
import { 
    AuthLayout,
    OpenLayout,
    ProtectedLayout,
    ProtectedRoute
} from "../components/Auth";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route element={<AuthLayout />}>
            <Route element={<OpenLayout />}>
                <Route path="*" element={<Navigate to="/login" replace />} />
                <Route
                    path="/login"
                    element={<Login />}
                />
            </Route>
            <Route path='/' element={<ProtectedLayout />}>
                <Route element={<ProtectedRoute roles={['admin', 'user']} />}>
                    <Route
                        path="/dashboard"
                        element={<Dashboard />}
                    />
                </Route>
                <Route element={<ProtectedRoute roles={['admin']} />}>
                    <Route
                        path="/hello"
                        element={<h1>somente admins cria</h1>}
                    />
                </Route>
            </Route>
        </Route>
    )
);

const Routes = () => {
    return <RouterProvider router={router} />
}

export default Routes;