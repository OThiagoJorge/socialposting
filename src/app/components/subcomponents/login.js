'use client'
import './globals.css'
import { useRouter } from 'next/navigation'

const Login = () => {
    const router = useRouter()
    const goToProfile = () => {
        return router.push('/profile')
    }
    return (
        <div className='w-32 h-12 rounded-2xl bg-white'>
            <button 
                onClick={goToProfile} 
                className="w-32 h-12 rounded-2xl z-10 bg-gray-200 text-black hover:bg-gray-300"
            >
                Entrar
            </button>
        </div>
    )
}

export default Login