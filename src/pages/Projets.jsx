import { Plus, Search, SlidersHorizontal, ChevronDown, Check } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import CartesProjets from "../components/CartesProjets";
import { recupererProjet, supprimerProjet } from "../api/projets";
import { recupererTaches } from "../api/taches";
import Modal from "../components/Modal"
import FormulaireProjets from "../components/FormulaireProjets"


function Projets(){
    // TRI
        const optionsTri = [
    { value: "recentes", label: "Plus récentes" },
    { value: "anciennes", label: "Plus anciennes" },
    { value: "haute", label: "Priorité haute" },
    ];
    const [projets, setProjets] = useState([])
    const [taches, setTaches] = useState([])
    const [modal, setModal] = useState(null)
    const [projetSelectionne, setProjetSelectionne] = useState(null)
    
    // Fonction de Modification
    function ouvrirModification(projet) {
        setProjetSelectionne(projet)
        setModal("modifier-projet")
    }
    // Fonction de suppression
    async function supprimerProjetSelectionne() {
        try {
            await supprimerProjet(projetSelectionne.id);

            setProjets((anciensProjets) =>
                anciensProjets.filter(
                    (projet) =>
                        String(projet.id) !==
                        String(projetSelectionne.id)
                )
            );

            setModal(null);
            setProjetSelectionne(null);

        } catch (error) {
            console.error(error);
        }
    }

    // ------------ TRI -------------------
    const [tri, setTri] = useState("recentes")
    const [triOuvert, setTriOuvert] = useState(false)
    const triRef = useRef(null)

    useEffect(() => {
        const fermer = (e) => {
            if (triRef.current && !triRef.current.contains(e.target)) {
                setTriOuvert(false)
            }
        }
        document.addEventListener("mousedown", fermer)
        return () => document.removeEventListener("mousedown", fermer)
    }, [])


    //-------------------  --------------------
    const { utilisateur } = useContext(AuthContext)

    // -------------- FILTRER PROJET PAR UTILISATEUR 
    const mesProjets = utilisateur ? projets.filter(
        (projet) => Number(projet.utilisateurId) === Number(utilisateur.id)
    ):[]

    const iDProjet = mesProjets.map(
        (projet) => Number(projet.id)
    )
    const mesTaches = taches.filter(
        (tache) => iDProjet.includes(Number(tache.projetId))
    )
    //------------------- API -----------------------------------

    useEffect(() => {
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
    // -----------------------------------------------------------------

    return(
        <>
        <div className="mx-auto h-full max-w-7xl space-y-6 px-1 overflow-y-auto pb-2">
            <div className="flex flex-wrap items-center justify-between gap-6 rounded-2xl bg-gradient-to-br from-indigo-600 via-indigo-600 to-violet-600 p-7 shadow-lg shadow-indigo-500/20">
                    <div>
                        <h2 className="text-2xl font-semibold tracking-tight text-white">Mes projets</h2>
                        <p className="mt-1 text-sm text-indigo-100"> {mesProjets.length} Projets et {mesTaches.length} taches au total</p>
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
                    onFermer={() => setModal(null)}>
                        <FormulaireProjets/>
                    </Modal>
                </div>
                <div className="flex flex-col gap-3 rounded-2xl bg-white p-3 shadow-sm ring-1 ring-slate-900/5 md:flex-row md:items-center">
                    <div className="relative w-full md:flex-1">
                        <Search size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"/>
                        <input type="text"
                        placeholder="Rechercher un projet..."
                        className="w-full rounded-xl border border-transparent bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-700 ring-1 ring-inset ring-slate-200 transition placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    <div ref={triRef} className="relative w-full md:w-56">
                        <SlidersHorizontal size={16} className={`pointer-events-none absolute left-3.5 top-1/2 z-10 -translate-y-1/2 transition-colors ${triOuvert ? "text-indigo-500" : "text-slate-400"}`}/>
                        <button
                            type="button"
                            onClick={() => setTriOuvert((o) => !o)}
                            className={`flex w-full items-center justify-between gap-2 rounded-xl py-2.5 pl-10 pr-3.5 text-sm font-medium transition duration-200 ${triOuvert ? "bg-white text-slate-900 ring-2 ring-indigo-500" : "bg-slate-50 text-slate-600 ring-1 ring-inset ring-slate-200 hover:bg-white"}`}
                        >
                            {optionsTri.find((o) => o.value === tri).label}
                            <ChevronDown size={16} className={`shrink-0 transition-transform duration-200 ${triOuvert ? "rotate-180 text-indigo-500" : "text-slate-400"}`}/>
                        </button>

                        {triOuvert && (
                            <ul className="absolute left-0 right-0 z-20 mt-1.5 overflow-hidden rounded-xl bg-white p-1 shadow-lg shadow-slate-900/10 ring-1 ring-slate-900/5">
                                {optionsTri.map((option) => (
                                    <li key={option.value}>
                                        <button
                                            type="button"
                                            onClick={() => { setTri(option.value); setTriOuvert(false) }}
                                            className={`flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2 text-left text-sm transition duration-150 ${tri === option.value ? "bg-indigo-50 font-medium text-indigo-600" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"}`}
                                        >
                                            {option.label}
                                            {tri === option.value && <Check size={14} className="shrink-0 text-indigo-500"/>}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
                
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {mesProjets.map((projet) => {
                        // Calcul de la progression
                        const tachesParProjet = mesTaches.filter(
                            (tache) => Number(tache.projetId) === Number(projet.id)
                        );
                        const totalParProjet = tachesParProjet.length;
                        const terminee = tachesParProjet.filter(
                            (tache) => tache.statut === "terminee"
                        ).length;

                        const progression = totalParProjet === 0
                            ? 0
                            : Math.round(
                                (terminee / totalParProjet) * 100
                            );
                    
                    // Rendu
                        return(
                            <CartesProjets 
                            key={projet.id}
                            id={projet.id}
                            nom={projet.nom}
                            description={projet.description}
                            progression={progression}
                            couleur={projet.couleur}
                            onModifier={() => ouvrirModification(projet)}
                            onSupprimer={() => {
                                setProjetSelectionne(projet)
                                setModal("supprimer-projet")
                            }}
                            />
                        )
                    })}
                </div>
               {/* Modal modification */}
                    <Modal
                    ouvert={modal === "modifier-projet"}
                    titre="Modifier le projet"
                    onFermer={() => {
                        setModal(null) 
                        setProjetSelectionne(null)}}
                    >
                        <FormulaireProjets projet={projetSelectionne}/>

                    </Modal>
                    <Modal
                        ouvert={modal === "supprimer-projet"}
                        titre="Supprimer le projet"
                        onFermer={() => {
                            setModal(null);
                            setProjetSelectionne(null);
                        }}
                    >
                        <div className="space-y-5">
                                <p className="text-sm leading-relaxed text-slate-600">
                                    Voulez-vous vraiment supprimer le projet{" "}
                                    <strong className="text-slate-900">
                                        {projetSelectionne?.nom}
                                    </strong>
                                    ?
                                    <br />
                                    Cette action est irréversible.
                                </p>

                                <div className="flex justify-end gap-3">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setModal(null);
                                            setProjetSelectionne(null);
                                        }}
                                        className="rounded-xl px-4 py-2.5 text-sm font-medium text-slate-600 ring-1 ring-inset ring-slate-200 hover:bg-slate-50"
                                    >
                                        Annuler
                                    </button>

                                    <button
                                        type="button"
                                        onClick={supprimerProjetSelectionne}
                                        className="rounded-xl bg-rose-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-rose-500"
                                    >
                                        Supprimer
                                    </button>
                                </div>
                            </div>
                    </Modal>
        </div>
        </>
    )
}
export default Projets
