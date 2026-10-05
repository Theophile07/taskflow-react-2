const couleurs = {
  "À faire": {
    barre: "from-slate-400 to-slate-300",
    valeur: "text-slate-500 group-hover:text-slate-700",
  },
  "En cours": {
    barre: "from-indigo-600 to-indigo-400",
    valeur: "text-slate-400 group-hover:text-indigo-600",
  },
  "Terminée": {
    barre: "from-emerald-600 to-emerald-400",
    valeur: "text-slate-400 group-hover:text-emerald-600",
  },
}

function GraphStat({tacheAfraire, tacheEncours, tacheTerminee}){
    const donnees = [
        { statut: "À faire", nombre: tacheAfraire,},
        {statut: "En cours", nombre: tacheEncours,},
        {statut: "Terminée", nombre: tacheTerminee,},
    ]

    const maximum = Math.max(...donnees.map((donnee) => donnee.nombre))
    
    return(
        <>
        <div className="flex min-w-0 flex-col rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-900/5">
            <div className="flex items-center justify-between">
                <h2 className="text-sm font-medium uppercase tracking-wider text-slate-500">Répartition de vos tâches par statut</h2>
                <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold tabular-nums text-slate-600">{donnees.reduce((somme, d) => somme + d.nombre, 0)}</span>
            </div>
            
            <div className="mt-6 flex h-60 items-end gap-6 border-b border-slate-100">
                {maximum > 0 ? donnees.map((donnee) => {
                    const hauteur = (donnee.nombre / maximum) * 100
                    const palette = couleurs[donnee.statut]

                    return(
                        <div
                        key={donnee.statut}
                        className="group flex h-full flex-1 flex-col items-center justify-end"
                        >
                            <span className={`mb-2 text-xs font-semibold tabular-nums transition-colors ${palette.valeur}`}>
                                {donnee.nombre}
                            </span>

                            <div
                            className={`w-full max-w-14 rounded-t-lg bg-gradient-to-t ${palette.barre} shadow-sm transition-all duration-500`}
                            style={{height:`${Math.max(hauteur, 4)}%`}}>
                            </div>
                            <p className="mt-3 truncate text-xs font-medium text-slate-500">
                                {donnee.statut}
                            </p>
                    </div>
                    )
                }) : (
                    <div className="flex h-full w-full items-center justify-center border-b border-dashed border-slate-100 pb-8">
                        <p className="text-sm text-slate-400">Aucune tâche pour le moment</p>
                    </div>
                )}
            </div>
        </div>
        </>
    )
}

export default GraphStat