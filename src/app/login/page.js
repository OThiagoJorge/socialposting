'use client'
import '../globals.css'
import { auth } from '@/firebaseconfig.js'
import { signInWithEmailAndPassword, signOut } from "firebase/auth"

const Login = () => {
    const handleSignIn = (e) => {
        e.preventDefault()
        const email = e.target.email.value
        const password = e.target.password.value
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user
            console.log("Usuário logado com sucesso: ",user)
        })
        .catch((error) => {
            const errorMessage = error.message
            console.error('Ocorreu um erro ao logar: ', errorMessage)
    })}

    const handleSignOut = () => {
        signOut(auth).then(() => {
            console.log('Usuário deslogado com sucesso!')
          }).catch((error) => {
            console.error("Ocorreu um erro:", error.message)
          })
    }

    return (
        <div className="grid justify-center pt-5 bg-gray-100 w-full h-full fixed">
        <h1 className="text-5xl text-center mb-5">Bem vindo!</h1>
        <div className="bg-white p-8 rounded-lg shadow-md w-96">
            <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
            <form onSubmit={handleSignIn} id="signupForm" className="space-y-4">
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">E-mail</label>
                <input
                type="email"
                id="email"
                name="email"
                placeholder="Digite seu e-mail"
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
            </div>          
            <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Senha</label>
                <input
                type="password"
                id="password"
                name="password"
                placeholder="Digite sua senha"
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
            </div>
            <button
                type="submit"
                className="w-full py-2 px-4 bg-indigo-600 text-white font-bold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
                Entrar
            </button>
            </form>
            <button
                onClick={handleSignOut}
                className="mt-4 w-full py-2 px-4 bg-indigo-600 text-white font-bold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
                Sair
            </button>
        </div>
        </div>
  )
}

export default Login