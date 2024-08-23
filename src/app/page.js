'use client'
import './globals.css'
import Logo from './components/logo'
import { useRouter } from 'next/navigation'
const InsertName = () => {
    const router = useRouter()
    const handleSubmit = () => {
      router.push('/insert-photo')
    }
    return (
      <div className='bg-gray-300 h-screen overflow-y-hidden'>
        <Logo />
          <div className="grid gap-4 grid-cols-1 w-auto justify-center relative mt-32">
            <h1 className="font-black text-4xl md:text-5xl block text-center mt-0">Bem-vindo!</h1>
            <form className="flex flex-col items-center mt-4">
              <label className="block text-2xl font-extrabold">Insira seu nome:</label>
              <input type="text" className="block mt-2 rounded-full w-4/5 md:w-96 h-10 focus:drop-shadow-md focus:outline-none align-middle text-2xl px-5 text-center" />
              <button onClick={handleSubmit} type="submit" className="block mt-4 bg-blue-700 text-white rounded-full pt-3 px-10 py-3 hover:bg-blue-500 duration-100">Próximo</button>
            </form>
          </div>
        </div>
    )
}
export default InsertName