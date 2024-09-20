'use client'
import '../globals.css'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import CommentIcon from '@mui/icons-material/Comment'
import RepeatIcon from '@mui/icons-material/Repeat'
import ShareIcon from '@mui/icons-material/Share'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { useState } from 'react'

const Post = () => {
    const [showPassword, setShowPassword] = useState(false)

    const togglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword)
      }

    return (
        <div className='relative w-1/2 mx-auto bg-gradient-to-b from-blue-100 via-blue-200 to-blue-300 drop-shadow-lg rounded-3xl mt-10 h-96 overflow-hidden'>
            <div className='flex items-center p-4'>
                <button className='rounded-full border-black border-2 w-12 h-12 overflow-hidden'>
                    <img src='/profile.jpg' alt="Profile" className='object-cover w-full h-full' />
                </button>
                <div className='flex flex-col'>
                    <a className='ml-3 cursor-pointer'>
                        <h1 className='font-extrabold text-lg'>Fulano de tal</h1>
                    </a>
                    <p className='ml-3 text-gray-700'>Há 2 horas</p>
                </div>
            </div>
            <div className='mx-5 h-auto'>
                <img src='meme.png' alt='Post' className='h-auto w-auto object-cover rounded-3xl' />
            </div>
            <div className='grid grid-cols-4 content-start bg-gradient-to-b from-blue-500 via-blue-600 to-blue-700 w-full mb-0 h-14 mt-0'>
                <div className='grid grid-rows-2 basis-1/4 items-start mt-1 justify-center text-white text-sm'>
                    <button className='row-span-1 flex basis-1/4 items-start mt-1 justify-center text-white text-sm'>
                        <p className='transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-white hover:text-black rounded-md duration-300'>Curtidas</p>
                    </button>
                    <button className='row-span-2 flex basis-1/4 items-start mt-1 justify-center text-white text-sm'>
                    {showPassword ? (
                        <FavoriteIcon className='cursor-pointer text-base text-red-600' onClick={togglePasswordVisibility} />
                    ) : (
                        <FavoriteBorderIcon className='cursor-pointer text-base' onClick={togglePasswordVisibility} />
                    )}
                    </button>
                </div>
                <div className='grid grid-rows-2 basis-1/4 items-start mt-1 justify-center text-white text-sm'>
                    <button className='row-span-1 flex basis-1/4 items-start mt-1 justify-center text-white text-sm'>
                        <p className='transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-white hover:text-black rounded-md duration-300'>Comentários</p>
                    </button>
                    <button className='row-span-2 flex basis-1/4 items-start mt-1 justify-center text-white text-sm'>
                        <CommentIcon className='text-base'/>
                    </button>
                </div><div className='grid grid-rows-2 basis-1/4 items-start mt-1 justify-center text-white text-sm'>
                    <button className='row-span-1 flex basis-1/4 items-start mt-1 justify-center text-white text-sm'>
                        <p className='transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-white hover:text-black rounded-md duration-300'>Reposts</p>
                    </button>
                    <button className='row-span-2 flex basis-1/4 items-start mt-1 justify-center text-white text-sm'>
                        <RepeatIcon className='text-base'/>
                    </button>
                </div><div className='grid grid-rows-2 basis-1/4 items-start mt-1 justify-center text-white text-sm'>
                    <button className='row-span-1 flex basis-1/4 items-start mt-1 justify-center text-white text-sm'>
                        <p className='transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-white hover:text-black rounded-md duration-300'>Compartilhar</p>
                    </button>
                    <button className='row-span-2 flex basis-1/4 items-start mt-1 justify-center text-white text-sm'>
                        <ShareIcon className='text-base'/>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Post