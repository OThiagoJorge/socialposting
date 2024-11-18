'use client'
import '../globals.css'
import dynamic from 'next/dynamic'
import Navbar from '../components/navbar'
import Post from '../components/post'
import { useState, useEffect } from 'react'

// Importação dinâmica dos ícones
const PhotoCameraIcon = dynamic(() => import('@mui/icons-material/PhotoCamera'))
const ChatIcon = dynamic(() => import('@mui/icons-material/Chat'))
const AccountCircleIcon = dynamic(() => import('@mui/icons-material/AccountCircle'))
const LogoutIcon = dynamic(() => import('@mui/icons-material/Logout'))
const SettingsIcon = dynamic(() => import('@mui/icons-material/Settings'))
const QuestionMarkIcon = dynamic(() => import('@mui/icons-material/QuestionMark'))
const DarkModeIcon = dynamic(() => import('@mui/icons-material/DarkMode'))

const ProfileImages = () => {
    return (
        <div className="relative w-full flex justify-center">
            <button className="w-3/4 bg-gradient-to-b from-blue-100 via-blue-200 to-blue-300 drop-shadow-lg rounded-b-2xl h-72 overflow-hidden flex justify-center items-center hover:opacity-85">
                <img 
                    src="capa.jpg" 
                    className="object-cover w-full h-full" 
                    alt="Background Image"
                />
            </button>
            <button className="absolute top-60 right-40 w-10 h-10 rounded-full z-10 border-4 border-white overflow-hidden bg-white">
                <PhotoCameraIcon className="object-cover w-full h-full hover:opacity-85" />
            </button>
            <div className="flex justify-center">
                <button className="absolute left-48 top-60 w-32 h-32 rounded-full z-10 border-4 border-white overflow-hidden bg-white">
                    <img 
                        src="perfil.jpg" 
                        className="object-cover w-full h-full hover:opacity-85" 
                        alt="Profile Image"
                    />
                </button>
                <button className="absolute left-72 top-80 w-10 h-10 rounded-full z-10 border-4 border-white overflow-hidden bg-white">
                    <PhotoCameraIcon className="object-cover w-full h-full hover:opacity-85" />
                </button>
                <div className='absolute right-44 top-72 w-32 h-12 rounded-xl bg-white'>
                    <button className="w-32 h-12 rounded-xl z-10 bg-blue-500 text-white hover:opacity-85">
                        Conversar
                        <ChatIcon />
                    </button>
                </div>
            </div>
        </div>
    )
}

const Profile = (props) => {
    const [isClickedTopProfile, setIsClickedTopProfile] = useState(false)
    const [isHovered, setIsHovered] = useState(false)
    const [hasWindow, setHasWindow] = useState(false)

    // Confirma que o componente está rodando no cliente
    useEffect(() => {
        if (typeof window !== 'undefined') setHasWindow(true)
    }, [])

    const handleProfileTrigger = (isProfileClicked) => {
        if (isProfileClicked) {
            setIsClickedTopProfile(!isClickedTopProfile)
        }
    }

    const handleEventTrigger = (isHoverProfile) => {
        setIsHovered(isHoverProfile)
    }

    const handleMouseOut = () => setIsHovered(false)

    return (
        <div>
            <main className='bg-gray-100 h-full'>
                <div className=''>
                    <Navbar onProfileTrigger={handleProfileTrigger} />
                    {hasWindow && isHovered && (
                        <div
                            onMouseOver={() => handleEventTrigger(true)}
                            onMouseOut={handleMouseOut}
                            className='mt-44 fixed bg-white h-60 w-96 z-40 ml-64 rounded-xl drop-shadow-lg'
                        >
                            {props.name}
                        </div>
                    )}
                    <ProfileImages />
                    <h1 className='ml-80 mt-2 text-4xl font-bold'>{props.name}</h1>
                    <p className='ml-80 mt-2 text-2xl font-bold'>Online</p>
                    {[...Array(12)].map((_, index) => (
                        <Post key={index} onEventTrigger={handleEventTrigger} nameup={props.name} />
                    ))}
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
                </div>
            </main>
        </div>
    )
}

export default Profile