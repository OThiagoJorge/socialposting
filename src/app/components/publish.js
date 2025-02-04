import '@/globals.css'
import PublishIcon from '@mui/icons-material/Publish'
import TextSnippetIcon from '@mui/icons-material/TextSnippet'
import { useState } from "react"
import UploadComponent from "./subcomponents/upload.js"
import handleSubmitPost from "@/firebaseInteration/uploadfilesconfig.js"
import { useRouter } from 'next/navigation'
import { useAuth } from '@/app/contexts/authContext'

const PublishAuthor = ({user}) => {
    const router = useRouter()
    return (
        <div className='flex flex-row items-center'>
            <button onClick={() => router.push(`/${user.slug}`)} className='rounded-full w-12 h-12 mt-3 ml-3 overflow-hidden hover:opacity-85'>
                <img 
                    src={user?.profilePhotoUrl} 
                    alt="Profile"
                />
            </button>
            <button onClick={() => router.push(`/${user.slug}`)} className='ml-3 cursor-pointer'>
                <h1 className='font-extrabold'>{user?.name}</h1>
            </button>
        </div>
    )
}

const Publish = () => {
    const [isFileSelected, setIsFileSelected] = useState(false)
    const [text, setText] = useState("")
    const [iconColor, setIconColor] = useState('transparent')
    const [error, setError] = useState("")
    const maxChars = 5000

    const { user } = useAuth()

    const handleTextChange = (e) => {
        const newText = e.target.value
        if (newText.length <= maxChars) {
            setText(newText)
            updateIconColor(newText.length)
        }
    }

    const updateIconColor = (length) => {
        if (length === 0) {
            setIconColor('transparent')
        } else if (length < maxChars - 500) {
            const blueIntensity = Math.min(255, Math.floor((length / (maxChars - 500)) * 255))
            setIconColor(`rgba(0, 0, 255, ${blueIntensity / 255})`)
        } else {
            const redIntensity = Math.min(255, Math.floor(((length - (maxChars - 500)) / 500) * 255) + 100) // Start with a stronger red
            setIconColor(`rgba(255, 0, 0, ${redIntensity / 255})`)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!isFileSelected && text.trim() === "") {
            setError("A postagem está vazia. Por favor, adicione um arquivo ou texto.")
            return
        }
        setError("")
        handleSubmitPost(e)
    }

    return (
        <div className='relative w-full md:w-[512px] mx-auto bg-white grid grid-rows-3 border-b-4 border-gray-300 md:rounded-2xl overflow-hidden'>
            <PublishAuthor user={user} />
            <form 
                method='post' 
                onSubmit={handleSubmit} 
                className='grid grid-col-1 justify-items-center row-span-2 relative mx-auto w-full'
            >
                <div className='flex justify-between w-full'>
                    <textarea
                        name='textarea' 
                        className='px-3 pt-3 bg-gray-100 text-black ml-3 h-auto min-h-24 max-h-96 mb-3 rounded-xl focus:drop-shadow-md focus:outline-none w-11/12 resize-none mr-3'
                        placeholder={`O que há de novo, ${user?.name?.split(' ')[0]}?`}
                        value={text}
                        onChange={handleTextChange}
                        onFocus={() => setError("")}
                    />
                    <UploadComponent onFileSelect={(boolean) => { setIsFileSelected(boolean); setError("") }}  />
                </div>
                {text ? (
                    <div className='flex align-middle w-full pr-3 text-gray-500 mb-1'>
                        <TextSnippetIcon style={{ color: iconColor, fontSize: '1.5rem' }} className='ml-auto bg-gray-100 rounded-full p-1' /> 
                        <div>{text.length}/{maxChars}</div>    
                    </div> 
                ) : (
                    <div className='h-7'>
                        {error && <div className='text-red-500 my-auto'>{error}</div>}
                    </div>
                )}
                <button 
                    type="submit" 
                    className={`w-full flex items-center justify-center bg-gray-200 text-black px-10 py-3 hover:bg-gray-300 row-span-1 ${error ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                >
                    <PublishIcon fontSize='medium' />
                    Publicar
                </button>
            </form>
        </div>
    )
}

export default Publish