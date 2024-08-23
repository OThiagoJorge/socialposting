'use client'
import '../globals.css'
import UploadFileIcon from '@mui/icons-material/UploadFile'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import Logo from '../components/logo'
import { useRouter } from 'next/navigation'
function InsertPhoto() {
  const router = useRouter()
  return (
      <div className='bg-gray-300 h-screen overflow-y-hidden'>
        <Logo />
        <div className='mt-24'>
          <form className="flex flex-col items-center mt-4">
          <label className="block text-2xl font-extrabold">Insira sua foto de perfil:</label>
          <div class="flex flex-col items-center justify-center mx-5 h-44 pt-2 md:w-96">
              <label htmlFor="dropzone-file" class="flex flex-col items-center justify-center w-full h-60 border-4 border-black border-dashed rounded-full cursor-pointer bg-white hover:bg-gray-100">
                  <div class="flex flex-col items-center justify-center pt-5 pb-6">
                      <UploadFileIcon fontSize='large' className='text-black'/>
                      <p class="mt-1 mb-1 px-2 text-base text-black md:text-lg"><span class="font-semibold">Clique para selecionar</span> ou arraste e solte</p>
                      <p class="text-sm md:text-base text-black">jpg, jpeg, png</p>
                  </div>
                  <input type="file" id="dropzone-file" class="hidden" accept='jpg, jpeg, png' />
              </label>
          </div>
          <div className='flex flex-col items-center'> 
          <button type="submit" className="block mt-4 bg-blue-700 text-white rounded-full pt-3 px-10 py-3 hover:bg-blue-500 duration-100">Enviar</button>
            <div className='mt-4 flex flex-row items-center'>
              <ArrowBackIcon fontSize='medium'/>
              <button onClick={() => router.push('/')} className='text-base'>Voltar</button>
            </div>
          </div>
          </form>
        </div>
      </div>
  )
}

export default InsertPhoto