'use client'
import './globals.css'
import Publish from './components/publish'
import Navbar from './components/navbar'
import Post from './components/post'
import { useState } from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import LogoutIcon from '@mui/icons-material/Logout'
import SettingsIcon from '@mui/icons-material/Settings'
import QuestionMarkIcon from '@mui/icons-material/QuestionMark'
import DarkModeIcon from '@mui/icons-material/DarkMode'

const Feed = () => {

    const [isClickedTopProfile, setIsCLickedTopProfile] = useState(false)
    const handleProfileTrigger = (isProfileClicked) => {
        if(isProfileClicked){
            setIsCLickedTopProfile(!isClickedTopProfile)
        }
    }

    const [isHoveredProfile, setIsHoveredProfile] = useState(false)
    const handleEventTrigger = (isHoverProfile) => {
        if(isHoverProfile){
            setIsHoveredProfile(true)
        }else{
            setIsHoveredProfile(false)
        }
    }
    const handleMouseOut = () => {
        setIsHoveredProfile(false)
    }
    return (
            <div className='bg-gray-100 h-full'>
                <Navbar onProfileTrigger={handleProfileTrigger}/>
                {isHoveredProfile && (
                    <div
                        onMouseOver={handleEventTrigger}
                        onMouseOut={handleMouseOut}
                        className='mt-44 fixed bg-white h-60 w-96 z-40 ml-64 rounded-xl drop-shadow-lg'
                    >
                        Thiago Jorge
                    </div>
                )}
                {isClickedTopProfile && (
                    <div className='bg-white w-60 h-auto fixed z-50 right-5 rounded-b-lg drop-shadow-lg mt-14'>
                        <button className='flex justify-start items-center w-full h-20 hover:bg-gray-100 p-3 font-bold'>
                            <AccountCircleIcon className='text-black w-11 h-11 hover:cursor-pointer mr-3' />
                            Thiago Jorge
                        </button>
                        <button className='flex justify-start items-center w-full h-14 hover:bg-gray-100 p-3 font-bold'>
                            <div className='flex justify-center bg-gray-200 rounded-full w-11 h-11 mr-2 hover:cursor-pointer'>
                                <SettingsIcon className='text-black mx-auto my-auto'/>
                            </div>
                            Configurações
                        </button>
                        <button className='flex justify-start items-center w-full h-14 hover:bg-gray-100 p-3 font-bold'>
                            <div className='flex justify-center bg-gray-200 rounded-full w-11 h-11 mr-2 hover:cursor-pointer'>
                                <QuestionMarkIcon className='text-black mx-auto my-auto'/>
                            </div>
                            Ajuda
                        </button>
                        <button className='flex justify-start items-center w-full h-14 hover:bg-gray-100 p-3 font-bold'>
                            <div className='flex justify-center bg-gray-200 rounded-full w-11 h-11 mr-2 hover:cursor-pointer'>
                                <DarkModeIcon className='text-black mx-auto my-auto'/>
                            </div>
                            Modo escuro
                        </button>
                        <button className='flex justify-start items-center w-full h-14 hover:bg-gray-100 p-3 font-bold'>
                            <div className='flex justify-center bg-gray-200 rounded-full w-11 h-11 mr-2 hover:cursor-pointer'>
                                <LogoutIcon className='text-black mx-auto my-auto'/>
                            </div>
                            Sair
                        </button>
                    </div>
                )}
                <div className='pt-20'>
                    <Publish />
                    <Post onEventTrigger={handleEventTrigger}/>
                    <Post onEventTrigger={handleEventTrigger}/>
                    <Post onEventTrigger={handleEventTrigger}/>
                    <Post onEventTrigger={handleEventTrigger}/>
                    <Post onEventTrigger={handleEventTrigger}/>
                    <Post onEventTrigger={handleEventTrigger}/>
                    <Post onEventTrigger={handleEventTrigger}/>
                    <Post onEventTrigger={handleEventTrigger}/>
                    <Post onEventTrigger={handleEventTrigger}/>
                    <Post onEventTrigger={handleEventTrigger}/>
                    <Post onEventTrigger={handleEventTrigger}/>
                </div>
                {/* Back to top button in progress */}
                <button className='w-7 h-7 bg-black relative'></button>
            </div>
    )
}

export default Feed