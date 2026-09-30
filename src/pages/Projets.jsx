import { Plus, Search, SlidersHorizontal, ChevronDown, Check } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import CartesProjets from "../components/CartesProjets";
function Projets(){
        const optionsTri = [
    { value: "recentes", label: "Plus récentes" },
    { value: "anciennes", label: "Plus anciennes" },
    { value: "haute", label: "Priorité haute" },
    ];

    const [tri, setTri] = useState("recentes")
    const [triOuvert, setTriOuvert] = useState(false)
    const triRef = useRef(null)

    useEffect(() => {
        const fermer = (e) => {
            if (triRef.current && !triRef.current.contains(e.target)) {
                setTriOuvert(false)
            }
        }
        document.addEventListener("mousedown", fermer)
        return () => document.removeEventListener("mousedown", fermer)
    }, [])

        const projets = [
    {
        id: 1,
        nom: "Site vitrine Nguvu",
        description: "Refonte du site institutionnel de l'agence.",
        progression: 75,
    },
    {
        id: 2,
        nom: "TaskFlow",
        description: "Application React de gestion de projets.",
        progression: 50,
    },
    {
        id: 3,
        nom: "AV Connect",
        description: "Plateforme de services de production audiovisuelle.",
        progression: 30,
    },
    {
        id: 3,
        nom: "AV Connect",
        description: "Plateforme de services de production audiovisuelle.",
        progression: 30,
    },
    {
        id: 3,
        nom: "AV Connect",
        description: "Plateforme de services de production audiovisuelle.",
        progression: 30,
    },
    {
        id: 3,
        nom: "AV Connect",
        description: "Plateforme de services de production audiovisuelle.",
        progression: 30,
    },
    {
        id: 3,
        nom: "AV Connect",
        description: "Plateforme de services de production audiovisuelle.",
        progression: 30,
    },
    ];

    return(
        <>
        <div className="mx-auto h-full max-w-7xl space-y-6 px-1 overflow-y-auto pb-2">
            <div className="flex flex-wrap items-center justify-between gap-6 rounded-2xl bg-gradient-to-br from-indigo-600 via-indigo-600 to-violet-600 p-7 shadow-lg shadow-indigo-500/20">
                    <div>
                        <h2 className="text-2xl font-semibold tracking-tight text-white">Mes projets</h2>
                        <p className="mt-1 text-sm text-indigo-100"> 4 Projets et 14 taches au total</p>
                    </div>
                    <button className="inline-flex h-fit items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-indigo-700 shadow-sm transition duration-200 hover:bg-indigo-50 active:scale-95">
                        <Plus size={16}/>
                        Nouveau projet
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
                
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {projets.map((projet) => (
                        <CartesProjets key={projet.id}
                        nom={projet.nom}
                        description={projet.description}
                        progression={projet.progression}
                        />
                    ))}
                </div>
        </div>
        </>
    )
}
export default Projets
