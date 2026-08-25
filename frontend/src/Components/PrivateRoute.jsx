import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ publicPage = false,adminOnly=false,sellerOnly=false }) => {
    const { user } = useSelector((state) => state.auth);
    const isAdmin=user && user?.roles?.includes("ROLE_ADMIN")
    const isSeller=user && user?.roles?.includes("ROLE_SELLER")
    if (publicPage) {
        return user ? <Navigate to="/" replace /> : <Outlet />;
    }
    if(adminOnly){
        if(!isAdmin){
            return <Navigate to="/" />
        }

    }
    if(sellerOnly){
        if(!isSeller || isAdmin){
            return <Navigate to="/" />
        }
    }

    return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
