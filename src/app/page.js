'use client'
import './globals.css'
import Publish from './components/publish'
import Navbar from './components/navbar'
import Post from './components/post'
import { useState, useEffect } from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import LogoutIcon from '@mui/icons-material/Logout'
import SettingsIcon from '@mui/icons-material/Settings'
import QuestionMarkIcon from '@mui/icons-material/QuestionMark'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import { onAuthStateChanged } from "firebase/auth"
import { auth, db } from '@/firebaseconfig.js'
import { collection, query, where, getDocs } from "firebase/firestore"

const Feed = () => {
    const [posts, setPosts] = useState([])
    const [user, setUser] = useState('')

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
                            setDatabaseId(doc.id)
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

    useEffect(() => {
        const fetchPosts = async () => {
          try {
            const feedCollection = collection(db, "feed")
            const querySnapshot = await getDocs(feedCollection)
            const postsData = querySnapshot.docs.map((doc) => ({
              id: doc.id, 
              ...doc.data() 
            }))
            setPosts(postsData)
            console.log('postData: ', postsData)
          } catch (error) {
            console.error("Erro ao buscar os posts: ", error.message)
          }
        };
    
        fetchPosts()
      }, [])
      
    return (
            <div>
                <div className='bg-gray-100 w-full h-full z-0 fixed'></div>
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
                            {user.name}
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
                    {user && <Publish />}
                    {posts.map((post) => (
                        <Post onEventTrigger={handleEventTrigger} key={post.id} postData={post} />
                    ))}
                </div>
            </div>
    )
}

export default Feed