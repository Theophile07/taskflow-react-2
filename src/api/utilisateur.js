export async function recupererUtilisateurParEmail(email) {
    const resultUtilisateur = await fetch(
        `http://localhost:3000/utilisateurs?email=${email}`
    )
    if(!resultUtilisateur.ok){
        throw new Error("Impossible de récupérer l'utilisateur")
    }
    const utilisateurs = await resultUtilisateur.json()

    return utilisateurs[0]
}

export async function creerUtilisateur(utilisateur) {
    const resultUtilisateur = await fetch("http://localhost:3000/utilisateurs", {
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify(utilisateur)
    })
    if(!resultUtilisateur.ok){
        throw new Error("Erreur lors de la creation de l'utilisateur")
    }
    return resultUtilisateur.json()
}