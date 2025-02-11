'use client'

import '@/globals.css'
import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'
import PostAuthor from './subcomponents/postauthor'
import { doc, updateDoc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '@/firebaseconfig.js'
import { useAuth } from '@/app/contexts/authContext'
import { useShowCommentsModal } from '@/app/contexts/showCommentsModal'


const FavoriteBorderIcon = dynamic(() => import('@mui/icons-material/FavoriteBorder'))
const CommentIcon = dynamic(() => import('@mui/icons-material/Comment'))
const RepeatIcon = dynamic(() => import('@mui/icons-material/Repeat'))
const ShareIcon = dynamic(() => import('@mui/icons-material/Share'))
const FavoriteIcon = dynamic(() => import('@mui/icons-material/Favorite'))
const MoreHorizIcon = dynamic(() => import('@mui/icons-material/MoreHoriz'))

const PostMedia = ({ mediaUrl, mediaType, postid }) => {
    const { setShowCommentsModal, setSelectedPostId } = useShowCommentsModal()
    const [hasWindow, setHasWindow] = useState(false)

    useEffect(() => {
        if (typeof window !== 'undefined') setHasWindow(true)
    }, [])

    if (!hasWindow || !mediaUrl) return null

    const isVideo = ['.mp4', '.avi', '.mov'].includes(mediaType)
    const isImage = ['.jpg', '.jpeg', '.png', '.gif'].includes(mediaType)

    return (
        <div 
            onClick={() => {
                setShowCommentsModal(true)
                setSelectedPostId(postid)
            }}
            className='h-full'
        >
            {isVideo && (
                <video 
                    src={mediaUrl} 
                    controls
                    tabIndex={0} 
                />
            )}
            {isImage && (
                <img 
                    src={mediaUrl}  
                    className='h-auto w-full object-cover mx-auto hover:cursor-pointer' 
                />
            )}
        </div>
    )
}

const Like = ({ postId }) => {
    const { showCommentsModal } = useShowCommentsModal()
    const { user } = useAuth()
    const [heartRed, setHeart] = useState(false)
    const [sumOfLikes, setSumOfLikes] = useState(0)

    const formatLikes = (likes) => {
        if (likes >= 1000000) {
            return (likes / 1000000).toFixed(1) + ' mi'
        } else if (likes >= 1000) {
            return (likes / 1000).toFixed(1) + ' mil'
        } else {
            return likes
        }
    }

    const handleLike = async () => {
        if (!user) {
            window.location.href = '/login'
            return
        }

        // Optimistically update the UI
        const newSumOfLikes = heartRed ? sumOfLikes - 1 : sumOfLikes + 1
        setSumOfLikes(newSumOfLikes)
        setHeart(!heartRed)

        try {
            const docRef = doc(db, `feed/${postId}/interations`, 'likes')
            const docSnap = await getDoc(docRef)
    
            if (docSnap.exists()) {
                const data = docSnap.data()
                const userLikes = data.userLikes || {}

                if (userLikes[user.uid]) {
                    // User already liked, so we remove the like
                    delete userLikes[user.uid]
                    await updateDoc(docRef, {
                        userLikes,
                        sumOfLikes: data.sumOfLikes - 1
                    })
                } else {
                    // User has not liked yet, so we add the like
                    userLikes[user.uid] = true
                    await updateDoc(docRef, {
                        userLikes,
                        sumOfLikes: data.sumOfLikes + 1
                    })
                }
            } else {
                // First like on the post
                const userLikes = {}
                userLikes[user.uid] = true
                await setDoc(docRef, {
                    userLikes,
                    sumOfLikes: 1
                })
            }
        } catch (error) {
            console.error("Erro ao curtir: ", error.message)
            // Revert the optimistic update in case of error
            setSumOfLikes(heartRed ? sumOfLikes + 1 : sumOfLikes - 1)
            setHeart(heartRed)
        }
    }

    useEffect(() => {
        const fetchLikes = async () => {
            try {
                const docRef = doc(db, `feed/${postId}/interations`, 'likes')
                const docSnap = await getDoc(docRef)
                if (docSnap.exists()) {
                    const data = docSnap.data()
                    setSumOfLikes(data.sumOfLikes || 0)
                    // Only set the heart state if a user is logged in
                    if (user && data.userLikes && data.userLikes[user.uid]) {
                        setHeart(true)
                    } else {
                        setHeart(false)
                    }
                }
            } catch (error) {
                console.error("Erro ao buscar curtidas: ", error.message)
            }
        }
        fetchLikes()
    }, [user, postId, showCommentsModal])

    const toggleHeartChange = () => setHeart(prev => !prev)

    return (
        <div className='flex flex-row items-center basis-1/4 mt-3 mb-2 justify-center text-black text-sm'>
            <button
                onClick={handleLike} 
                className='flex items-center justify-center text-black text-sm mr-1'
            >
                {heartRed ? (
                    <FavoriteIcon 
                        className='cursor-pointer text-red-600' 
                        onClick={toggleHeartChange} 
                    />
                ) : (
                    <FavoriteBorderIcon 
                        className='cursor-pointer hover:opacity-85' 
                        onClick={toggleHeartChange} 
                    />
                )}
            </button>
            {sumOfLikes > 0 && (
                <div className='hover:underline cursor-pointer'>{formatLikes(sumOfLikes)}</div>
            )}
        </div>
    )
}

const Comment = ({ icon, postid }) => {
    const { setShowCommentsModal, setSelectedPostId } = useShowCommentsModal()

    return (
        <div className='flex flex-row items-center basis-1/4 mt-3 mb-2 justify-center text-black text-sm'>
            <button 
                onClick={() => {
                    setShowCommentsModal(true)
                    setSelectedPostId(postid)
                }}
                className='flex items-center justify-center text-black text-sm mr-1 hover:opacity-85'
            >
                {icon}
            </button>
            <div className='hover:underline cursor-pointer'></div>
        </div>
    )
}
const Repost = ({ icon }) => {
    return (
        <div className='flex flex-row items-center basis-1/4 mt-3 mb-2 justify-center text-black text-sm'>
            <button className='flex items-center justify-center text-black text-sm mr-1 hover:opacity-85'>
                {icon}
            </button>
            <div className='hover:underline cursor-pointer'></div>
        </div>
    )
}
const Share = ({ icon }) => {
    return (
        <div className='flex flex-row items-center basis-1/4 mt-3 mb-2 justify-center text-black text-sm'>
            <button className='flex items-center justify-center text-black text-sm mr-1 hover:opacity-85'>
                {icon}
            </button>
            <div className='hover:underline cursor-pointer'></div>
        </div>
    )
}

const Post = ({ onEventTrigger, postData }) => {
    const { showCommentsModal } = useShowCommentsModal()

    console.log('postData: ', postData)
    const [textPart1, setTextPart1] = useState("")
    const [textPart2, setTextPart2] = useState("")
    const [showMore, setShowMore] = useState(false)

    useEffect(() => {
        if (postData.text.length > 500) {
            setTextPart1(postData.text.substring(0, 500))
            setTextPart2(postData.text.substring(500))
        } else {
            setTextPart1(postData.text)
            setTextPart2("")
        }
    }, [postData])

    const handleEventTrigger = (isHoverProfile) => onEventTrigger(isHoverProfile)
    const toggleShowMore = () => setShowMore(prev => !prev)

    return (
        <div className={`relative w-full ${showCommentsModal ? 'md:w-full rounded-none' : 'md:rounded-xl my-6'} md:w-[512px] mx-auto h-auto overflow-hidden border-b-4 border-gray-300`}>
            <div className={`bg-white ${showCommentsModal && postData.file ? '' : 'border-b-4 border-gray-300'}`}>
                <div className='flex justify-between'>
                    <PostAuthor 
                        onEventTrigger={handleEventTrigger} 
                        name={postData.name} 
                        photoUrl={postData.profilePhoto}
                        postData={postData}
                    />
                    <button className='flex justify-center align-middle text-black w-7 h-7 rounded-full mr-3 mt-3 hover:bg-gray-200'>
                        <MoreHorizIcon className='mx-auto my-auto' />
                    </button>
                </div>
                <p 
                    className='px-4 pb-4 text-justify' 
                    onClick={(e) => {
                        if (showMore && window.getSelection().toString() === '') {
                            toggleShowMore()
                        }
                    }}
                >
                    {textPart1}
                    {textPart2 && !showMore && (
                        <>
                            ...<p 
                                className='text-blue-500 hover:underline cursor-pointer inline'
                                onClick={toggleShowMore}
                            >
                                mostrar mais
                            </p>
                        </>
                    )}
                    {showMore && (
                        <>
                            {textPart2} <p 
                                className='text-blue-500 hover:underline cursor-pointer inline'
                                onClick={toggleShowMore}
                            >
                                mostrar menos
                            </p>
                        </>
                    )}
                </p>
                {postData.file && (<PostMedia 
                    mediaUrl={postData.file} 
                    mediaType={postData.extension} 
                    postid={postData.id} 
                />)}
            </div>
            <div className='grid grid-cols-4 content-start bg-white w-full mb-0 h-auto pb-1 mt-[7px]'>
                <Like postId={postData.id}/>
                <Comment
                    icon={<CommentIcon className='text-base' />} 
                    postid={postData.id} 
                />
                <Repost icon={<RepeatIcon className='text-base' />} />
                <Share icon={<ShareIcon className='text-base' />} />
            </div>
        </div>
    )
}

export default Post