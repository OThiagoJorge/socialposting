import '@/globals.css'
import { auth } from '@/firebaseconfig.js'
import { signOut } from "firebase/auth"
import LogoutIcon from '@mui/icons-material/Logout'
import SettingsIcon from '@mui/icons-material/Settings'
import QuestionMarkIcon from '@mui/icons-material/QuestionMark'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/app/contexts/authContext'
import { useShowCommentsModal } from '@/app/contexts/showCommentsModal'

const NavbarOption = ({ icon, label, onClick }) => {
    return (
        <button 
            className='flex justify-start items-center w-full h-14 hover:bg-gray-100 p-3 font-bold' 
            onClick={onClick}
        >
            <div className='flex justify-center bg-gray-200 rounded-full w-11 h-11 mr-2 hover:cursor-pointer'>
                {icon}
            </div>
            {label}
        </button>
    )
}

const NavbarOptions = () => {
    const { showCommentsModal } = useShowCommentsModal()
    const { user } = useAuth()

    const router = useRouter()

    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
                console.log('Usuário deslogado com sucesso!')
                localStorage.removeItem('user')
                location.reload()
            })
            .catch((error) => {
                console.error("Ocorreu um erro:", error.message)
            })
    }

    return (
        <div className='bg-white w-60 h-auto fixed z-40 right-5 rounded-b-lg drop-shadow-lg mt-14'>
            {showCommentsModal && (
                <div className='bg-black/65 backdrop-blur-sm w-full h-full z-50'></div>
            )}
            <button onClick={() => router.push(`/${user?.slug}`)} className='flex justify-start items-center w-full h-20 hover:bg-gray-100 p-3 font-bold'>
                <div 
                    className='rounded-full w-11 h-11 overflow-hidden mr-2'
                >
                    <img 
                        src={user?.profilePhotoUrl} 
                        alt="Profile"
                    />
                </div>
                {user?.name}
            </button>
            <NavbarOption 
                icon={<SettingsIcon className='text-black mx-auto my-auto'/>} 
                label='Configurações' 
            />
            <NavbarOption 
                icon={<QuestionMarkIcon className='text-black mx-auto my-auto'/>} 
                label='Ajuda' 
            />
            <NavbarOption 
                icon={<DarkModeIcon className='text-black mx-auto my-auto'/>} 
                label='Modo Escuro' 
            />
            <NavbarOption 
                icon={<LogoutIcon className='text-black mx-auto my-auto'/>} 
                label='Sair' 
                onClick={handleSignOut} 
            />
        </div>
    )
}

export default NavbarOptions