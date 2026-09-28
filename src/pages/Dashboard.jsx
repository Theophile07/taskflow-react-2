import { FolderKanban, CheckSquare, CircleCheck, Clock, AlertCircle, Plus } from "lucide-react"
import CarteStat from "../components/CarteStat"
function Dashboard (){
    return(
        <>
        <div className="">
            <div className="flex justify-between items-center bg-blue-600 px-6 py-8 rounded-2xl shadow-md">
                <div>
                    <h2 className="text-4xl font-bold">Bonjour Theo</h2>
                    <p>Tu as 4 Projets et 14 taches</p>
                </div>
                <button className="bg-indigo-500 px-4 py-3 h-fit rounded-2xl">+ Nouveau projet</button>
            </div>

            <div className="flex gap-4">
                <CarteStat icon={FolderKanban} label={"Projets"} valeur={20}/>
                <CarteStat icon={FolderKanban} label={"Projets"} valeur={20}/>
                <CarteStat icon={FolderKanban} label={"Projets"} valeur={20}/>
                <CarteStat icon={FolderKanban} label={"Projets"} valeur={20}/>
               
            </div>
        </div>
        </>
    )
}
export default Dashboard