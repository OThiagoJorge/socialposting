'use client'
import '@/globals.css'
import { auth } from '@/firebaseconfig.js'
import { signInWithEmailAndPassword } from "firebase/auth"
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import { useAuth } from '@/app/contexts/authContext'

const Login = () => {
    const { user, loading } = useAuth()

    const [showPassword, setShowPassword] = useState(false)

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }
    const router = useRouter()
    const handleSignIn = (e) => {
        e.preventDefault()
        const email = e.target.email.value
        const password = e.target.password.value
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user
            console.log("Usuário logado com sucesso: ", user)
            if (typeof window !== 'undefined') {
                localStorage.setItem('user', JSON.stringify(user))
            }
            router.push('/')
        })
        .catch((error) => {
            const errorMessage = error.message
            console.error('Ocorreu um erro ao logar: ', errorMessage)
    })}

    return (
        <>
            <div className="grid justify-center bg-gray-100 w-auto h-auto m-auto">
                <div className="z-40 px-3 items-center justify-between flex fixed font-extrabold text-sm md:text-xl h-10 md:h-14 w-screen">
                    <button onClick={() => router.push('/')} className='flex items-center bg-marrs hover:bg-marrs/75 text-white w-auto px-3 py-1 h-auto rounded-lg'>
                            <ArrowBackIcon />
                    </button>          
                </div>
                <h1 className="text-5xl text-center md:mt-14 mt-10 font-extrabold mb-5">Bem vindo!</h1>
                <div className="bg-white p-8 rounded-lg shadow-md w-96 h-auto">
                    <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
                    <form 
                        onSubmit={handleSignIn} 
                        className="space-y-4"
                    >
                        <div>
                            <label 
                                htmlFor="email" 
                                className="block text-sm font-medium text-gray-700"
                            >
                                E-mail
                            </label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Digite seu e-mail"
                                required
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>          
                        <div>
                            <label 
                                htmlFor="password" 
                                className="block text-sm font-medium text-gray-700"
                            >
                                Senha
                            </label>
                            <div className="relative mt-1">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Digite sua senha"
                                    required
                                    className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-600 hover:text-gray-800 focus:outline-none"
                                >
                                    {showPassword ? (
                                        <VisibilityOffIcon />
                                    ) : (
                                        <VisibilityIcon />
                                    )}
                                </button>
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="w-full py-2 px-4 bg-marrs hover:bg-marrs/75 text-white font-bold rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            Entrar
                        </button>
                    </form>
                    <p className='text-center mt-8'>Ainda não possui conta? <a href="/signup" className='text-marrs hover:underline'>Cadastre-se</a></p>
                </div>
            </div>
            <div className='bg-gray-100 w-full h-full z-0 fixed'></div>
        </>
    )
}

export default Login