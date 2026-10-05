import { useParams, Link } from "react-router-dom"
import { recupererProjetParId } from "../api/projets"
import { useEffect, useState } from "react"
import { recupererTaches } from "../api/taches"
import { ArrowLeft, FolderKanban, CheckSquare, CircleCheck, Clock, TrendingUp } from "lucide-react"
import CarteStat from "../components/CarteStat"

const libellesStatuts = {
    "a_faire": "À faire",
    "en_cours": "En cours",
    "terminee": "Terminée",
}

const pastillesStatuts = {
    a_faire: "bg-slate-300",
    en_cours: "bg-indigo-400",
    terminee: "bg-emerald-500",
}

const couleursPriorites = {
    "haute": "bg-rose-50 text-rose-600 ring-rose-100",
    "Haute": "bg-rose-50 text-rose-600 ring-rose-100",
    "moyenne": "bg-amber-50 text-amber-600 ring-amber-100",
    "Moyenne": "bg-amber-50 text-amber-600 ring-amber-100",
    "basse": "bg-emerald-50 text-emerald-600 ring-emerald-100",
    "Basse": "bg-emerald-50 text-emerald-600 ring-emerald-100",
}

function DetailsProjets(){
    const { id } = useParams()
    
    const [projets, setProjets] = useState(null)
    const [taches, setTaches] = useState([])

    
    useEffect(() => {
        async function chargerDonnees() {
            try{
                const [donneeProjet, donneeTache] = await Promise.all([recupererProjetParId(id), recupererTaches()])
                setProjets(donneeProjet)
                setTaches(donneeTache)
            }catch (error){
                console.error(error)
            }
        }
        chargerDonnees()
    }, [id])
    if(!projets){
        return (
            <div className="mx-auto h-full max-w-7xl space-y-6 px-1">
                <div className="h-40 animate-pulse rounded-2xl bg-white ring-1 ring-slate-900/5"/>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    <div className="h-24 animate-pulse rounded-2xl bg-white ring-1 ring-slate-900/5"/>
                    <div className="h-24 animate-pulse rounded-2xl bg-white ring-1 ring-slate-900/5"/>
                    <div className="h-24 animate-pulse rounded-2xl bg-white ring-1 ring-slate-900/5"/>
                    <div className="h-24 animate-pulse rounded-2xl bg-white ring-1 ring-slate-900/5"/>
                </div>
                <div className="h-64 animate-pulse rounded-2xl bg-white ring-1 ring-slate-900/5"/>
            </div>
        )
    }
    const tachesProjet = taches.filter(
        (tache) => Number(tache.projetId) === Number(id)
    )
    const nbEnCours = tachesProjet.filter((tache) => tache.statut === "en_cours").length
    const nbTerminees = tachesProjet.filter((tache) => tache.statut === "terminee").length
    const progression = tachesProjet.length === 0 ? 0 : Math.round((nbTerminees / tachesProjet.length) * 100)

    return(
        <>
        <div className="mx-auto h-full max-w-7xl space-y-6 overflow-y-auto px-1 pb-2">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 via-indigo-600 to-violet-600 p-7 shadow-lg shadow-indigo-500/20">
                <div className="absolute -right-16 -top-20 h-56 w-56 rounded-full bg-white/10 blur-2xl"/>
                <div className="absolute -bottom-24 -left-10 h-64 w-64 rounded-full bg-violet-400/30 blur-3xl"/>
                <div className="relative flex flex-wrap items-start justify-between gap-6">
                    <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-white ring-1 ring-inset ring-white/20">
                            <FolderKanban size={22}/>
                        </div>
                        <div>
                            <h1 className="text-2xl font-semibold tracking-tight text-white">{projets.nom}</h1>
                            <p className="mt-1 max-w-xl text-sm text-indigo-100">{projets.description}</p>
                        </div>
                    </div>
                    <Link to="/projets" className="inline-flex h-fit items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-indigo-700 shadow-sm transition duration-200 hover:bg-indigo-50 active:scale-95">
                        <ArrowLeft size={16}/>
                        Retour aux projets
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <CarteStat icon={CheckSquare} label={"Tâches"} valeur={tachesProjet.length} ton="violet"/>
                <CarteStat icon={Clock} label={"En cours"} valeur={nbEnCours} ton="amber"/>
                <CarteStat icon={CircleCheck} label={"Terminées"} valeur={nbTerminees} ton="emerald"/>
                <CarteStat icon={TrendingUp} label={"Progression"} valeur={`${progression}%`} ton="indigo"/>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-900/5">
                <div className="mb-5 flex items-center justify-between">
                    <h2 className="text-sm font-medium uppercase tracking-wider text-slate-500">Tâches du projet</h2>
                    <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold tabular-nums text-slate-600">{tachesProjet.length}</span>
                </div>

                {tachesProjet.length === 0 ? (
                    <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-slate-200 py-12">
                        <p className="text-sm font-medium text-slate-500">Aucune tâche pour ce projet</p>
                        <p className="text-xs text-slate-400">Ajoutez une tâche pour démarrer le suivi.</p>
                    </div>
                ) : (
                    <ul className="divide-y divide-slate-50">
                        {tachesProjet.map((tache) => (
                            <li key={tache.id} className="flex flex-wrap items-center justify-between gap-3 py-4 transition-colors hover:bg-slate-50/70">
                                <div className="min-w-0">
                                    <p className="truncate text-sm font-medium text-slate-800">{tache.titre}</p>
                                    <p className="mt-0.5 truncate text-xs text-slate-400">{tache.description}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${couleursPriorites[tache.priorite] ?? "bg-slate-50 text-slate-600 ring-slate-200"}`}>
                                        {tache.priorite ? tache.priorite.charAt(0).toUpperCase() + tache.priorite.slice(1) : tache.priorite}
                                    </span>
                                    <span className="whitespace-nowrap text-sm tabular-nums text-slate-500">{tache.echeance}</span>
                                    <span className="inline-flex items-center gap-2 whitespace-nowrap text-sm text-slate-600">
                                        <span className={`h-1.5 w-1.5 rounded-full ${pastillesStatuts[tache.statut] ?? "bg-slate-300"}`}></span>
                                        {libellesStatuts[tache.statut] ?? tache.statut}
                                    </span>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
        </>
    )
}
export default DetailsProjets