import { useEffect, useState } from "react"
import { recupererProjet } from "../api/projets"
import { useAsyncError } from "react-router-dom"
import { ChevronDown } from "lucide-react"

function FormulaireTaches (){
    const [formulaire, setFormulaire] = useState({
        titre:"",
        description:"",
        projetId:"",
        priorite:"moyenne",
        statut:"a_faire",
        echeance:"",
    })
    const [projets, setProjets] = useState([])

    useEffect(() => {
        recupererProjet().then((donnee) => setProjets(donnee))
    }, [])
    return(
        <form className="space-y-5">
        <div>
            <label htmlFor="titre" className="mb-1.5 block text-sm font-medium text-slate-700">
                Titre
            </label>

            <input id="titre" 
            type="text" 
            value={formulaire.titre}
            onChange={(e) => setFormulaire({...formulaire, titre: e.target.value})}
            placeholder="Ex : Intégrer le formulaire de contact"
            className="w-full rounded-xl border-0 bg-slate-50 px-4 py-3 text-sm text-slate-700 ring-1 ring-inset ring-slate-200 outline-none transition placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-indigo-500"
            />
        </div>

        <div>
            <label htmlFor="description" className="mb-1.5 block text-sm font-medium text-slate-700">
                Description
            </label>
            <textarea id="description"
            value={formulaire.description}
            onChange={(e) => setFormulaire({...formulaire, description: e.target.value})}
            placeholder="Décrivez la tâche..."
            rows={4}
            className="w-full resize-none rounded-xl border-0 bg-slate-50 px-4 py-3 text-sm text-slate-700 ring-1 ring-inset ring-slate-200 outline-none transition placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-indigo-500"
            />
        </div>

        <div>
            <label htmlFor="projetId" className="mb-1.5 block text-sm font-medium text-slate-700">
                Projet
            </label>
            <div className="relative">
                <select id="projetId"
                className="w-full appearance-none rounded-xl border-0 bg-slate-50 py-3 pl-4 pr-10 text-sm text-slate-700 ring-1 ring-inset ring-slate-200 outline-none transition focus:bg-white focus:ring-2 focus:ring-indigo-500"
                >
                    <option value="">Aucun projet sélectionné</option>
                    {projets.map((projet) => (
                        <option key={projet.id} value={projet.id}>
                            {projet.nom}
                        </option>
                    ) )}
                </select>
                <ChevronDown size={15} className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400"/>
            </div>
        </div>

        <div>
            <label htmlFor="priorite" className="mb-1.5 block text-sm font-medium text-slate-700">
                Priorité
            </label>
            <div className="relative">
                <select id="priorite"
                value={formulaire.priorite}
                onChange={(e) => setFormulaire({...formulaire, priorite: e.target.value})}
                className="w-full appearance-none rounded-xl border-0 bg-slate-50 py-3 pl-4 pr-10 text-sm text-slate-700 ring-1 ring-inset ring-slate-200 outline-none transition focus:bg-white focus:ring-2 focus:ring-indigo-500"
                >
                    <option value="haute">Haute</option>
                    <option value="moyenne">Moyenne</option>
                    <option value="basse">Basse</option>
                </select>
                <ChevronDown size={15} className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400"/>
            </div>
        </div>

        <div>
            <label htmlFor="statut" className="mb-1.5 block text-sm font-medium text-slate-700">
                Statut
            </label>
            <div className="relative">
                <select id="statut"
                value={formulaire.statut}
                onChange={(e) => setFormulaire({...formulaire, statut: e.target.value})}
                className="w-full appearance-none rounded-xl border-0 bg-slate-50 py-3 pl-4 pr-10 text-sm text-slate-700 ring-1 ring-inset ring-slate-200 outline-none transition focus:bg-white focus:ring-2 focus:ring-indigo-500"
                >
                    <option value="a_faire">À faire</option>
                    <option value="en_cours">En cours</option>
                    <option value="terminee">Terminée</option>
                </select>
                <ChevronDown size={15} className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400"/>
            </div>
        </div>
        <div>
            <label
                htmlFor="echeance"
                className="mb-1.5 block text-sm font-medium text-slate-700"
            >
                Échéance
            </label>

            <input
                id="echeance"
                type="date"
                value={formulaire.echeance}
                onChange={(e) => setFormulaire({...formulaire, echeance: e.target.value})}
                className="w-full rounded-xl border-0 bg-slate-50 px-4 py-3 text-sm text-slate-700 ring-1 ring-inset ring-slate-200 outline-none transition focus:bg-white focus:ring-2 focus:ring-indigo-500"
            />
        </div>

        <div className="flex justify-end gap-3 pt-2">

            <button type="button" className="rounded-xl px-4 py-2.5 text-sm font-medium text-slate-600 ring-1 ring-inset ring-slate-200 transition hover:bg-slate-50 hover:text-slate-900">
                Annuler
            </button>

            <button type="submit" className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition duration-200 hover:from-indigo-500 hover:to-violet-500 active:scale-[0.98]">
                Créer la tâche
            </button>
        </div>
        </form>
    )
}
export default FormulaireTaches