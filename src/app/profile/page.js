'use client'
import '../globals.css'
import Navbar from '../components/navbar'
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera'
import Post from '../components/post'
import ChatIcon from '@mui/icons-material/Chat'
import '@aws-amplify/ui-react/styles.css'
import { Amplify } from 'aws-amplify'
import { withAuthenticator } from '@aws-amplify/ui-react'
import config from '../amplifyconfiguration.json'

Amplify.configure(config)

const ProfileImages = () => {
    return (
        <div className="relative w-full flex justify-center">
            <button className="w-3/4 bg-gradient-to-b from-blue-100 via-blue-200 to-blue-300 drop-shadow-lg rounded-b-2xl h-72 overflow-hidden flex justify-center items-center hover:opacity-85">
                <img 
                    src="capa.jpg" 
                    className="object-cover w-full h-full" 
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
                    />
                </button>
                <button className="absolute left-72 top-80 w-10 h-10 rounded-full z-10 border-4 border-white overflow-hidden bg-white">
                    <PhotoCameraIcon className="object-cover w-full h-full hover:opacity-85" />
                </button>
                <div className='absolute right-44 top-72 w-32 h-12 rounded-2xl bg-white'>
                    <button className="w-32 h-12 rounded-2xl z-10 bg-blue-500 text-white hover:opacity-85">
                        Conversar
                        <ChatIcon />
                    </button>
                </div>
            </div>
        </div>
    )
}

const Profile = ({ signOut, user }) => {
    return (
        <div>
            <main className='bg-gray-100 h-full'>
                <div className=''>
                    <Navbar signOut={signOut} />
                    <ProfileImages />
                    <h1 className='ml-80 mt-2 text-4xl font-bold'>Thiago Jorge</h1>
                    <p className='ml-80 mt-2 text-2xl font-bold'>Online</p>
                    <Post />
                    <Post />
                    <Post />
                    <Post />
                    <Post />
                    <Post />
                    <Post />
                </div>
            </main>
        </div>
    )
}

export default withAuthenticator(Profile)