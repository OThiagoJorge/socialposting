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
                {/* Back to top button in progress */}
                <button className='w-7 h-7 bg-black relative'></button>
            </div>
    )
}

export default Feed