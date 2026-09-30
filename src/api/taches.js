export async function recupererTaches() {
    try {
        const resulTache = await fetch("http://localhost:3000/taches");

        if (!resulTache.ok) {
            throw new Error("Impossible de récupérer les tâches");
        }

        const taches = await resulTache.json();
        console.log(taches)
        return taches;

    } catch (error) {
        console.error("Erreur :", error);
        throw error;
    }
}