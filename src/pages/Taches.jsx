import { Plus, Search, SlidersHorizontal, ChevronDown, Check, Eye, Pencil, Trash2 } from "lucide-react"
import { useEffect, useRef, useState } from "react"

function Taches(){
        const optionsTri = [
    { value: "recentes", label: "Plus récentes" },
    { value: "anciennes", label: "Plus anciennes" },
    { value: "haute", label: "Priorité haute" },
    ];

    const [tri, setTri] = useState("recentes")
    const [triOuvert, setTriOuvert] = useState(false)
    const triRef = useRef(null)
    const [filtre, setFiltre] = useState("toutes")

    useEffect(() => {
        const fermer = (e) => {
            if (triRef.current && !triRef.current.contains(e.target)) {
                setTriOuvert(false)
            }
        }
        document.addEventListener("mousedown", fermer)
        return () => document.removeEventListener("mousedown", fermer)
    }, [])

    const taches = [
    {
        id: 1,
        titre: "Intégrer le formulaire de contact",
        projet: "Site vitrine Nguvu",
        description: "Créer et intégrer le formulaire de contact.",
        priorite: "Haute",
        echeance: "12 sept",
        statut: "En cours",
    },
    {
        id: 2,
        titre: "Créer le dashboard",
        projet: "TaskFlow",
        description: "Créer l'interface principale du tableau de bord.",
        priorite: "Haute",
        echeance: "15 sept",
        statut: "À faire",
    },
    {
        id: 3,
        titre: "Configurer OBS",
        projet: "AV Connect",
        description: "Préparer la configuration OBS pour le streaming.",
        priorite: "Moyenne",
        echeance: "18 sept",
        statut: "Terminée",
    },
    {
        id: 4,
        titre: "Tester le responsive",
        projet: "TaskFlow",
        description: "Tester l'application sur différentes tailles d'écran.",
        priorite: "Basse",
        echeance: "20 sept",
        statut: "En cours",
    },
    ];

    const couleursPriorites = {
        "Haute": "bg-rose-50 text-rose-600 ring-rose-100",
        "Moyenne": "bg-amber-50 text-amber-600 ring-amber-100",
        "Basse": "bg-emerald-50 text-emerald-600 ring-emerald-100",
    }

    const pastillesStatuts = {
        "À faire": "bg-slate-300",
        "En cours": "bg-amber-400",
        "Terminée": "bg-emerald-500",
    }
    const tachesFiltrees = filtre === "toutes" ? taches : taches.filter((tache) => tache.statut === filtre)
    return(
        <>
        <div className="mx-auto h-full max-w-7xl space-y-6 px-1 overflow-y-auto pb-2">
            <div className="flex flex-wrap items-center justify-between gap-6 rounded-2xl bg-gradient-to-br from-indigo-600 via-indigo-600 to-violet-600 p-7 shadow-lg shadow-indigo-500/20">
                <div>
                    <h2 className="text-2xl font-semibold tracking-tight text-white">Mes tâches</h2>
                    <p className="mt-1 text-sm text-indigo-100"> 14 Tâches - 6 terminées - 75%</p>
                </div>
                <button className="inline-flex h-fit items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-indigo-700 shadow-sm transition duration-200 hover:bg-indigo-50 active:scale-95">
                    <Plus size={16}/>
                    Nouvelle tâches
                </button>
            </div>


            <div className="flex flex-col gap-3 rounded-2xl bg-white p-3 shadow-sm ring-1 ring-slate-900/5 md:flex-row md:items-center">
                <div className="relative w-full md:flex-1">
                    <Search size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"/>
                    <input type="text"
                    placeholder="Rechercher un projet..."
                    className="w-full rounded-xl border border-transparent bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-700 ring-1 ring-inset ring-slate-200 transition placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div ref={triRef} className="relative w-full md:w-56">
                    <SlidersHorizontal size={16} className={`pointer-events-none absolute left-3.5 top-1/2 z-10 -translate-y-1/2 transition-colors ${triOuvert ? "text-indigo-500" : "text-slate-400"}`}/>
                    <button
                        type="button"
                        onClick={() => setTriOuvert((o) => !o)}
                        className={`flex w-full items-center justify-between gap-2 rounded-xl py-2.5 pl-10 pr-3.5 text-sm font-medium transition duration-200 ${triOuvert ? "bg-white text-slate-900 ring-2 ring-indigo-500" : "bg-slate-50 text-slate-600 ring-1 ring-inset ring-slate-200 hover:bg-white"}`}
                    >
                        {optionsTri.find((o) => o.value === tri).label}
                        <ChevronDown size={16} className={`shrink-0 transition-transform duration-200 ${triOuvert ? "rotate-180 text-indigo-500" : "text-slate-400"}`}/>
                    </button>

                    {triOuvert && (
                        <ul className="absolute left-0 right-0 z-20 mt-1.5 overflow-hidden rounded-xl bg-white p-1 shadow-lg shadow-slate-900/10 ring-1 ring-slate-900/5">
                            {optionsTri.map((option) => (
                                <li key={option.value}>
                                    <button
                                        type="button"
                                        onClick={() => { setTri(option.value); setTriOuvert(false) }}
                                        className={`flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2 text-left text-sm transition duration-150 ${tri === option.value ? "bg-indigo-50 font-medium text-indigo-600" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"}`}
                                    >
                                        {option.label}
                                        {tri === option.value && <Check size={14} className="shrink-0 text-indigo-500"/>}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>

            <div className="flex flex-wrap gap-2">
                {["toutes", "À faire", "En cours", "Terminée"].map((option) => (
                    <button
                        key={option}
                        onClick={() => setFiltre(option)}
                        className={`rounded-full px-4 py-2 text-sm font-medium transition duration-200 ${filtre === option ? "bg-indigo-600 text-white shadow-sm shadow-indigo-500/30" : "bg-white text-slate-500 ring-1 ring-inset ring-slate-200 hover:bg-slate-50 hover:text-slate-900"}`}
                    >
                        {option === "toutes" ? "Toutes" : option === "Terminée" ? "Terminées" : option}
                    </button>
                ))}
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-900/5">
                <div className="overflow-x-auto">
                <table className="w-full min-w-[820px] border-collapse">
                    <thead>
                        <tr className="border-b border-slate-100 text-left text-xs font-medium uppercase tracking-wider text-slate-400">
                            <th className="pb-3 pr-6">Tâches</th>
                            <th className="pb-3 pr-6">Description</th>
                            <th className="pb-3 pr-6">Projet</th>
                            <th className="pb-3 pr-6">Priorite</th>
                            <th className="pb-3 pr-6">Echeance</th>
                            <th className="pb-3 pr-6">Statut</th>
                            <th className="pb-3">Actions</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-50">
                        {tachesFiltrees.map((tache) =>(
                            <tr key={tache.id} className="group transition-colors hover:bg-slate-50/70">
                                <td className="py-4 pr-6">
                                    <span className="text-sm font-medium text-slate-800">{tache.titre}</span>
                                </td>
                                <td className="py-4 pr-6 text-sm text-slate-500">{tache.description}</td>
                                <td className="py-4 pr-6 text-sm text-slate-500">{tache.projet}</td>
                                <td className="py-4 pr-6">
                                    <span className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${couleursPriorites[tache.priorite] ?? "bg-slate-50 text-slate-600 ring-slate-200"}`}>
                                        {tache.priorite}
                                    </span>
                                </td>
                                <td className="py-4 pr-6 whitespace-nowrap text-sm tabular-nums text-slate-500">{tache.echeance}</td>
                                <td className="py-4 pr-6">
                                    <span className="inline-flex items-center gap-2 whitespace-nowrap text-sm text-slate-600">
                                        <span className={`h-1.5 w-1.5 rounded-full ${pastillesStatuts[tache.statut] ?? "bg-slate-300"}`}></span>
                                        {tache.statut}
                                    </span>
                                </td>
                                <td className="py-4">
                                    <div className="flex items-center gap-1">
                                        <button className="inline-flex items-center justify-center rounded-lg p-2 text-slate-400 transition duration-150 hover:bg-slate-100 hover:text-indigo-600">
                                            <Eye size={16}/>
                                        </button>
                                        <button className="inline-flex items-center justify-center rounded-lg p-2 text-slate-400 transition duration-150 hover:bg-slate-100 hover:text-indigo-600">
                                            <Pencil size={16}/>
                                        </button>
                                        <button className="inline-flex items-center justify-center rounded-lg p-2 text-slate-400 transition duration-150 hover:bg-rose-50 hover:text-rose-600">
                                            <Trash2 size={16}/>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                </div>
            </div>
        </div>
        </>
    )
}
export default Taches