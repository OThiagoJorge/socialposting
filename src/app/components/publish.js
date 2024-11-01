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
        <div className='relative w-full md:w-1/2 mx-auto bg-white grid grid-rows-3 border-b-4 border-gray-300 md:rounded-2xl overflow-hidden'>
            <PublishAuthor />
            <form className='grid grid-col-1 justify-items-center row-span-2 relative mx-auto w-full'>
                <div className='flex justify-between w-full'>
                    <textarea
                        name='textarea' 
                        className='px-3 pt-3 bg-gray-100 text-black ml-3 h-24 mb-3 rounded-xl focus:drop-shadow-md focus:outline-none w-11/12 resize-none mr-3'
                        placeholder='Escreva aqui...'
                    />
                    <label 
                        htmlFor='inputMedia' 
                        className='relative ml-3 top-3 right-3 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded-xl h-10 w-4/12 cursor-pointer mt-4'
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
                </div>
                <button 
                    type="submit" 
                    className="w-full flex items-center justify-center bg-gray-200 text-black px-10 py-3 hover:bg-gray-300 row-span-1"
                >
                    <PublishIcon fontSize='medium' />
                    Publicar
                </button>
            </form>
        </div>
    )
}

export default Publish