export async function recupererProjet() {
    try {
        const resulProjet = await fetch("http://localhost:3000/projets");

        if (!resulProjet.ok) {
            throw new Error("Impossible de récupérer les projets");
        }

        const projets = await resulProjet.json();
        console.log(projets)
        return projets;

    } catch (error) {
        console.error("Erreur :", error);
        throw error;
    }
}