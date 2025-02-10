'use client'

import '@/globals.css'
import { Publish, Post, CommentsModal } from './components'
import { useState, useEffect } from 'react'
import { db } from '@/firebaseconfig.js'
import { collection, getDocs } from 'firebase/firestore'
import { useAuth } from '@/app/contexts/authContext'
import { useShowCommentsModal } from '@/app/contexts/showCommentsModal'

const Feed = () => {
    const { showCommentsModal, setShowCommentsModal, selectedPostId } = useShowCommentsModal()
    const { user } = useAuth()

    const [posts, setPosts] = useState([])
    const [isHoveredProfile, setIsHoveredProfile] = useState(false)

    const handleMouseOver = (isHoverProfile) => {
        setIsHoveredProfile(isHoverProfile)
    }

    const handleMouseOut = () => {
        setIsHoveredProfile(false)
    }

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
        }
        fetchPosts()
    }, [])

    useEffect(() => {
        if (showCommentsModal) {
            document.body.style.overflowY = 'hidden'
        } else {
            document.body.style.overflowY = 'auto'
        }
    }, [showCommentsModal])

    const [hideCommentsModal, setHideCommentsModal] = useState(false)

    useEffect(() => {
        if (!showCommentsModal) {
            const timer = setTimeout(() => {
                setHideCommentsModal(true)
            }, 1000)
            return () => clearTimeout(timer)
        } else {
            setHideCommentsModal(false)
        }
    }, [showCommentsModal])

    return (
        <div 
            onClick={() => showCommentsModal && setShowCommentsModal(false)} 
            className='w-full h-full'
            tabIndex={0}
        >
            {showCommentsModal && (
                <div className='bg-black/65 backdrop-blur-sm w-full h-full z-40 fixed'></div>
            )}
            {isHoveredProfile && (
                <div
                    onMouseOver={() => handleMouseOver(true)}
                    onMouseOut={handleMouseOut}
                    className='mt-44 fixed bg-white h-60 w-96 z-40 ml-64 rounded-xl drop-shadow-lg invisible md:visible'
                >
                    example
                </div>
            )}
            <div className='pt-20 md:mx-[512px]'>
                {user && <Publish />}
                {posts.map((post) => (
                    <div key={post.id}>
                        <Post 
                            onEventTrigger={handleMouseOver} 
                            postData={post} 
                        />
                    </div>
                ))}
                {showCommentsModal && !hideCommentsModal &&
                    <CommentsModal
                        post={<Post 
                                postData={posts.find(post => post.id === selectedPostId)}
                                widthCommentsModal={true} 
                            />}
                    />
                }
            </div>
        </div>
    )
}

export default Feed