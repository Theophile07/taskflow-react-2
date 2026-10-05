import { FolderKanban, CheckSquare, CircleCheck, Clock, Plus } from "lucide-react"
import { Link } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/AuthContext"
import CarteStat from "../components/CarteStat"
import GraphStat from "../components/GraphStat"
import AvancerProjet from "../components/AvancerProjet"
import TacheRecente from "../components/TacheRecente"
import { recupererProjet } from "../api/projets"
import { recupererTaches } from "../api/taches"
import Modal from "../components/Modal"
import FormulaireTaches from "../components/FormulaireTaches"
import FormulaireProjets from "../components/FormulaireProjets"

function Dashboard (){

    const [projets, setProjets] = useState([])
    const [taches, setTaches] = useState([])
    const [modal, setModal] = useState(null)
    const { utilisateur, chargement } = useContext(AuthContext)

    // ----------- DONNEES EN FONCTION DE L"UTILISATEUR CONNECTE ----------
    
    const mesProjets = utilisateur ? projets.filter(
        (projet) => Number(projet.utilisateurId) === Number(utilisateur.id)
    ): []
    const iDProjet = mesProjets.map(
        (projet) => Number(projet.id)
    )
    const mesTaches = taches.filter(
        (tache) => iDProjet.includes(Number(tache.projetId))
    )
    
    // ------------ Affichage graphique --------------------
    const tacheAfaire = mesTaches.filter(
        (tache) => tache.statut === "a_faire"
    ).length
    const tacheEncours = mesTaches.filter(
        (tache) => tache.statut === "en_cours"
    ).length

    const tacheTerminee = mesTaches.filter(
        (tache) => tache.statut === "terminee"
    ).length
    
    // Afficher taches recentes
    const tachesRecentes = [...mesTaches].sort((a,b) => new Date(b.modifieLe) - new Date(a.modifieLe)).slice(0, 5)

    // API
        useEffect(()=> {
            async function recupererDonnees() {
                try{
                    const [donneeProjet, donneeTache] = await Promise.all([recupererProjet(), recupererTaches()])
                    setProjets(donneeProjet)
                    setTaches(donneeTache)
                }catch(error){
                    console.error(error)
                }
            }
recupererDonnees()
    }, [])

    if(chargement){
        return (
            <div className="mx-auto h-full max-w-7xl space-y-6 px-1">
                <div className="h-40 animate-pulse rounded-2xl bg-white ring-1 ring-slate-900/5"/>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    <div className="h-24 animate-pulse rounded-2xl bg-white ring-1 ring-slate-900/5"/>
                    <div className="h-24 animate-pulse rounded-2xl bg-white ring-1 ring-slate-900/5"/>
                    <div className="h-24 animate-pulse rounded-2xl bg-white ring-1 ring-slate-900/5"/>
                    <div className="h-24 animate-pulse rounded-2xl bg-white ring-1 ring-slate-900/5"/>
                </div>
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    <div className="h-80 animate-pulse rounded-2xl bg-white ring-1 ring-slate-900/5"/>
                    <div className="h-80 animate-pulse rounded-2xl bg-white ring-1 ring-slate-900/5"/>
                </div>
            </div>
        )
    }

    return(
        <>
        <div className="mx-auto h-full max-w-7xl space-y-6 px-1 overflow-y-auto pb-2">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 via-indigo-600 to-violet-600 p-7 shadow-lg shadow-indigo-500/20">
                <div className="absolute -right-16 -top-20 h-56 w-56 rounded-full bg-white/10 blur-2xl"/>
                <div className="absolute -bottom-24 -left-10 h-64 w-64 rounded-full bg-violet-400/30 blur-3xl"/>
                <div className="relative flex flex-wrap items-center justify-between gap-6">
                <div>
                    <h2 className="text-2xl font-semibold tracking-tight text-white">Bonjour {utilisateur?.nom}</h2>
                    <p className="mt-1 text-sm text-indigo-100">Commence ta journée ici !</p>
                </div>
                <button className="inline-flex h-fit items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-indigo-700 shadow-sm transition duration-200 hover:bg-indigo-50 active:scale-95"
                onClick={() => setModal("nouveau-projet")}
                >
                    <Plus size={16}/>
                    Nouveau projet
                </button>
                <Modal
                    ouvert={modal === "nouveau-projet"}
                    titre="Nouveau projet"
                    onFermer={() => setModal(null)}
                >
                    <FormulaireProjets/>
                </Modal>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <CarteStat icon={FolderKanban} label={"Projets"} valeur={mesProjets.length} ton="indigo"/>
                <CarteStat icon={CheckSquare} label={"Total tâches"} valeur={mesTaches.length} ton="violet"/>
                <CarteStat icon={Clock} label={"En cours"} valeur={tacheEncours} ton="amber"/>
                <CarteStat icon={CircleCheck} label={"Terminées"} valeur={tacheTerminee} ton="emerald"/>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <GraphStat tacheAfraire={tacheAfaire} tacheEncours={tacheEncours} tacheTerminee={tacheTerminee}/>
                <AvancerProjet projets={mesProjets} taches={mesTaches}/>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-900/5">
                <div className="mb-5 flex items-center justify-between">
                    <h2 className="text-sm font-medium uppercase tracking-wider text-slate-500">
                        Tâches récentes
                    </h2>
                    <Link to="/taches" className="rounded-lg px-2.5 py-1.5 text-sm font-medium text-indigo-600 transition-colors hover:bg-indigo-50">
                        Voir tout
                    </Link>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[640px] border-collapse">
                        <thead>
                            <tr className="border-b border-slate-100 text-left text-xs font-medium uppercase tracking-wider text-slate-400">
                                <th className="pb-3 pr-6">Tâches</th>
                                <th className="pb-3 pr-6">Projet</th>
                                <th className="pb-3 pr-6">Priorité</th>
                                <th className="pb-3 pr-6">Echéance</th>
                                <th className="pb-3">Statut</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-50">
                            {tachesRecentes.map((tache) => {
                                const projet = projets.find(
                                    (projet) => Number(projet.id) === Number(tache.projetId)
                                )
                                return(
                                    <TacheRecente
                                        key={tache.id}
                                        titre={tache.titre}
                                        projet={projet}
                                        priorite={tache.priorite}
                                        echeance={tache.echeance}
                                        statut={tache.statut}
                                    />
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        </>
    )
}
export default Dashboard
