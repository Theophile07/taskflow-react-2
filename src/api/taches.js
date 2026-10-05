export async function recupererTaches() {
    try {
        const resulTache = await fetch("http://localhost:3000/taches");

        if (!resulTache.ok) {
            throw new Error("Impossible de récupérer les tâches");
        }

        const taches = await resulTache.json();
        return taches;

    } catch (error) {
        console.error("Erreur :", error);
        throw error;
    }
}

export async function creerTache(tache) {
    const reponse = await fetch("http://localhost:3000/taches", 
        
        {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(tache)
    })

    if (!reponse.ok) {
        throw new Error("Erreur lors de la création de la tâche")
    }

    return reponse.json()
}

export async function modifierTache(id, modifications) {
    const reponse = await fetch(`http://localhost:3000/taches/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(modifications)
    })

    if (!reponse.ok) {
        throw new Error("Erreur lors de la modification de la tâche")
    }

    return reponse.json()
}

export async function supprimerTache(id) {
    const reponse = await fetch(`${URL}/${id}`, {
        method: "DELETE"
    })

    if (!reponse.ok) {
        throw new Error("Erreur lors de la suppression de la tâche")
    }

    return true
}