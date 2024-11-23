'use client'
import '../globals.css'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import { useRouter } from 'next/navigation'
import Search from '@subcomponents/search.js'
import ChatIcon from '@mui/icons-material/Chat'
import NotificationsIcon from '@mui/icons-material/Notifications'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'

const Navbar = ({ onProfileTrigger }) => {
    const router = useRouter()

    const goToFeed = () => {
        router.push('/')
    }

    const handleClickProfile = () => {
        onProfileTrigger(true)
    }

    return (
        <div className="z-40 px-3 items-center justify-between flex fixed bg-white drop-shadow-lg font-extrabold text-sm md:text-xl h-10 md:h-14 w-full">
            <button onClick={goToFeed} className="text-black">
                [Social Posting]
            </button>
            
            <div className="rounded-full">
                <Search />
            </div>

            <div className="flex items-center">
                <button className="rounded-full w-12 h-12 ml-44 hidden">
                    <DarkModeIcon className="text-black" />
                </button>
                
                <div className="flex justify-center bg-gray-200 rounded-full w-11 h-11 mr-2 hover:cursor-pointer hover:bg-gray-300">
                    <ChatIcon className="text-black mx-auto my-auto" />
                </div>
                
                <div className="flex justify-center bg-gray-200 rounded-full w-11 h-11 mr-2 hover:cursor-pointer hover:bg-gray-300">
                    <NotificationsIcon className="text-black mx-auto my-auto" />
                </div>
                
                <AccountCircleIcon
                    onClick={handleClickProfile}
                    className="text-black w-11 h-11 hover:cursor-pointer"
                />
            </div>
        </div>
    )
}

export default Navbar