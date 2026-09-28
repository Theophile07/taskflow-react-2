function AvancerProjet(){
    const projets = [
    {
      id: 1,
      nom: "Site vitrine Nguvu",
      progression: 75,
    },
    {
      id: 2,
      nom: "TaskFlow",
      progression: 50,
    },
    {
      id: 3,
      nom: "AV Connect",
      progression: 30,
    },
    {
      id: 3,
      nom: "AV Connect",
      progression: 30,
    },
    {
      id: 3,
      nom: "AV Connect",
      progression: 30,
    },
    {
      id: 3,
      nom: "AV Connect",
      progression: 30,
    },
    {
      id: 3,
      nom: "AV Connect",
      progression: 30,
    },
  ];

  return (
    <div className="flex min-w-0 flex-col rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-900/5">
      <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500">Avancement par projets</h2>

      <div className="mt-4 max-h-[280px] flex-grow space-y-1 overflow-y-auto pr-1.5 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-slate-200 [&::-webkit-scrollbar-track]:bg-transparent">
        {projets.map((projet) => (
        <div key={projet.id} className="rounded-xl px-3 py-2.5 transition-colors hover:bg-slate-50">
            <div className="mb-2 flex items-center justify-between gap-3 text-sm">
            <p className="truncate font-medium text-slate-700">{projet.nom}</p>
            <span className="shrink-0 text-xs font-semibold tabular-nums text-slate-400">{projet.progression}%</span>
            </div>
            
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
            <div 
                className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-indigo-400 transition-all duration-500"
                style={{ width: `${projet.progression}%` }}
            ></div>
            </div>
        </div>
        ))}
      </div>
    </div>
  );
}

export default AvancerProjet
