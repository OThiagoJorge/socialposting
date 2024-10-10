'use client'
import './globals.css'

const Logout = ({out}) => {
    return (
        <div className='w-32 h-12 rounded-2xl bg-white'>
            <button 
                onClick={out} 
                className="w-32 h-12 rounded-2xl z-10 bg-gray-200 text-black hover:bg-gray-300"
            >
                Sair
            </button>
        </div>
    )
}

export default Logout