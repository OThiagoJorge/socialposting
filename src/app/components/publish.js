import '../globals.css'
import PublishIcon from '@mui/icons-material/Publish'
import FileUploadIcon from '@mui/icons-material/FileUpload'

const PublishAuthor = () => {
    return (
        <div className='flex flex-row items-center'>
            <button className='rounded-full w-12 h-12 mt-3 ml-3 overflow-hidden'>
                <img 
                    src='perfil.jpg' 
                    alt="Profile"
                />
            </button>
            <a className='ml-3 cursor-pointer'>
                <h1 className='font-extrabold'>Thiago Jorge</h1>
            </a>
        </div>
    )
}

const Publish = () => {
    return (
        <div className='relative w-1/2 mx-auto bg-white grid grid-rows-3 border-b-4 border-gray-300 rounded-3xl'>
            <PublishAuthor />
            <form className='row-span-2 relative flex'>
                <textarea
                    name='textarea' 
                    className='px-3 pt-3 bg-gray-100 text-black mt-3 h-24 mb-3 rounded-2xl focus:drop-shadow-md focus:outline-none w-full resize-none mx-3'
                    placeholder='Escreva aqui...'
                />
                <label 
                    htmlFor='inputMedia' 
                    className='relative ml-3 top-3 right-3 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded-full h-10 w-4/12 cursor-pointer mt-7'
                >
                    <FileUploadIcon fontSize='medium text-black'/>
                    <span className='ml-1 text-black'>Foto/vídeo</span>
                    <input 
                        type='file' 
                        accept='png,jpg,jpeg,mp4,gif,wmv,avi' 
                        className='hidden' 
                        id='inputMedia'
                    />
                </label>
                <button 
                    type="submit" 
                    className="w-full flex items-center justify-center bg-gray-200 text-black rounded-b-3xl px-10 py-3 hover:bg-gray-300 row-span-1"
                >
                    <PublishIcon fontSize='medium' />
                    Publicar
                </button>
            </form>
        </div>
    )
}

export default Publish