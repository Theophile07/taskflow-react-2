import { Pencil, Trash2, FolderKanban } from "lucide-react"
import { useNavigate } from "react-router-dom"

function CartesProjets({id, nom, description, progression, couleur, onModifier, onSupprimer}){
    const navigate = useNavigate()

    return(
        <>
            <article className="group flex flex-col gap-5 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-900/5 transition duration-200 hover:-translate-y-0.5 hover:shadow-md hover:ring-slate-900/10">
                <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 ring-1 ring-inset ring-indigo-100 transition-transform duration-200 group-hover:scale-105">
                        <FolderKanban size={20}/>
                    </div>
                    <div className="min-w-0">
                        <h2 className="truncate text-base font-semibold tracking-tight text-slate-900">{nom}</h2>
                        <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-slate-500">{description}</p>
                    </div>
                </div>

                <div>
                    <div className="mb-2 flex items-center justify-between">
                        <span className="text-xs font-medium uppercase tracking-wider text-slate-400">Progression</span>
                        <span className="text-xs font-semibold tabular-nums text-slate-600">{progression}%</span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                        <div className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-indigo-400 transition-all duration-500"
                            style={{
                                width: `${progression}%`,
                                background:`${couleur}`
                            }}
                        />
                    </div>
                </div>

                <div className="mt-auto flex items-center gap-2 border-t border-slate-100 pt-4">
                    <button 
                    onClick={() => navigate(`/projets/${id}`)}
                    className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition duration-200 hover:bg-indigo-500 active:scale-95">
                        Ouvrir
                    </button>
                    <button className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-white px-3 py-2 text-sm font-medium text-slate-600 ring-1 ring-inset ring-slate-200 transition duration-200 hover:bg-slate-50 hover:text-slate-900"
                    onClick={onModifier}
                    >
                        <Pencil size={15}/>
                        Modifier
                    </button>
                    <button className="inline-flex items-center justify-center rounded-xl px-2.5 py-2 text-sm font-medium text-slate-400 transition duration-200 hover:bg-rose-50 hover:text-rose-600"
                    onClick={() => onSupprimer(id)}
                    >
                        <Trash2 size={15}/>
                    </button>
                </div>               
            </article>


        
        </>
    )
}

export default CartesProjets
