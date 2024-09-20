import './globals.css'
import Publish from './components/publish'
import Navbar from './components/navbar'
import Post from './components/post'

const Feed = () => {
    return (
            <div className='bg-gray-100 h-full'>
                <Navbar />
                <div className='pt-20'>
                    <Publish />
                    <Post />
                    <Post />
                    <Post />
                    <Post />
                </div>
                <div className='w-7 h-7 bg-black relative fixed '></div>
            </div>
    )
}

export default Feed