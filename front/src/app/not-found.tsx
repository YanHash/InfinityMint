"use client"

const NotFound = () => {

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
            <h1 className="text-4xl font-bold">404 - Page Non Trouvée</h1>
            <p className="mt-2 text-lg">Désolé, la page que vous recherchez n'existe pas.</p>
            <button
                onClick={() => (window.location.href = '/')}
                className="mt-4 px-6 py-2 bg-white text-black font-semibold rounded-lg hover:bg-gray-300"
            >
                Retourner à la page principale
            </button>
        </div>
    )
}
export default NotFound