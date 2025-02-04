import { useState, useEffect } from 'react'
import { useAuth } from '@/app/contexts/authContext'
import CloseIcon from '@mui/icons-material/Close'
import EmojiPicker from 'emoji-picker-react'
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions'
import GifPicker from 'gif-picker-react'
import GifBoxIcon from '@mui/icons-material/GifBox'
import SendIcon from '@mui/icons-material/Send'
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto'
import { useShowCommentsModal } from '@/app/contexts/showCommentsModal'

export const CommentComponent = ({ profilePic, name, text}) => {
    return (
        <div className={`flex items-start space-x-4 py-2 bg-white mt-[7px] border-gray-400 border-b-4`}>
            <img src={profilePic} alt="Profile" className="w-10 h-10 rounded-full ml-3" />
            <div>
                <h4 className="font-bold">{name}</h4>
                <p>{text}</p>
            </div>
        </div>
    )
}

export const PublishComment = () => {

    const { user } = useAuth()
    const [showEmojiPicker, setShowEmojiPicker] = useState(false)
    const [showGifPicker, setShowGifPicker] = useState(false)
    const [comment, setComment] = useState('')

    const handleEmojiClick = (emojiData, event) => {
        setComment(prevComment => prevComment + emojiData.emoji)
    }

    const handleInputChange = (e) => {
        setComment(e.target.value)
    }

    const toggleEmojiPicker = () => {
        setShowEmojiPicker(prevState => !prevState)
        setShowGifPicker(false)
    }

    const toggleGifPicker = () => {
        setShowGifPicker(prevState => !prevState)
        setShowEmojiPicker(false)
    }

    if (!user) return null
    return (
        <div 
            className='flex items-start space-x-3 py-2 md:rounded-b-xl bg-white border-gray-400 border-b-41'
        >
            <img src={user.profilePhotoUrl} alt="Profile" className="w-10 h-10 rounded-full ml-3" />
            <div className='w-full pr-3'>
                <h4 className="font-bold">{user.name}</h4>
                <div className="relative">
                    <input 
                        type="text" 
                        className="w-full border-2 border-gray-400 rounded-xl px-3 py-2 outline-none" 
                        placeholder={`Comente algo ${user.name?.split(' ')[0]}`} 
                        value={comment}
                        onChange={handleInputChange}
                        autoFocus
                    />
                    <div className='flex absolute inset-y-0 right-3 space-x-2'>
                        <button
                            type="button"
                            className="flex items-center"
                        >
                            <InsertPhotoIcon />    
                        </button>
                        <button
                            type="button"
                            className="flex items-center"
                            onClick={toggleEmojiPicker}
                        >
                            <EmojiEmotionsIcon />    
                        </button>
                        <button
                            type="button"
                            className="flex items-center"
                            onClick={toggleGifPicker}
                        >
                            <GifBoxIcon />    
                        </button>
                        <button
                            type="button"
                            className="flex items-center text-marrs"
                        >
                            <SendIcon />    
                        </button>
                    </div>
                    {showEmojiPicker ? (
                        <div 
                            className="absolute bottom-10 right-0 z-50"
                            onKeyDown={(e) => e.key === 'Escape' && setShowEmojiPicker(false)}
                            tabIndex='0'
                        >
                            <EmojiPicker 
                                onEmojiClick={handleEmojiClick} 
                                emojiStyle='native'
                                autoFocusSearch={false}
                            />
                        </div>
                    ) :
                    (
                        showGifPicker && (
                            <div 
                                className="absolute bottom-10 right-0 z-50"
                                onKeyDown={(e) => e.key === 'Escape' && setShowGifPicker(false)}
                                tabIndex='0'
                            >
                                <GifPicker 
                                    tenorApiKey={'AIzaSyDjT1GCe0NJVETUt2AL9hadCWHymi5Z9Uw'} 
                                    country='BR'
                                    locale='pt_BR'
                                />
                            </div>
                    )
                    )}
                </div>
            </div>
        </div>
    )
}

const CommentsModal = ({post}) => {
    const { setShowCommentsModal, closeCommentsModal, showCommentsModal } = useShowCommentsModal()
    const [showSkeleton, setShowSkeleton] = useState(true)
    const [fadeOut, setFadeOut] = useState(false)

    const handleClose = () => {
        setFadeOut(true)
        setTimeout(() => {
            setShowCommentsModal(false)
            setFadeOut(false)
        }, 1000)
    }

    useEffect(() => {
        if (showCommentsModal) {
            setShowSkeleton(true)
            setTimeout(() => {
                setShowSkeleton(false)
            }, 1250)
        }
    }, [showCommentsModal])

    useEffect(() => {
        if (closeCommentsModal) {
            handleClose()
        }
    }, [closeCommentsModal])

    if (showSkeleton) {
        return <CommentsModalSkeleton />
    }

    return (
        <div 
            className={`w-screen fixed inset-0 flex content-center items-center justify-center z-50 transition-opacity duration-300 h-full md:py-7 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}
            onKeyDown={(e) => {
                if (e.key === 'Escape') setShowCommentsModal(false)
                if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
                    e.preventDefault()
                    const scrollContainer = document.querySelector('.scroll-container')
                    if (scrollContainer) {
                        scrollContainer.scrollBy({
                            top: e.key === 'ArrowDown' ? 150 : -150, // Increased scroll speed
                            behavior: 'smooth'
                        })
                    }
                }
            }}
            tabIndex='2'
        >
            <div 
                className="grid content-center md:my-6 rounded-xl z-50 w-full md:w-[768px] h-full"
                tabIndex="1"
            >
                <div 
                    className='w-full md:w-[768px] flex justify-between border-b-4 border-gray-400 bg-white mb-0 pt-2 pr-3 pl-3 pb-1 align-middle z-50 md:rounded-t-xl'
                    onClick={(e) => e.stopPropagation()}
                >
                    <h2 className="text-xl font-bold h-7 w-full ml-7 text-center">Comentários</h2>
                    <button 
                        className='flex justify-center align-middle text-black w-7 h-7 rounded-full hover:bg-gray-200'
                        onClick={handleClose}
                    >
                        <CloseIcon className='mx-auto my-auto' />
                    </button>
                </div>
                <div 
                    className="flex-grow mt-[7px] mb-[7px] overflow-y-auto scroll-container"
                    onClick={(e) => e.stopPropagation()}
                >
                    {post}
                    <CommentComponent />
                </div>
                <div 
                    className='w-full md:w-[768px] rounded-b-xl border-gray-400 md:border-b-4'
                    onClick={(e) => e.stopPropagation()}
                >
                    <PublishComment />
                </div>
            </div>
        </div>
    )
}

const CommentsModalSkeleton = () => {
    return (
        <div className="fixed inset-0 flex content-center items-center justify-center z-50 h-full md:py-7 animate-pulse">
            <div className="grid content-center md:my-6 rounded-xl z-50 w-full md:w-[768px] h-full">
                <div className='w-full md:w-[768px] flex justify-end border-b-4 border-gray-400 bg-white mb-0 pt-2 pr-3 pl-3 pb-1 align-middle z-50 md:rounded-t-xl'>
                    <div className='flex justify-center align-middle text-black w-7 h-7 rounded-full bg-gray-300'></div>
                </div>
                <div className="flex-grow mt-[7px] mb-[7px] overflow-y-auto scroll-container">
                    <div className="space-y-4">
                        {[...Array(5)].map((_, index) => (
                            <div key={index} className="flex items-start space-x-4 py-2 bg-white mt-[7px] border-gray-400 border-b-4">
                                <div className="w-10 h-10 rounded-full bg-gray-300 ml-3"></div>
                                <div className="flex-1 space-y-2">
                                    <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                                    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='w-full md:w-[768px] rounded-b-xl border-gray-400 md:border-b-4'>
                    <div className="flex items-start space-x-3 py-2 bg-white rounded-b-xl">
                        <div className="w-10 h-10 rounded-full bg-gray-300 ml-3"></div>
                        <div className='w-full pr-3'>
                            <div className="h-4 bg-gray-300 rounded w-1/4 mb-2"></div>
                            <div className="relative">
                                <div className="w-full border-2 border-gray-400 rounded-xl px-3 py-2 bg-gray-300"></div>
                                <div className='flex absolute inset-y-0 right-3 space-x-2'></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CommentsModal