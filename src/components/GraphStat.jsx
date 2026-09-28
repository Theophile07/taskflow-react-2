function GraphStat(){
    const donnees = [
    {
        statut: "À faire",
        nombre: 8,
        },
        {
            statut: "En cours",
            nombre: 5,
        },
        {
            statut: "Terminée",
            nombre: 30,
        },
        
    ]
    const maximum = Math.max(...donnees.map((donnee) => donnee.nombre))
    
    return(
        <>
        <div className="flex min-w-0 flex-col rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-900/5">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500">Répartition de vos tâches par statut</h2>
            
            <div className="mt-6 flex h-60 items-end gap-6 border-b border-slate-100">
                {donnees.map((donnee) => {
                    const hauteur = (donnee.nombre / maximum) * 100

                    return(
                        <div
                        key={donnee.statut}
                        className="group flex h-full flex-1 flex-col items-center justify-end"
                        >
                            <span className="mb-2 text-xs font-semibold tabular-nums text-slate-400 transition-colors group-hover:text-indigo-600">
                                {donnee.nombre}
                            </span>

                            <div
                            className="w-full max-w-14 rounded-t-lg bg-gradient-to-t from-indigo-600 to-indigo-400 shadow-sm shadow-indigo-500/20 transition-all duration-500 group-hover:from-indigo-500 group-hover:to-indigo-300"
                            style={{height:`${Math.max(hauteur, 4)}%`}}>
                            </div>
                            <p className="mt-3 truncate text-xs font-medium text-slate-500">
                                {donnee.statut}
                            </p>
                    </div>
                    )
                })}
            </div>
        </div>
        </>
    )
}

export default GraphStat
