import { Link, useNavigate } from "react-router-dom"
import { Mail, Lock, CheckCircle, Layers, TrendingUp, AlertCircle } from "lucide-react"
import { useContext, useState } from "react"
import { AuthContext } from "../context/AuthContext"
import { recupererUtilisateurParEmail } from "../api/utilisateur"

function Connexion(){
    const avantages = [
    { icone: Layers, texte: "Suivez l'avancement de tous vos projets" },
    { icone: CheckCircle, texte: "Organisez vos tâches par priorité et statut" },
    { icone: TrendingUp, texte: "Visualisez vos performances en un coup d'œil" },
    ]
    const [erreur, setErreur] = useState("")
    const [formulaire, setFormulaire] = useState({
        email: "",
        motDePasse: ""
    })

    const { login } = useContext(AuthContext) 
    const navigate = useNavigate()

    async function gererConnexion(e) {
        e.preventDefault()
        setErreur("")
        try{
            const utilisateur = await recupererUtilisateurParEmail(formulaire.email.trim())
            
            if(!utilisateur){
                setErreur("Email ou mot de passe incorrect.")
                return
            }
            if(utilisateur.motDePasse !== formulaire.motDePasse){
                setErreur("Email ou mot de passe incorrect.")
                return
            }
            login(utilisateur)

            navigate("/dashboard")
        }catch(error){
            console.error(error)
            setErreur("Une erreur est survenue.")
        }
    }
    function gererChangement(e){
        const { name, value } = e.target
        setFormulaire((ancienFormulaire) => ({ ...ancienFormulaire, [name]: value}))
    }

    return(
        <>
        <div className="min-h-screen bg-slate-50 lg:grid lg:grid-cols-2">
            <div className="relative flex flex-col justify-between overflow-hidden bg-gradient-to-br from-indigo-600 via-indigo-600 to-violet-600 p-8 lg:p-12">
                <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-2xl"/>
                <div className="absolute -bottom-32 -left-16 h-80 w-80 rounded-full bg-violet-400/20 blur-3xl"/>

                <div className="relative">
                    <div className="inline-flex items-center gap-2 rounded-2xl bg-white/10 px-4 py-2 ring-1 ring-inset ring-white/20">
                        <span className="text-lg font-semibold tracking-tight text-white">Task<span className="text-indigo-200">Flow</span></span>
                    </div>
                </div>

                <div className="relative max-w-md">
                    <h1 className="text-3xl font-semibold leading-tight tracking-tight text-white lg:text-4xl">Gérez vos projets, un tableau de bord à la fois.</h1>
                    <p className="mt-4 text-indigo-100">La plateforme tout-en-un pour planifier, suivre et livrer vos projets.</p>

                    <ul className="mt-10 space-y-4">
                        {avantages.map((item) => {
                            const Icone = item.icone
                            return (
                                <li key={item.texte} className="flex items-center gap-3 text-sm font-medium text-white">
                                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/10 ring-1 ring-inset ring-white/20">
                                        <Icone size={17}/>
                                    </span>
                                    {item.texte}
                                </li>
                            )
                        })}
                    </ul>
                </div>

                <p className="relative text-xs text-indigo-200/80">© {new Date().getFullYear()} TaskFlow — Tous droits réservés</p>
            </div>

            <div className="relative flex items-center justify-center p-6 lg:p-12">
                <div className="w-full max-w-md">
                    <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-900/5">
                        <div className="mb-8">
                            <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Bienvenue</h2>
                            <p className="mt-1 text-sm text-slate-500">Connectez-vous à votre espace de travail</p>
                        </div>

                        <form className="space-y-5" onSubmit={gererConnexion}>
                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-slate-700">Adresse email</label>
                                <div className="relative">
                                    <Mail size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"/>
                                    <input type="email" placeholder="vous@exemple.com"
                                    name="email"
                                    value={formulaire.email}
                                    onChange={gererChangement}
                                    className="w-full rounded-xl border border-transparent bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-700 ring-1 ring-inset ring-slate-200 transition placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
                                </div>
                            </div>

                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-slate-700">Mot de passe</label>
                                <div className="relative">
                                    <Lock size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"/>
                                    <input type="password" placeholder="••••••••"
                                    name="motDePasse"
                                    value={formulaire.motDePasse}
                                    onChange={gererChangement}
                                    className="w-full rounded-xl border border-transparent bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-700 ring-1 ring-inset ring-slate-200 transition placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
                                </div>
                            </div>
                            {erreur && (
                                <div className="flex items-start gap-2.5 rounded-xl bg-rose-50 px-3.5 py-3 text-sm text-rose-600 ring-1 ring-inset ring-rose-100">
                                    <AlertCircle size={16} className="mt-0.5 shrink-0"/>
                                    <span>{erreur}</span>
                                </div>
                            )}

                            <button type="submit" className="w-full rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition duration-200 hover:from-indigo-500 hover:to-violet-500 active:scale-[0.98]">
                                Se connecter
                            </button>
                        </form>
                    </div>

                    <p className="mt-6 text-center text-sm text-slate-500">
                        Pas encore de compte ?
                        <Link to="/inscription" className="ml-1 font-semibold text-indigo-600 transition-colors hover:text-indigo-500">Créer un compte</Link>
                    </p>
                </div>
            </div>
        </div>
        </>
    )
}
export default Connexion