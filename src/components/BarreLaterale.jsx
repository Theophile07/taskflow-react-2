import { LayoutDashboard, FolderKanban, CheckSquare,  } from "lucide-react"
import { NavLink } from "react-router-dom"

function BarreLaterale(){
    const navItem = [{
        id: "dashboard",
        label: "Tableau de bord",
        icon: LayoutDashboard,
        path: "/dashboard",
    },
    {
        id: "projets",
        label: "Mes projets",
        icon: FolderKanban,
        path: "/projets",
    },
    {
        id: "taches",
        label: "Toutes les tâches",
        icon: CheckSquare,
        path: "/taches",
    }
    ]

    return(
        <>
            <div className="w-72 h-screen shrink-0 flex flex-col bg-slate-900 text-slate-300">
                <div className="px-6 pt-7 pb-6 border-b border-white/5">
                    <h2 className="text-xl font-semibold tracking-tight text-white">Task<span className="text-indigo-400">Flow</span></h2>
                    <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.15em] text-slate-500">Gestion de projets</p>
                </div>

                <nav className="flex-1 space-y-1 p-4">
                {navItem.map((item) => {
                    const Icone = item.icon; 
                    
                    return (
                        <NavLink 
                            key={item.id}
                            to={item.path}
                            className={({ isActive }) => 
                                `group flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all duration-200 ${
                                    isActive 
                                        ? "bg-indigo-500/15 text-white ring-1 ring-inset ring-indigo-500/30" 
                                        : "text-slate-400 hover:bg-white/5 hover:text-white"
                                }`
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    <Icone size={18} className={`shrink-0 transition-colors ${isActive ? "text-indigo-400" : "text-slate-500 group-hover:text-slate-300"}`} />
                                    <span>{item.label}</span>
                                </>
                            )}
                        </NavLink>
                    );
                })}
            </nav>
            </div>
        </>
    )
}

export default BarreLaterale
