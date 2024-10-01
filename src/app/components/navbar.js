'use client'
import '../globals.css'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import SearchIcon from '@mui/icons-material/Search'
import { useRouter } from 'next/navigation'
const Navbar = () => {
    const router = useRouter()
    const handleClick = () => {
        return router.push('/profile')
    }
    const goToFeed = () => {
        return router.push('/')
    }
    const goToProfile = () => {
        return router.push('/profile')
    }

    return (
        <div className='z-50 px-3 items-center justify-between flex fixed bg-gradient-to-b from-blue-500 via-blue-600 to-blue-700 drop-shadow-2xl text-white font-extrabold text-xl h-14 w-full'>
            <button onClick={goToFeed} className=''>[Social Posting]</button>
            <div className='rounded-full'>
            <label className='mt-2 w-4/5 md:w-96 h-10 rounded-full focus:drop-shadow-md focus:outline-none text-xl border-2 px-4 bg-white'>
                  <input 
                    className='flex-grow h-full text-center focus:outline-none bg-transparent' 
                    placeholder="Pesquisar..." 
                    type='text'
                  />
                  <SearchIcon className='text-black'/>
            </label>
            </div> 
            <div className='flex items-center'>
                <button className='rounded-full w-12 h-12 ml-3'>
                    <DarkModeIcon />
                </button>
                {/*<button onClick={handleClick} className='rounded-full w-12 h-12 overflow-hidden'>
                    <img src='perfil.jpg' alt="Profile" className='object-cover w-full h-full' />
                </button>*/}
                <div className='w-32 h-12 rounded-2xl bg-white'>
                    <button onClick={goToProfile} className="w-32 h-12 rounded-2xl z-10 bg-gradient-to-b from-blue-400 via-blue-500 to-blue-600 text-white hover:opacity-85">
                        Login
                    </button>
                </div>
            </div>
        </div>)
    }
export default Navbar