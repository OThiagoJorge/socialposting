'use client'
import '../globals.css'
import { Authenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'

const Login = () => {

    return (
      <div className='bg-gray-100 h-full'>
        <div className="grid gap-4 grid-cols-1 w-auto justify-center relative">
          <h1 className="font-black text-4xl md:text-5xl block text-center mt-16">Bem-vindo!</h1>
          <Authenticator 
            formFields={{
                    signIn: {
                    username: {
                        placeholder: 'Digite seu nome de usuário',
                        className: 'block mt-2 rounded-full w-4/5 md:w-96 h-10 focus:drop-shadow-md focus:outline-none align-middle text-xl px-5 text-center border-2'
                    },
                    password: {
                        placeholder: 'Digite sua senha',
                        className: 'border-2 border-gray-300 rounded-lg p-2'
                    },
                    },
                }}
            >
          </Authenticator>
        </div>
      </div>
    )
}

export default Login


/*
  <div className='bg-gray-100 h-screen overflow-y-hidden'>
            <div className="grid gap-4 grid-cols-1 w-auto justify-center relative mt-32">
              <h1 className="font-black text-4xl md:text-5xl block text-center mt-0">Bem-vindo!</h1>
              <form className="flex flex-col items-center mt-4">
                <input 
                  type="text" 
                  className="block mt-2 rounded-full w-4/5 md:w-96 h-10 focus:drop-shadow-md focus:outline-none align-middle text-xl px-5 text-center border-2" 
                  placeholder='Telefone, e-mail ou nome de usuário'
                  autoFocus
                />
                <label className='block mt-2 w-4/5 md:w-96 h-10 rounded-full focus:drop-shadow-md focus:outline-none text-xl border-2 flex items-center px-4 bg-white'>
                  <input 
                    className='flex-grow h-full text-center focus:outline-none bg-transparent' 
                    placeholder="Senha" 
                    id='passwordInput' 
                  />
                </label>

                <button type="submit" className="block w-4/5 md:w-96 h-10 align-middle text-center mt-4 bg-blue-700 text-white rounded-full hover:bg-blue-500 duration-100">
                  Entrar
                </button>
                <div className="flex items-center">
                    <input type="checkbox" id="stayLoggedIn" />
                    <label htmlFor="stayLoggedIn" className="ml-2">Permanecer logado?</label>
                </div>
              </form>
              <button className="mt-0 text-blue-700 hover:underline">Esqueceu sua senha?</button>
              <button className="mt-0 text-blue-700 hover:underline">Não possui uma conta? Cadastre-se</button>
            </div>
        </div>
  */