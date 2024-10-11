'use client'
import '../globals.css'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import CommentIcon from '@mui/icons-material/Comment'
import RepeatIcon from '@mui/icons-material/Repeat'
import ShareIcon from '@mui/icons-material/Share'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { useState } from 'react'

const PostAuthor = () => {
    return (
        <div className='flex items-center p-4'>
            <button className='rounded-full w-12 h-12 overflow-hidden'>
                <img 
                    src='perfil.jpg' 
                    alt="Profile" 
                    className='object-cover w-full h-full' 
                />
            </button>
            <div className='flex flex-col'>
                <a className='ml-3 cursor-pointer'>
                    <h1 className='font-extrabold text-lg'>Thiago Jorge</h1>
                </a>
                <p className='ml-3 text-gray-700'>Há 2 horas</p>
            </div>
        </div>
    )
}

const PostMedia = () => {
    return (
        <div className=' h-auto border-b-4 border-gray-300 pb-2'>
            <img 
                src='meme.png' 
                alt='Post' 
                className='h-auto w-11/12 object-cover rounded-3xl mx-auto' 
            />
        </div>
    )
}

const Like = () => {
    const [heartRed, setHeart] = useState(false)

    const toggleHeartChange = () => {
        setHeart(() => !heartRed)
    }

    return (
        <div className='grid grid-rows-2 basis-1/4 items-start mt-1 justify-center text-black text-sm'>
            <button className='row-span-1 flex basis-1/4 items-start mt-1 justify-center text-black text-sm'>
                <p className='transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-white hover:text-black rounded-md duration-300'>Curtidas</p>
            </button>
            <button className='row-span-2 flex basis-1/4 items-start mt-1 justify-center text-black text-sm'>
            {heartRed ? (
                <FavoriteIcon 
                    className='cursor-pointer text-base text-red-600' 
                    onClick={toggleHeartChange} 
                />
            ) 
                : 
            (
                <FavoriteBorderIcon 
                    className='cursor-pointer text-base' 
                    onClick={toggleHeartChange} 
                />
            )}
            </button>
        </div>
    )
}

const PostAction = ({label, icon}) => {
    return (
        <div className='grid grid-rows-2 basis-1/4 items-start mt-1 justify-center text-black text-sm'>
            <button className='row-span-1 flex basis-1/4 items-start mt-1 justify-center text-black text-sm'>
                <p className='transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-white hover:text-black rounded-md duration-300'>{label}</p>
            </button>
            <button className='row-span-2 flex basis-1/4 items-start mt-1 justify-center text-black text-sm'>
                {icon}
            </button>
        </div>
    )
}

const Post = () => {
    return (
        <div className='relative w-1/2 mx-auto bg-white rounded-3xl mt-10 h-96 overflow-hidden border-b-4 border-gray-300'>
            <PostAuthor />
            <PostMedia />
            <div className='grid grid-cols-4 content-start bg-white w-full mb-0 h-14 border-t-8 border-gray-100'>
                <Like />
                <PostAction label='Comentários' icon={<CommentIcon className='text-base'/>} />
                <PostAction label='Reposts' icon={<RepeatIcon className='text-base'/>} />
                <PostAction label='Compartilhar' icon={<ShareIcon className='text-base'/>} />
            </div>
        </div>
    )
}

export default Post