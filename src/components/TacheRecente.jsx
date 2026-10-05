const libelles = {
    "a_faire": "À faire",
    "en_cours": "En cours",
    "terminee": "Terminée",
}

function TacheRecente({titre, projet, priorite, echeance, statut}){
    const couleurs = {
        "Haute": "bg-rose-50 text-rose-600 ring-rose-100",
        "haute": "bg-rose-50 text-rose-600 ring-rose-100",
        "Moyenne": "bg-amber-50 text-amber-600 ring-amber-100",
        "moyenne": "bg-amber-50 text-amber-600 ring-amber-100",
        "Basse": "bg-emerald-50 text-emerald-600 ring-emerald-100",
        "basse": "bg-emerald-50 text-emerald-600 ring-emerald-100",
    }

    const pastilles = {
        a_faire: "bg-slate-300",
        en_cours: "bg-indigo-400",
        terminee: "bg-emerald-500",
    }

    const libelle = libelles[statut] ?? statut
    const prioriteAffichee = priorite ? priorite.charAt(0).toUpperCase() + priorite.slice(1) : priorite

    return(
        <>
            <tr className="group transition-colors hover:bg-slate-50/70">
                <td className="max-w-[240px] py-4 pr-6">
                    <span className="block truncate text-sm font-medium text-slate-800">{titre}</span>
                </td>
                <td className="max-w-[180px] truncate py-4 pr-6 text-sm text-slate-500">{projet?.nom}</td>
                <td className="py-4 pr-6">
                    <span className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${couleurs[priorite] ?? "bg-slate-50 text-slate-600 ring-slate-200"}`}>
                        {prioriteAffichee}
                    </span>
                </td>
                <td className="whitespace-nowrap py-4 pr-6 text-sm tabular-nums text-slate-500">{echeance}</td>
                <td className="py-4">
                    <span className="inline-flex items-center gap-2 whitespace-nowrap text-sm text-slate-600">
                        <span className={`h-1.5 w-1.5 rounded-full ${pastilles[statut] ?? "bg-slate-300"}`}></span>
                        {libelle}
                    </span>
                </td>
            </tr>
        </>
    )
}

export default TacheRecente