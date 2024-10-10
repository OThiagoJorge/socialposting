'use client'
import '../globals.css'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import { useRouter } from 'next/navigation'
import Search from './subcomponents/search'
import Login from './subcomponents/login'
import Logout from './subcomponents/logout'

{/* Prop received from profile, returning true or false */}
const Navbar = ({signOut}) => {
    const router = useRouter()
    const goToFeed = () => {
        return router.push('/')
    }
    return (
        <div className='z-50 px-3 items-center justify-between flex fixed bg-white drop-shadow-lg text-white font-extrabold text-sm md:text-xl h-10 md:h-14 w-full'>
            <button 
                onClick={goToFeed}
                className='text-black'
            >
                [Social Posting]
            </button>
            <div className='rounded-full'>
            <Search/>
            </div> 
            <div className='flex items-center'>
                <button className='rounded-full w-12 h-12 ml-44 hidden'>
                    <DarkModeIcon className='text-black'/>
                </button>
                {/* Button that redirect to profile page temporally disabled */}
                {/*<button onClick={goToProfile} className='rounded-full w-12 h-12 overflow-hidden'>
                    <img src='perfil.jpg' alt="Profile" className='object-cover w-full h-full' />
                </button>*/}
                {!signOut ? 
                    <Login />
                :
                    <Logout out={signOut} />
                }
            </div>
        </div>)
    }
export default Navbar