const tons = {
    indigo: {
        icone: "bg-indigo-50 text-indigo-600 ring-indigo-100",
        valeur: "text-indigo-600",
    },
    violet: {
        icone: "bg-violet-50 text-violet-600 ring-violet-100",
        valeur: "text-violet-600",
    },
    amber: {
        icone: "bg-amber-50 text-amber-600 ring-amber-100",
        valeur: "text-amber-600",
    },
    emerald: {
        icone: "bg-emerald-50 text-emerald-600 ring-emerald-100",
        valeur: "text-emerald-600",
    },
    rose: {
        icone: "bg-rose-50 text-rose-600 ring-rose-100",
        valeur: "text-rose-600",
    },
    sky: {
        icone: "bg-sky-50 text-sky-600 ring-sky-100",
        valeur: "text-sky-600",
    },
}

function CarteStat({icon:Icon, label, valeur, ton = "indigo"}){
    const palette = tons[ton] ?? tons.indigo

    return(
        <>
            <div className="group flex items-center gap-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-900/5 transition duration-200 hover:-translate-y-0.5 hover:shadow-md hover:ring-slate-900/10">
                <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ring-1 ring-inset transition-transform duration-200 group-hover:scale-105 ${palette.icone}`}>
                    <Icon size={20}/>
                </div>
                <div className="min-w-0">
                    <p className="truncate text-xs font-medium uppercase tracking-wider text-slate-500">{label}</p>
                    <p className={`mt-1 text-2xl font-semibold tabular-nums tracking-tight ${palette.valeur}`}>{valeur}</p>
                </div>
            </div>
        </>
    )
}
export default CarteStat
