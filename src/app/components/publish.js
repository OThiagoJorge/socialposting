import '../globals.css'
import PublishIcon from '@mui/icons-material/Publish'
import FileUploadIcon from '@mui/icons-material/FileUpload'
    const Publish = () => {
        return(
            <div className='relative w-1/2 mx-auto bg-gradient-to-b from-blue-100 via-blue-200 to-blue-300 grid grid-rows-3 drop-shadow-lg rounded-3xl'>
                <div className='flex flex-row items-center'>
                    <button className='rounded-full border-black border-2 w-12 h-12 mt-3 ml-3'>
                        <img alt="Profile"/>
                    </button>
                    <a className='ml-3 cursor-pointer'>
                        <h1 className='font-extrabold'>Fulano de tal</h1>
                    </a>
                </div>
                <form className='row-span-2 relative flex'>
                    <textarea
                        name='textarea' 
                        className='px-3 pt-3 bg-white mt-3 h-24 mb-3 rounded-2xl focus:drop-shadow-md focus:outline-none w-full resize-none mx-3'
                        placeholder='Escreva aqui...'
                    />
                    <label htmlFor='inputMedia' className='relative ml-3 top-3 right-3 flex items-center justify-center bg-blue-700 hover:bg-blue-500 rounded-full h-10 w-4/12 cursor-pointer mt-7'>
                        <FileUploadIcon fontSize='medium text-white'/>
                        <span className='ml-1 text-white'>Foto/vídeo</span>
                        <input type='file' accept='png,jpg,jpeg,mp4,gif,wmv,avi' className='hidden' id='inputMedia'/>
                    </label>
                    <button type="submit" className="w-full flex items-center justify-center bg-blue-700 text-white rounded-b-3xl px-10 py-3 hover:bg-blue-500 duration-100 row-span-1"><PublishIcon fontSize='medium' />Publicar</button>
                </form>
            </div>
        )
    }
export default Publish