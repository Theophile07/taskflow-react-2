function CarteStat({icon:Icon, label, valeur}){
    return(
        <>
            <div className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-900/5 transition duration-200 hover:-translate-y-0.5 hover:shadow-md hover:ring-slate-900/10">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 ring-1 ring-inset ring-indigo-100">
                    <Icon size={20}/>
                </div>
                <div className="min-w-0">
                    <p className="truncate text-xs font-medium uppercase tracking-wider text-slate-500">{label}</p>
                    <p className="mt-1 text-2xl font-semibold tabular-nums tracking-tight text-slate-900">{valeur}</p>
                </div>
            </div>
        </>
    )
}
export default CarteStat
