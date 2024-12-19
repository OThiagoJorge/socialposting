'use client'
import '../globals.css'
import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'

const FavoriteBorderIcon = dynamic(() => import('@mui/icons-material/FavoriteBorder'))
const CommentIcon = dynamic(() => import('@mui/icons-material/Comment'))
const RepeatIcon = dynamic(() => import('@mui/icons-material/Repeat'))
const ShareIcon = dynamic(() => import('@mui/icons-material/Share'))
const FavoriteIcon = dynamic(() => import('@mui/icons-material/Favorite'))
const MoreHorizIcon = dynamic(() => import('@mui/icons-material/MoreHoriz'))

const PostAuthor = ({ onEventTrigger, name, photoUrl }) => {
    const handleMouseOver = () => onEventTrigger(true)
    const handleMouseOut = () => onEventTrigger(false)

    return (
        <div className='flex items-center p-4'>
            <button className='rounded-full w-12 h-12 overflow-hidden'>
                <img 
                    src={photoUrl} 
                    alt="Profile" 
                    className='object-cover w-full h-full'
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                />
            </button>
            <div className='flex flex-col'>
                <a className='ml-3 cursor-pointer'>
                    <h1 
                        className='font-extrabold text-lg hover:underline'
                        onMouseOver={handleMouseOver}
                        onMouseOut={handleMouseOut}
                    >
                        {name}
                    </h1>
                </a>
                <p className='ml-3 text-gray-700 hover:underline hover:cursor-pointer'>Há 2 horas</p>
            </div>
        </div>
    )
}

const PostMedia = ({mediaUrl}) => {
    const [hasWindow, setHasWindow] = useState(false)

    useEffect(() => {
        if (typeof window !== 'undefined') setHasWindow(true)
    }, [])

    return hasWindow ? (
        <div className='h-auto max-h-screen border-b-4 border-gray-300'>
            <img 
                src={mediaUrl} 
                alt='Post' 
                className='h-auto w-full object-cover mx-auto' 
            />
        </div>
    ) : null
}

const Like = () => {
    const [heartRed, setHeart] = useState(false)

    const toggleHeartChange = () => setHeart(prev => !prev)

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
                ) : (
                    <FavoriteBorderIcon 
                        className='cursor-pointer text-base' 
                        onClick={toggleHeartChange} 
                    />
                )}
            </button>
        </div>
    )
}

const PostAction = ({ label, icon }) => {
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

const Post = ({ onEventTrigger, postData }) => {
    const handleEventTrigger = (isHoverProfile) => onEventTrigger(isHoverProfile)

    return (
        <div className='relative w-full md:w-[512px] mx-auto bg-white md:rounded-2xl mt-10 h-auto overflow-hidden border-b-4 border-gray-300'>
            <div className='flex justify-between'>
                <PostAuthor onEventTrigger={handleEventTrigger} name={postData.name} photoUrl={postData.profilePhoto}/>
                <button className='flex justify-center align-middle text-black w-7 h-7 rounded-full mr-3 mt-3 hover:bg-gray-200'>
                    <MoreHorizIcon className='mx-auto my-auto' />
                </button>
            </div>
            <PostMedia mediaUrl={postData.file} />
            <div className='grid grid-cols-4 content-start bg-white w-full mb-0 h-16 border-t-8 border-gray-100'>
                <Like />
                <PostAction label='Comentários' icon={<CommentIcon className='text-base' />} />
                <PostAction label='Reposts' icon={<RepeatIcon className='text-base' />} />
                <PostAction label='Compartilhar' icon={<ShareIcon className='text-base' />} />
            </div>
        </div>
    )
}

export default Post