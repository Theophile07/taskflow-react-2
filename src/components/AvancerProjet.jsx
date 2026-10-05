function AvancerProjet({projets, taches}){
    
  return (
    <div className="flex min-w-0 flex-col rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-900/5">
      <h2 className="text-sm font-medium uppercase tracking-wider text-slate-500">Avancement par projets</h2>

      <div className="mt-4 max-h-[280px] flex-grow space-y-1 overflow-y-auto pr-1.5 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-slate-200 [&::-webkit-scrollbar-track]:bg-transparent">

        {projets.length === 0 && (
          <div className="flex h-full items-center justify-center rounded-xl border border-dashed border-slate-200 py-12">
            <p className="text-sm text-slate-400">Aucun projet pour le moment</p>
          </div>
        )}

        {projets.map((projet) => {

          const tachesParProjet = taches.filter(
                  (tache) => Number(tache.projetId) === Number(projet.id)
              )
              const totalParProjet = tachesParProjet.length

              const terminee = tachesParProjet.filter(
                  (tache) => tache.statut === "terminee"
              ).length
          
              const progression = totalParProjet === 0 
              ? 0 
              :Math.round((terminee / totalParProjet) * 100)
              
              return(
                <div key={projet.id} className="rounded-xl px-3 py-2.5 transition-colors hover:bg-slate-50">
                    <div className="mb-2 flex items-center justify-between gap-3 text-sm">
                      <p className="truncate font-medium text-slate-700">{projet.nom}</p>
                      <span className="shrink-0 rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold tabular-nums text-slate-500">{progression}%</span>
                    </div>
              
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                    <div 
                    className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-indigo-400 transition-all duration-500"
                    style={{ width: `${progression}%`, background:`${projet.couleur}` }}
                    ></div>
                  </div>
                </div>
              )
          
        }
          
        
        )}
      </div>
    </div>
  );
}

export default AvancerProjet
