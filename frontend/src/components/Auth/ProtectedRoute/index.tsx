import { 
    Outlet,
    Navigate,
    useLocation,
    useOutletContext 
} from 'react-router-dom';
import { useAuth } from "../../../context/AuthContext";


interface PrivateRouteProps {
    roles: string[];
}

type RolesContextType = { roles: string[] | null };

export const ProtectedRoute = ({ roles }: PrivateRouteProps) => {
    const { user, isAuthenticated } = useAuth();
    const location = useLocation();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (isAuthenticated && location.pathname === "/") {
        return <Navigate to="/dashboard" replace />;
    }

    // Rota restrita por papel
    if (user && roles && roles.indexOf(user.role) === -1) {
        return <Navigate to="/dashboard" />
    }

    return (
        <Outlet context={{ roles } satisfies RolesContextType}/>
    )
}

export function useRoles() {
    return useOutletContext<RolesContextType>();
}