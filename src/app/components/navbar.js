'use client'

import '@/globals.css'
import { useRouter } from 'next/navigation'
import Search from './subcomponents/search.js'
import ChatIcon from '@mui/icons-material/Chat'
import NotificationsIcon from '@mui/icons-material/Notifications'
import { useAuth } from '@/app/contexts/authContext'
import { Suspense } from 'react'

const Icon = ({MuiIcon}) => {
    const iconStyle = "text-black mx-auto my-auto"
    return(
        <div className="flex justify-center bg-gray-200 rounded-full w-11 h-11 mr-2 hover:cursor-pointer hover:bg-gray-300">
            <MuiIcon className={iconStyle} />
        </div>
    )
}

const Navbar = ({ onProfileTrigger }) => {

    const router = useRouter()

    const handleClickProfile = () => {
        onProfileTrigger(true)
    }

    const { user, loading } = useAuth()

    const cachedUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

    return (
        <div className="z-40 px-3 items-center justify-between flex fixed bg-white/85 backdrop-blur-md drop-shadow-lg font-extrabold text-sm md:text-xl h-10 md:h-14 w-screen">
            <a href="/" className="text-black">
                [Social Posting]
            </a>          
            {user && <div className="rounded-full">
                <Search />
            </div>}

            {user ? 
                <div className="flex items-center">
                    <Icon MuiIcon={ChatIcon}/>
                    <Icon MuiIcon={NotificationsIcon}/>
                    <button 
                        className='rounded-full w-11 h-11 overflow-hidden hover:opacity-85'
                        onClick={handleClickProfile}
                    >
                        <img 
                            src={user?.profilePhotoUrl} 
                        />
                    </button>
                </div>
            : cachedUser ?
                <div className="flex items-center">
                    <Icon MuiIcon={ChatIcon}/>
                    <Icon MuiIcon={NotificationsIcon}/>
                    <button 
                        className='rounded-full w-11 h-11 overflow-hidden hover:opacity-85'
                        onClick={handleClickProfile}
                    >
                        <img 
                            src={cachedUser.profilePhotoUrl} 
                        />
                    </button>
                </div>
            :
                <a href="/login" className='flex items-center bg-marrs hover:bg-marrs/75 text-white w-auto px-3 py-1 h-auto rounded-lg'>
                    Login
                </a>
            }
        </div>
    )
}

const NavBarFallback = () => {
    return (
        <div className="z-40 px-3 items-center justify-between flex fixed bg-white drop-shadow-lg font-extrabold text-sm md:text-xl h-10 md:h-14 w-screen">
            <a href="/" className="text-black">
                [Social Posting]
            </a>          
            <div className="flex items-center">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
            </div>
        </div>
    )
}

const NavbarWithSuspense = (props) => (
    <Suspense fallback={<NavBarFallback />}>
        <Navbar {...props} />
    </Suspense>
)

export default NavbarWithSuspense