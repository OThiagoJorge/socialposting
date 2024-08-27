import '../globals.css'
const Post = () => {
    return (
        <div className='relative w-1/2 mx-auto bg-gradient-to-b from-blue-100 via-blue-200 to-blue-300 drop-shadow-lg rounded-3xl mt-10 h-96'>
    <       div className='flex flex-row items-center absolute top-3 left-3'>
                <button className='rounded-full border-black border-2 w-12 h-12'>
                    <img alt="Profile" />
                </button>
                <a className='ml-3 cursor-pointer'>
                 <h1 className='font-extrabold'>Fulano de tal</h1>
                </a>
            </div>
            <div className='absolute bg-white rounded-3xl w-5/6 h-4/5 mt-14 mb-14 mx-14'>
                <img src='meme.png' className='h-full rounded-3xl'></img>
            </div>
        </div>
    )
}
export default Post