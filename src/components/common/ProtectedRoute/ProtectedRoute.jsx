import { useSelector } from "react-redux"
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const isLogged = useSelector((store) => store.authSlice.isLogged);
    const location = useLocation();

    if (!isLogged) return <Navigate to={"/login"} state={{ from: location.pathname }}/>
    else return <>{children}</>;
}

export default ProtectedRoute;