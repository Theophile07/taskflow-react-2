function CarteStat({icon:Icon, label, valeur}){
    return(
        <>
            <div className="flex mt-8 bg-amber-300 w-full p-6 items-center gap-8 rounded-xl hover:shadow-md duration-300">
                <div className="bg-amber-50 flex justify-center items-center h-8 w-8 rounded-md">
                    <Icon size={20}/>
                </div>
                <div>
                    <p>{label}</p>
                    <p className="text-2xl">{valeur}</p>
                </div>
            </div>
        </>
    )
}
export default CarteStat