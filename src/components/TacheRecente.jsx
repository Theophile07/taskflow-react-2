function TacheRecente({titre, projet, priorite, echeance, statut}){
    const couleurs = {
        "Haute": "bg-rose-50 text-rose-600 ring-rose-100",
        "Moyenne": "bg-amber-50 text-amber-600 ring-amber-100",
        "Basse": "bg-emerald-50 text-emerald-600 ring-emerald-100",
    }

    const pastilles = {
        "À faire": "bg-slate-300",
        "En cours": "bg-amber-400",
        "Terminée": "bg-emerald-500",
    }

    return(
        <>
            <tr className="group transition-colors hover:bg-slate-50/70">
                <td className="py-4 pr-6">
                    <span className="text-sm font-medium text-slate-800">{titre}</span>
                </td>
                <td className="py-4 pr-6 text-sm text-slate-500">{projet}</td>
                <td className="py-4 pr-6">
                    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${couleurs[priorite] ?? "bg-slate-50 text-slate-600 ring-slate-200"}`}>
                        {priorite}
                    </span>
                </td>
                <td className="py-4 pr-6 text-sm tabular-nums text-slate-500">{echeance}</td>
                <td className="py-4">
                    <span className="inline-flex items-center gap-2 text-sm text-slate-600">
                        <span className={`h-1.5 w-1.5 rounded-full ${pastilles[statut] ?? "bg-slate-300"}`}></span>
                        {statut}
                    </span>
                </td>
            </tr>
        </>
    )
}

export default TacheRecente
