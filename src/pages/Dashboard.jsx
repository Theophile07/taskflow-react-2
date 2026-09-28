import { FolderKanban, CheckSquare, CircleCheck, Clock, AlertCircle, Plus } from "lucide-react"
import { Link } from "react-router-dom"

import CarteStat from "../components/CarteStat"
import GraphStat from "../components/GraphStat"
import AvancerProjet from "../components/AvancerProjet"
import TacheRecente from "../components/TacheRecente"
function Dashboard (){
        const tachesRecentes = [
    {
        id: 1,
        titre: "Intégrer le formulaire",
        projet: "Site vitrine Nguvu",
        priorite: "Haute",
        echeance: "12 sept",
        statut: "En cours",
    },
    {
        id: 2,
        titre: "Créer le Dashboard",
        projet: "TaskFlow",
        priorite: "Haute",
        echeance: "15 sept",
        statut: "À faire",
    },
    {
        id: 3,
        titre: "Configurer OBS",
        projet: "AV Connect",
        priorite: "Moyenne",
        echeance: "18 sept",
        statut: "Terminée",
    },
    {
        id: 4,
        titre: "Tester le responsive",
        projet: "TaskFlow",
        priorite: "Basse",
        echeance: "20 sept",
        statut: "En cours",
    },
    {
        id: 5,
        titre: "Optimiser les images",
        projet: "Site vitrine Nguvu",
        priorite: "Moyenne",
        echeance: "22 sept",
        statut: "À faire",
    },
    ];


    return(
        <>
        <div className="mx-auto h-full max-w-7xl space-y-6 px-1 overflow-y-auto pb-2">
            <div className="flex flex-wrap items-center justify-between gap-6 rounded-2xl bg-gradient-to-br from-indigo-600 via-indigo-600 to-violet-600 p-7 shadow-lg shadow-indigo-500/20">
                <div>
                    <h2 className="text-2xl font-semibold tracking-tight text-white">Bonjour Theo</h2>
                    <p className="mt-1 text-sm text-indigo-100">Tu as 4 Projets et 14 taches</p>
                </div>
                <button className="inline-flex h-fit items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-indigo-700 shadow-sm transition duration-200 hover:bg-indigo-50 active:scale-95">
                    <Plus size={16}/>
                    Nouveau projet
                </button>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <CarteStat icon={FolderKanban} label={"Projets"} valeur={20}/>
                <CarteStat icon={FolderKanban} label={"Total tâches"} valeur={20}/>
                <CarteStat icon={FolderKanban} label={"Projets"} valeur={20}/>
                <CarteStat icon={FolderKanban} label={"Projets"} valeur={20}/>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <GraphStat/>
                <AvancerProjet/>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-900/5">
                <div className="mb-5 flex items-center justify-between">
                    <h2 className="text-sm font-medium uppercase tracking-wider text-slate-500">
                        Tâches récentes
                    </h2>
                    <Link to="/taches" className="rounded-lg px-2.5 py-1.5 text-sm font-medium text-indigo-600 transition-colors hover:bg-indigo-50">
                        Voir tout
                    </Link>
                </div>
                <div className="overflow-x-auto">
                <table className="w-full min-w-[640px] border-collapse">
                    <thead>
                        <tr className="border-b border-slate-100 text-left text-xs font-medium uppercase tracking-wider text-slate-400">
                            <th className="pb-3 pr-6">Tâches</th>
                            <th className="pb-3 pr-6">Projet</th>
                            <th className="pb-3 pr-6">Priorité</th>
                            <th className="pb-3 pr-6">Echéance</th>
                            <th className="pb-3">Statut</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-50">
                        {tachesRecentes.map((tache) => (
                            <TacheRecente
                            key={tache.id}
                            titre={tache.titre}
                            projet={tache.projet}
                            priorite={tache.priorite}
                            echeance={tache.echeance}
                            statut={tache.statut}
                            />
                        ))}
                    </tbody>
                </table>
                </div>
            </div>
        </div>
        </>
    )
}
export default Dashboard
