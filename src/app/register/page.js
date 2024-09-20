'use client'
import '../globals.css'
import { useRouter } from 'next/navigation'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import VisibilityIcon from '@mui/icons-material/Visibility'
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail'
import { useState } from 'react'

const Register = () => {
    const [showPassword, setShowPassword] = useState(false)
    const router = useRouter()

    const handleClick = () => {
      return router.push('/')
    }

    const goToLogin = () => {
      return router.push('/login')
    }

    const togglePasswordVisibility = () => {
      setShowPassword((prevShowPassword) => !prevShowPassword)
    }

    return (
        <div className='bg-gray-100 h-screen'>
            <div className="grid gap-4 grid-cols-1 w-auto justify-center relative mt-0">
              <h1 className="font-black text-4xl md:text-5xl block text-center mt-4">Crie sua conta</h1>
              <form className="flex flex-col items-center mt-0">
                <input 
                  type="text" 
                  className="block mt-2 rounded-full w-4/5 md:w-96 h-10 focus:drop-shadow-md focus:outline-none align-middle text-xl px-5 text-center border-2" 
                  placeholder='Nome'
                  autoFocus
                />
                <label className='block mt-2 w-4/5 md:w-96 h-10 rounded-full focus:drop-shadow-md focus:outline-none text-xl border-2 flex items-center px-4 bg-white'>
                    <AlternateEmailIcon className='cursor-default' />
                    <input 
                        className='flex-grow h-full text-center focus:outline-none bg-transparent' 
                        placeholder="Nome de usuário" 
                        type='text'
                        id='passwordInput' 
                    />
                </label>
                <input 
                  type="email" 
                  className="block mt-2 rounded-full w-4/5 md:w-96 h-10 focus:drop-shadow-md focus:outline-none align-middle text-xl px-5 text-center border-2" 
                  placeholder='E-mail'
                />
                <input 
                  type="date" 
                  className="block mt-2 rounded-full w-4/5 md:w-96 h-10 focus:drop-shadow-md focus:outline-none align-middle text-xl px-5 text-center border-2" 
                  placeholder='Data de nascimento'
                />
                <fieldset data-role="controlgroup">
                    <legend>Selecione seu gênero:</legend>
                        <label for="male">Masculino</label>
                        <input type="radio" name="gender" id="male" value="male" />
                        <label for="female">Feminino</label>
                        <input type="radio" name="gender" id="female" value="female" />
                </fieldset>
                <label className='block mt-2 w-4/5 md:w-96 h-10 rounded-full focus:drop-shadow-md focus:outline-none text-xl border-2 flex items-center px-4 bg-white'>
                  <input 
                    className='flex-grow h-full text-center focus:outline-none bg-transparent' 
                    placeholder="Senha" 
                    type={showPassword ? "text" : "password"}
                    id='passwordInput' 
                  />
                  {showPassword ? (
                    <VisibilityIcon className='cursor-pointer' onClick={togglePasswordVisibility} />
                  ) : (
                    <VisibilityOffIcon className='cursor-pointer' onClick={togglePasswordVisibility} />
                  )}
                </label>
                <label className='block mt-2 w-4/5 md:w-96 h-10 rounded-full focus:drop-shadow-md focus:outline-none text-xl border-2 flex items-center px-4 bg-white'>
                  <input 
                    className='flex-grow h-full text-center focus:outline-none bg-transparent' 
                    placeholder="Confirmar senha" 
                    type={showPassword ? "text" : "password"}
                    id='passwordInput' 
                  />
                  {showPassword ? (
                    <VisibilityIcon className='cursor-pointer' onClick={togglePasswordVisibility} />
                  ) : (
                    <VisibilityOffIcon className='cursor-pointer' onClick={togglePasswordVisibility} />
                  )}
                </label>
                <button onClick={handleClick} type="submit" className="block w-4/5 md:w-96 h-10 align-middle text-center mt-4 bg-blue-700 text-white rounded-full hover:bg-blue-500 duration-100">
                  Criar conta
                </button>
                <div className="flex items-center mt-2">
                    <input type="checkbox" id="stayLoggedIn" />
                    <label htmlFor="stayLoggedIn" className="ml-2">Concordo com os <button className="text-blue-700 hover:underline">termos de uso</button> e as <button className="text-blue-700 hover:underline">diretrizes da comunidade</button></label>
              </div>
              </form>
              <button className="mt-0 text-blue-700 hover:underline">Esqueceu sua senha?</button>
              <button onClick={goToLogin} className="mt-0 text-blue-700 hover:underline">Já possui uma conta? Entre</button>
            </div>
        </div>
    )
}

export default Register