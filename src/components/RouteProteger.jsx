import { useContext } from "react";
import { Navigate } from "react-router-dom";
import {AuthContext} from "./context/AuthContext"

function RouteProteger({children}){
    const {utilisateur, chargement} = useContext(AuthContext)

    if(chargement){
        return (
            <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-slate-50">
                <span className="h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-indigo-600"/>
                <p className="text-sm font-medium text-slate-500">Chargement...</p>
            </div>
        )
    }

    if(!utilisateur){
        return <Navigate to="/connexion" replace/>
    }
    return children
}
export default RouteProteger