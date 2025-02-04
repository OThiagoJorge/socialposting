'use client'

import '@/globals.css'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'

const PostAuthor = ({ onEventTrigger, name, photoUrl, postData }) => {
    let hoverTimeout

    const handleMouseOver = () => {
        hoverTimeout = setTimeout(() => onEventTrigger(true), 1000);
    }

    const handleMouseOut = () => {
        clearTimeout(hoverTimeout)
        onEventTrigger(false)
    }
    dayjs.locale('pt-br') 

    const getTimeElapsed = (timestamp) => {
        const now = Math.floor(Date.now() / 1000)
        const postDate = timestamp.seconds
        const diffInSeconds = now - postDate

        if (diffInSeconds < 60) return `Há ${diffInSeconds} segundo${diffInSeconds !== 1 ? 's' : ''}`
        const diffInMinutes = Math.floor(diffInSeconds / 60)
        if (diffInMinutes < 60) return `Há ${diffInMinutes} minuto${diffInMinutes !== 1 ? 's' : ''}`
        const diffInHours = Math.floor(diffInMinutes / 60)
        if (diffInHours < 24) return `Há ${diffInHours} hora${diffInHours !== 1 ? 's' : ''}`
        const diffInDays = Math.floor(diffInHours / 24)
        if (diffInDays === 1) return `Ontem às ${dayjs(postDate * 1000).format('HH:mm')}`
        if (diffInDays < 7) return `Há ${diffInDays} dia${diffInDays !== 1 ? 's' : ''}`

        const postDateObj = dayjs(postDate * 1000)
        const currentYear = dayjs().year()
        const postYear = postDateObj.year()
        const dateFormat = postYear === currentYear 
            ? 'D [de] MMMM [às] HH:mm' 
            : 'D [de] MMMM [de] YYYY [às] HH:mm'

        return postDateObj.format(dateFormat)
    }

    return (
        <div className='flex items-center px-4 pt-4 pb-2'>
            <button 
                className='rounded-full w-12 h-12 overflow-hidden hover:opacity-85'
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
            >
                <img 
                    src={photoUrl} 
                    alt="Profile" 
                    className='object-cover w-full h-full'
                />
            </button>
            <div className='grid grid-rows-2'>
                <a className='ml-3 cursor-pointer'>
                    <h1 
                        className='font-extrabold text-lg hover:underline'
                        onMouseOver={handleMouseOver}
                        onMouseOut={handleMouseOut}
                    >
                        {name}
                    </h1>
                </a>
                <p className='ml-3 text-gray-700 hover:underline hover:cursor-pointer'>
                    {getTimeElapsed(postData.timestamp)}
                </p>
            </div>
        </div>
    )
}

export default PostAuthor
