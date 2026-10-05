import { X } from "lucide-react"

function Modal({ ouvert, titre, children, onFermer }) {

    if (!ouvert) {
        return null
    }

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm"
            onMouseDown={onFermer}
        >
            <div
                className="flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
                onMouseDown={(e) => e.stopPropagation()}
            >

                {/* En-tête */}
                <div className="flex shrink-0 items-center justify-between border-b border-slate-100 px-6 py-4">

                    <h2 className="text-lg font-semibold text-slate-900">
                        {titre}
                    </h2>

                    <button
                        type="button"
                        onClick={onFermer}
                        className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                    >
                        <X size={20} />
                    </button>

                </div>
                {/* Contenu */}
                <div className="overflow-y-auto p-6">
                    {children}
                </div>

            </div>
        </div>
    )
}

export default Modal