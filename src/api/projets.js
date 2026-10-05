export async function recupererProjet() {
    try {
        const resulProjet = await fetch("http://localhost:3000/projets");

        if (!resulProjet.ok) {
            throw new Error("Impossible de récupérer les projets");
        }

        const projets = await resulProjet.json();

        return projets;

    } catch (error) {
        console.error("Erreur :", error);
        throw error;
    }
}

export async function recupererProjetParId(id) {
    const resulProjet = await fetch(`http://localhost:3000/projets/${id}`)
    if(!resulProjet.ok){
        throw new Error("Projet introuvable")
    }
    return resulProjet.json()
}

export async function creerProjet(projet) {
    const reponse = await fetch("http://localhost:3000/projets",
        {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(projet)
        }
    )
    if(!reponse.ok){
        throw new Error("Erreur lors de la créationn du projet")
    }
    return reponse.json()
}

export async function modifierProjet(id, modification) {
    const reponse = await fetch(`http://localhost:3000/projets/${id}`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(modification)
        }
    )
    if(!reponse.ok){
        throw new Error("Erreur lors de la modification du projet")
    }
    return reponse.json()
}

export async function supprimerProjet(id) {
    const reponse = await fetch(`http://localhost:3000/projets/${id}`,
        {
            method: "DELETE"
        }
    )
    if(!reponse.ok){
        throw new Error("Erreur lors de la suppression du projet")
    }
    return true
}