import { Navigate } from "react-router";
import { useAuth } from "./Auth"

export const RequireAuth = ({children}) =>{
    const auth = useAuth();

    if(!auth.user){
        return <Navigate to='/login' />
    }
    return children;
}