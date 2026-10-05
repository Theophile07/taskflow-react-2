import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext()

export function AuthProvider({children}){
    const [utilisateur, setUtilisateur] = useState(null)
    const [chargement, setChargement] = useState(true)

    useEffect(() => {
        const saveUtilisateur = localStorage.getItem("utilisateur-taskflow")

        if(saveUtilisateur){
            setUtilisateur(JSON.parse(saveUtilisateur))
        }
        setChargement(false)
    }, [])

    const login = (utilisateurConnecte) => {
        setUtilisateur(utilisateurConnecte)
        localStorage.setItem("utilisateur-taskflow", JSON.stringify(utilisateurConnecte))
    }

    const logout = () => {
        setUtilisateur(null)
        localStorage.removeItem("utilisateur-taskflow")
    }
    return(
        <AuthContext.Provider value={{utilisateur, login, logout, chargement,}}>
            {children}
        </AuthContext.Provider>
    )
}
