'use client'
import '../globals.css'
import Publish from '../components/publish'
import Logo from '../components/logo'
import Post from '../components/post'

const Feed = () => {
    return (
            <div className='bg-gray-300 h-full'>
                <Logo />
                <div className='pt-10'>
                    <Publish />
                    <Post />
                    <Post />
                    <Post />
                    <Post />
                </div>
            </div>
    )
}

export default Feed