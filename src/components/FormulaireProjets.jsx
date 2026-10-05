import { useContext, useState, useEffect } from "react"
import { AuthContext } from "../context/AuthContext"
import { creerProjet, modifierProjet } from "../api/projets"

function FormulaireProjets({projet}){

    

    const { utilisateur } = useContext(AuthContext)
    const [formulaire, setFormulaire] = useState({
            nom:"",
            description:"",
            couleur:"#2563EB",
        })
    // Gerer le changement
    function gererChangement(e){
        const { name, value } = e.target
        setFormulaire((ancienFormulaire) => ({
            ...ancienFormulaire, [name]: value
        }))
    }
    // ------------SOUMISSION DU NOUVEAU PROJET---------------
    async function gererSoumission(e) {
        e.preventDefault()
        try{
            if(projet){
                const modification = {
                    nom: formulaire.nom,
                    description: formulaire.description,
                    couleur: formulaire.couleur
                }
                const projetModifie = await modifierProjet(projet.id, modification)

                console.log("Projet modifié :", projetModifie)
            }else{
                const nouveauProjet ={
                utilisateurId: utilisateur.id,
                nom: formulaire.nom,
                description: formulaire.description,
                couleur: formulaire.couleur,
                creeLe: new Date().toISOString()
                }
                const projetCree = await creerProjet(nouveauProjet)
                console.log("Projet créé :", projetCree)
            }
        }catch(error){
            console.error(error)
        }
    }
    // ---------- 
    useEffect(() => {
        if(projet){
            setFormulaire({
                nom: projet.nom,
                description: projet.description,
                couleur: projet.couleur
            })
        }
    }, [projet])
    return(
        <>
        <form onSubmit={gererSoumission} className="space-y-5">
            <div>
                <label htmlFor="nom" className="mb-1.5 block text-sm font-medium text-slate-700">
                    Nouveau projet
                </label>
                <input 
                id="nom"
                name="nom"
                type="text"
                value={formulaire.nom}
                onChange={gererChangement}
                placeholder="Nom du projet"
                className="w-full rounded-xl border-0 bg-slate-50 px-4 py-3 text-sm text-slate-700 ring-1 ring-inset ring-slate-200 outline-none transition placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-indigo-500"
                />
            </div>
            <div>
                <label htmlFor="description" className="mb-1.5 block text-sm font-medium text-slate-700">
                    Description
                </label>
                <textarea 
                id="description"
                name="description" 
                rows={4}
                value={formulaire.description}
                onChange={gererChangement}
                placeholder="Décrivez votre projet..."
                className="w-full resize-none rounded-xl border-0 bg-slate-50 px-4 py-3 text-sm text-slate-700 ring-1 ring-inset ring-slate-200 outline-none transition placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-indigo-500"
                />
            </div>

            <div>
                <label htmlFor="couleur" className="mb-1.5 block text-sm font-medium text-slate-700">
                    Couleur
                </label>
                <div className="flex items-center gap-3">
                    <input 
                    id="couleur"
                    type="color" 
                    name="couleur" 
                    value={formulaire.couleur}
                    onChange={gererChangement}
                    className="h-11 w-16 cursor-pointer rounded-xl border-0 bg-transparent p-1 ring-1 ring-inset ring-slate-200 transition hover:ring-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <span className="rounded-lg bg-slate-50 px-2.5 py-1 text-xs font-medium uppercase tabular-nums text-slate-500 ring-1 ring-inset ring-slate-200">{formulaire.couleur}</span>
                </div>
            </div>
            <div className="flex justify-end pt-2">
            <button type="submit" className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition duration-200 hover:from-indigo-500 hover:to-violet-500 active:scale-[0.98]">
                {projet ? "Modifier le projet" : "Créer le projet"}
            </button>
            </div>
        </form>
        </>
    )
}
export default FormulaireProjets