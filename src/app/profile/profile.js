'use client'

import '@/globals.css'
import { useState, useEffect } from 'react'
import { Publish, Post, CommentsModal } from '@/app/components'
import { db } from '@/firebaseconfig.js'
import { doc, getDoc, setDoc, getDocs, collection } from 'firebase/firestore'
import { useAuth } from '@/app/contexts/authContext'
import { useShowCommentsModal } from '@/app/contexts/showCommentsModal'

const ProfileImages = ({ user }) => {
  if (!user) return <div>Carregando...</div>
  return (
    <div className="relative w-full flex justify-center z-0">
      <button className="w-full md:mx-10 bg-gradient-to-b from-blue-100 via-blue-200 to-blue-300 drop-shadow-lg md:rounded-b-2xl h-48 md:h-72 overflow-hidden flex justify-center items-center hover:opacity-85">
        {user.wallpaperUrl ? (
          <img 
            src={user.wallpaperUrl} 
            className="object-cover w-full h-full" 
            alt="Background Image"
          />
        ) : (
          <div className="text-gray-500">Sem imagem de capa</div>
        )}
      </button>  
        <button className="absolute mt-32 md:mt-56 w-32 h-32 rounded-full z-10 border-4 border-white overflow-hidden bg-white">
          {user.profilePhotoUrl ? (
            <img 
              src={user.profilePhotoUrl} 
              className="object-cover w-full h-full hover:opacity-85" 
              alt="Profile Image"
            />
          ) : (
            <div className="text-gray-500 flex justify-center items-center h-full">
              Sem foto de perfil
            </div>
          )}
        </button>
    </div>
)}
{/* Recebendo as informações do usuário da rota específica */}
const Profile = (props) => {
  const { setShowCommentsModal, showCommentsModal, selectedPostId } = useShowCommentsModal()

  const { user } = useAuth()
  const userD = user || {}
  const [posts, setPosts] = useState([])
  const [following, setFollowing] = useState(false)
  const [sumOfFollowers, setSumOfFollowers] = useState(0)
  const [sumOfFollowing, setSumOfFollowing] = useState(0)
  const [isClickedTopProfile, setIsClickedTopProfile] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [hasWindow, setHasWindow] = useState(false)
  const [isFriend, setIsFriend] = useState(false)
  const [sumOfFriends, setSumOfFriends] = useState(0)  

  const toggleFollowChange = async () => {
    if (!userD.uid) {
      window.location.href = '/login'
      return
    }

    try {
      const followersDocRef = doc(db, `users/${props.user.id}/relations`, 'followers')
      const followingDocRef = doc(db, `users/${userD.id}/relations`, 'following')
      const friendsDocRef = doc(db, `users/${props.user.id}/relations`, 'friends')
      const userLoggedFriendsDocRef = doc(db, `users/${userD.id}/relations`, 'friends')

      const userLoggedfollowersDocRef = doc(db, `users/${userD.id}/relations`, 'followers')

      const followersDocSnap = await getDoc(followersDocRef)
      const followingDocSnap = await getDoc(followingDocRef)
      const friendsDocSnap = await getDoc(friendsDocRef)
      const userLoggedFriendsDocSnap = await getDoc(userLoggedFriendsDocRef)

      const userLoggedfollowersDocSnap = await getDoc(userLoggedfollowersDocRef)

      let followersData = followersDocSnap.exists() ? followersDocSnap.data() : { userFollowers: {}, sumOfFollowers: 0 }
      let followingData = followingDocSnap.exists() ? followingDocSnap.data() : { userFollowing: {}, sumOfFollowing: 0 }
      let friendsData = friendsDocSnap.exists() ? friendsDocSnap.data() : { userFriends: {}, sumOfFriends: 0 }
      let userLoggedFriendsData = userLoggedFriendsDocSnap.exists() ? userLoggedFriendsDocSnap.data() : { userFriends: {}, sumOfFriends: 0 }
      
      let userLoggedfollowersData = userLoggedfollowersDocSnap.exists() ? userLoggedfollowersDocSnap.data() : { userFollowers: {}, sumOfFollowers: 0 }

      if (followersData.userFollowers[userD.uid]) {
        setIsFriend(false)
        if (followingData.userFollowing[props.user.uid] && userLoggedfollowersData.userFollowers[props.user.uid]) {
          delete friendsData.userFriends[userD.uid]
          delete userLoggedFriendsData.userFriends[props.user.uid]
          friendsData.sumOfFriends -= 1
          userLoggedFriendsData.sumOfFriends -= 1
        }
        // User already following, so we remove the follow
        delete followersData.userFollowers[userD.uid]
        delete followingData.userFollowing[props.user.uid]
        followersData.sumOfFollowers -= 1
        followingData.sumOfFollowing -= 1
        await setDoc(followersDocRef, followersData)
        await setDoc(followingDocRef, followingData)
        await setDoc(friendsDocRef, friendsData)
        await setDoc(userLoggedFriendsDocRef, userLoggedFriendsData)
        setFollowing(false)
        setSumOfFollowers(followersData.sumOfFollowers || 0)
      } else {
        // User has not followed yet, so we add the follow
        followersData.userFollowers[userD.uid] = true
        followingData.userFollowing[props.user.uid] = true
        followersData.sumOfFollowers += 1
        followingData.sumOfFollowing += 1
        if (followingData.userFollowing[props.user.uid] && userLoggedfollowersData.userFollowers[props.user.uid]) {
          // Both users are following each other, add to friends
          friendsData.userFriends[userD.uid] = true
          userLoggedFriendsData.userFriends[props.user.uid] = true
          friendsData.sumOfFriends += 1
          userLoggedFriendsData.sumOfFriends += 1
          setIsFriend(true)
        }
        await setDoc(followersDocRef, followersData)
        await setDoc(followingDocRef, followingData)
        await setDoc(friendsDocRef, friendsData)
        await setDoc(userLoggedFriendsDocRef, userLoggedFriendsData)
        setFollowing(true)
        setSumOfFollowers(followersData.sumOfFollowers || 0)
      }
    } catch (error) {
      console.error("Erro ao seguir: ", error.message)
    }
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
        .filter((post) => post.name === userD.name)
        setPosts(postsData)
        console.log('postData: ', postsData)
      } catch (error) {
        console.error("Erro ao buscar os posts: ", error.message)
      }
    }
    fetchPosts()
  }, [])

  useEffect(() => {
      if (typeof window !== 'undefined') setHasWindow(true)
  }, [])

  const handleProfileTrigger = (isProfileClicked) => {
      if (isProfileClicked) {
          setIsClickedTopProfile(!isClickedTopProfile)
      }
  }

  const handleEventTrigger = (isHoverProfile) => {
      setIsHovered(isHoverProfile)
  }

  const handleMouseOut = () => setIsHovered(false)

  useEffect(() => {
    const fetchUserRelations = async () => {
      try {
        const currentSlug = window.location.pathname.split('/')[1]
        const usersCollection = collection(db, "users")
        const querySnapshot = await getDocs(usersCollection)
        const currentUserData = querySnapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .find((user) => user.slug === currentSlug)

        if (currentUserData) {
          const followingDocRef = doc(db, `users/${currentUserData.id}/relations/following`)
          const followingDocSnap = await getDoc(followingDocRef)
          if (followingDocSnap.exists()) {
            const followingData = followingDocSnap.data()
            setSumOfFollowing(followingData.sumOfFollowing || 0)
          }
        }

        const followersRef = doc(db, `users/${props.user.id}/relations/followers`)
        const followingDocRef = doc(db, `users/${props.user.id}/relations/following`)
        const friendsDocRef = doc(db, `users/${props.user.id}/relations/friends`)

        const followersSnap = await getDoc(followersRef)
        const followingSnap = await getDoc(followingDocRef)
        const friendsSnap = await getDoc(friendsDocRef)

        if (friendsSnap.exists()) {
          const friendsData = friendsSnap.data()
          if (friendsData.userFriends && friendsData.userFriends[userD.uid]) {
            setIsFriend(true)
          }
          setSumOfFriends(friendsData.sumOfFriends || 0)
        }

        if (followersSnap.exists()) {
          const followersData = followersSnap.data()
          setSumOfFollowers(followersData.sumOfFollowers || 0)
          if (!isFriend && followersData.userFollowers && followersData.userFollowers[userD.uid]) {
            setFollowing(true)
          }
        }

        if (followingSnap.exists()) {
          const followingData = followingSnap.data()
          setSumOfFollowing(followingData.sumOfFollowing || 0)
        }
      } catch (error) {
        console.error("Erro ao buscar relações do usuário: ", error.message)
      }
    }
    fetchUserRelations()
  }, [userD.uid, toggleFollowChange])

  console.log('props: ', props)

  useEffect(() => {
    if (showCommentsModal) {
        document.body.style.overflowY = 'hidden'
    } else {
        document.body.style.overflowY = 'auto'
    }
  }, [showCommentsModal])

  return (
    <div 
      onClick={() => showCommentsModal && setShowCommentsModal(false)}
      onKeyDown={(e) => e.key === 'Escape' && setShowCommentsModal(false)}
      className='w-screen h-screen'
      tabIndex={0}
    >
      {showCommentsModal && (
        <div className='bg-black/65 backdrop-blur-sm w-full h-full z-40 fixed'></div>
      )}
      <main className='mb-4'>
        <div>
          {hasWindow && isHovered && (
              <div
                onMouseOver={() => handleEventTrigger(true)}
                onMouseOut={handleMouseOut}
                className='mt-44 fixed bg-white h-60 w-96 z-40 ml-64 rounded-xl drop-shadow-lg'
              >
                  {props.user.name}
              </div>
          )}
            <ProfileImages user={props.user} />
          <div className='relative grid grid-rows-2 align-middle content-center w-full h-auto mt-16'>
            <div className='w-full h-full flex items-start justify-center'>
              <h1 className='text-4xl font-bold'>{props.user.name}</h1>
            </div>
            <div className='w-full h-full flex items-start justify-center mt-2'>
              <span className='text-gray-500'>@{props.user.slug}</span>
            </div>
                {window.location.pathname !== `/${userD.slug}` && 
                (<div className='w-full flex items-start justify-center mb-2 mt-1'>
                  <button onClick={toggleFollowChange} className='w-32 bg-marrs text-white px-4 py-2 rounded-full hover:opacity-85 font-bold mb-4s'>
                    {isFriend ? 'Amigos' : following ? 'Seguindo' : 'Seguir'}
                  </button>
                </div>)} 
            <div className='w-full h-full flex items-start justify-center'>
              {sumOfFriends > 0 && (
              <span className='text-gray-500 mr-4 hover:underline cursor-pointer'>{sumOfFriends} {sumOfFriends === 1 ? 'amigo' : 'amigos'}</span>)}
              <span className='text-gray-500 mr-4 hover:underline cursor-pointer'>
                {sumOfFollowers} {sumOfFollowers === 1 ? 'seguidor' : 'seguidores'}
              </span>
              <span className='text-gray-500 hover:underline cursor-pointer'>{sumOfFollowing} seguindo</span>              
            </div>
          </div>
        </div>
      </main>
      {userD && window.location.pathname === `/${userD.slug}` && (<Publish />)}
      <div className='md:mx-[512px]'>
        {posts.map((post) => (
          <Post onEventTrigger={handleEventTrigger} key={post.id} postData={post} />
        ))}
      </div>
      {showCommentsModal &&
        <CommentsModal
          post={<Post 
                  postData={posts.find(post => post.id === selectedPostId)}
                  widthCommentsModal={true} 
                />}
        />
      }
    </div>
  )}

export default Profile