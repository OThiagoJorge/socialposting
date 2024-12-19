'use client'
import '../globals.css'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import { useRouter } from 'next/navigation'
import Search from './subcomponents/search.js'
import ChatIcon from '@mui/icons-material/Chat'
import NotificationsIcon from '@mui/icons-material/Notifications'
import { onAuthStateChanged } from "firebase/auth"
import { useState, useEffect } from 'react'
import { collection, query, where, getDocs } from "firebase/firestore"
import { auth, db } from '@/firebaseconfig.js'

const Navbar = ({ onProfileTrigger }) => {
    const [user, setUser] = useState('')

    const router = useRouter()

    const goToFeed = () => {
        router.push('/')
    }

    const handleClickProfile = () => {
        onProfileTrigger(true)
    }

    useEffect(() => {
            const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
                if (currentUser) {
                    console.log("Usuário logado:", currentUser.uid);
                    const uid = currentUser.uid;
                    const q = query(collection(db, "users"), where("uid", "==", uid));
    
                    try {
                        const querySnapshot = await getDocs(q);
                        querySnapshot.forEach((doc) => {
                            console.log(doc.id, " => ", doc.data());
                            setUser(doc.data()); // Atualiza o estado com os dados do Firestore
                        });
                    } catch (error) {
                        console.error("Erro ao buscar documentos:", error);
                    }
                } else {
                    console.log("Nenhum usuário logado");
                    setUser(null);
                }
            });
    
            return () => unsubscribe(); // Remove o listener ao desmontar o componente
        }, [])

    return (
        <div className="z-40 px-3 items-center justify-between flex fixed bg-white drop-shadow-lg font-extrabold text-sm md:text-xl h-10 md:h-14 w-screen">
            <button onClick={goToFeed} className="text-black">
                [Social Posting]
            </button>
            
            {user &&<div className="rounded-full">
                <Search />
            </div>}

            {user && <div className="flex items-center">
                <button className="rounded-full w-12 h-12 ml-44 hidden">
                    <DarkModeIcon className="text-black" />
                </button>
                
                <div className="flex justify-center bg-gray-200 rounded-full w-11 h-11 mr-2 hover:cursor-pointer hover:bg-gray-300">
                    <ChatIcon className="text-black mx-auto my-auto" />
                </div>
                
                <div className="flex justify-center bg-gray-200 rounded-full w-11 h-11 mr-2 hover:cursor-pointer hover:bg-gray-300">
                    <NotificationsIcon className="text-black mx-auto my-auto" />
                </div>
                <button 
                    className='rounded-full w-11 h-11 overflow-hidden'
                    onClick={handleClickProfile}
                >
                    <img 
                        src={user?.profilePhotoUrl} 
                        alt="Profile"
                    />
                </button>
            </div>}
        </div>
    )
}

export default Navbar