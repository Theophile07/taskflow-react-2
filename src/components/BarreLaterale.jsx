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
            <div className="w-64 h-screen bg-blue-950 ">
                <div className="p-6 mb-8">
                    <h2 className="text-3xl font-bold text-amber-50">Task<span className="text-emerald-300">Flow</span></h2>
                    <p className="text-teal-50">Gestion de projets</p>
                </div>

                <nav className="space-y-2 px-4">
                {navItem.map((item) => {
                    const Icone = item.icon; 
                    
                    return (
                        <NavLink 
                            key={item.id}
                            to={item.path}
                            className={({ isActive }) => 
                                `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                                    isActive 
                                        ? "bg-blue-600 text-white font-bold" 
                                        : "text-slate-50 hover:bg-blue-600/50"
                                }`
                            }
                        >
                            <Icone size={20} />
                            <span>{item.label}</span>
                        </NavLink>
                    );
                })}
            </nav>
            </div>
        </>
    )
}

export default BarreLaterale