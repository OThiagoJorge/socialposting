'use client'
import '../globals.css'
import dynamic from 'next/dynamic'
import Navbar from '../components/navbar'
import { useState, useEffect } from 'react'

// Importação dinâmica dos ícones
const PhotoCameraIcon = dynamic(() => import('@mui/icons-material/PhotoCamera'))
const ChatIcon = dynamic(() => import('@mui/icons-material/Chat'))
const AccountCircleIcon = dynamic(() => import('@mui/icons-material/AccountCircle'))
const LogoutIcon = dynamic(() => import('@mui/icons-material/Logout'))
const SettingsIcon = dynamic(() => import('@mui/icons-material/Settings'))
const QuestionMarkIcon = dynamic(() => import('@mui/icons-material/QuestionMark'))
const DarkModeIcon = dynamic(() => import('@mui/icons-material/DarkMode'))

const ProfileImages = ({ user }) => {
    if (!user) return <div>Carregando...</div>;
  
    return (
      <div className="relative w-full flex justify-center z-0">
        {/* Imagem de capa */}
        <button className="w-full md:mx-10 bg-gradient-to-b from-blue-100 via-blue-200 to-blue-300 drop-shadow-lg md:rounded-b-2xl h-48 md:h-72 overflow-hidden flex justify-center items-center hover:opacity-85">
          {user.wallpaperUrl ? (
            <img 
              src={user.wallpaperUrl} 
              className="object-cover w-full h-full" 
              alt="Background Image"
            />
          ) : (
            <div className="text-gray-500">Sem imagem de capa</div>
          )}
        </button>  
  
        {/* Imagem de perfil */}
          <button className="absolute mt-32 md:mt-56 w-32 h-32 rounded-full z-10 border-4 border-white overflow-hidden bg-white">
            {user.profilePhotoUrl ? (
              <img 
                src={user.profilePhotoUrl} 
                className="object-cover w-full h-full hover:opacity-85" 
                alt="Profile Image"
              />
            ) : (
              <div className="text-gray-500 flex justify-center items-center h-full">
                Sem foto de perfil
              </div>
            )}
          </button>
      </div>
    );
  };

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
        <div className='bg-gray-100 w-screen h-screen'>
            <div className='bg-gray-100 w-full h-full z-0 fixed'></div>
            <main className=''>
                <div className=''>
                    <Navbar onProfileTrigger={handleProfileTrigger} />
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
                    {hasWindow && isHovered && (
                        <div
                            onMouseOver={() => handleEventTrigger(true)}
                            onMouseOut={handleMouseOut}
                            className='mt-44 fixed bg-white h-60 w-96 z-40 ml-64 rounded-xl drop-shadow-lg'
                        >
                            {props.user.name}
                        </div>
                    )}
                      <ProfileImages user={props.user} />
                    <div className='relative grid grid-rows-2 align-middle content-center w-full h-auto mt-16'>
                      <div className='w-full h-full flex items-start justify-center'><h1 className='text-4xl font-bold'>{props.user.name}</h1></div>
                      <div className='w-full h-full flex items-start justify-center'><p className='text-2xl font-bold'>Online</p></div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Profile