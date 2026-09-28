import { useContext } from "react";
import { Navigate } from "react-router-dom";
import {AuthContext} from "./context/AuthContext"

function RouteProteger({children}){
    const {utilisateur, chargement} = useContext(AuthContext)

    if(chargement){
        return <p>Chargement...</p>
    }

    if(!utilisateur){
        return <Navigate to="/connexion" replace/>
    }
    return children
}
export default RouteProteger