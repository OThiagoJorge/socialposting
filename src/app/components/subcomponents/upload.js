import React, { useState } from 'react'
import FileUploadIcon from '@mui/icons-material/FileUpload'

const UploadComponent = ({ onFileSelect }) => {
    const [fileSelected, setFileSelected] = useState(false)

    const handleFileChange = (event) => {
        const file = event.target.files[0]
        setFileSelected(!!file)
        onFileSelect(!!file)
    }

    return (
        <label 
            htmlFor='inputMedia' 
            className='relative ml-3 top-3 right-3 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded-xl h-10 w-4/12 cursor-pointer mt-4'
        >
            <FileUploadIcon fontSize='medium text-black'/>
            <span className='ml-1 text-black'>Foto/vídeo</span>
            <input
                name='file' 
                type='file' 
                accept='png,jpg,jpeg,mp4,gif,wmv,avi' 
                className='hidden' 
                id='inputMedia'
                onChange={handleFileChange}
            />
        </label>
    )
}

export default UploadComponent