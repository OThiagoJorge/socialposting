'use client'

import '@/globals.css'
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth, db } from '@/firebaseconfig.js'
import { collection, addDoc } from "firebase/firestore"
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { InputAdornment, TextField } from '@mui/material'
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail'
import { v4 as uuidv4 } from "uuid"
import SignupInput from '../components/signupinput'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import { useAuth } from '@/app/contexts/authContext'

const Signup = () => {
  const { user, loading } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [slug, setSlug] = useState('')
  const [error, setError] = useState('')

  const router = useRouter()

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  {/* uploading profile photo and wallpaper */}
  const storage = getStorage()
  const uploadFile = async (file, slug) => {
  const randomFileName = uuidv4()
  const storageRef = ref(storage, `profile/${slug}/${randomFileName}`)
  try {
    const snapshot = await uploadBytes(storageRef, file)
    console.log('Upload concluído com sucesso!', snapshot.metadata)
    const url = await getDownloadURL(storageRef)
    return url
  } catch (error) {
    console.error('Erro ao fazer upload:', error.message)
    throw error
  }
}

  const handleSignup = async (e) => {
    e.preventDefault()

    const email = e.target.email.value
    const password = e.target.password.value
    const name = e.target.name.value
    const slug = e.target.slug.value
    const profilePhoto = e.target.profilePhoto.files[0]
    const wallpaper = e.target.wallpaper.files[0]

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      console.log("Usuário criado com sucesso:", userCredential.user)
      const uid = userCredential.user.uid
      const [profilePhotoUrl, wallpaperUrl] = await Promise.all([
        uploadFile(profilePhoto, slug),
        uploadFile(wallpaper, slug)
      ])
      const docRef = await addDoc(collection(db, "users"), {
        uid,
        name,
        slug,
        profilePhotoUrl,
        wallpaperUrl
      })
      console.log("Documento criado com ID:", docRef.id)
      
      // Store user in cache
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(userCredential.user))
      }

      router.push(`/${slug}`)
    } catch (error) {
      console.error("Erro durante o processo de cadastro:", error.message)
    }
  }
  const validateSlug = (value) => {
    const slugRegex = /^[a-zA-Z0-9](?:[a-zA-Z0-9-_]{1,28}[a-zA-Z0-9])?$/
    if (slugRegex.test(value)) {
      setError('')
    } else {
      setError('Nome de usuário inválido. Use apenas letras, números, "-" ou "_".')
    }
    setSlug(value)
  }
  return (
    <div className="grid justify-center bg-gray-100 h-full pb-5 w-full">
      <div className="z-40 px-3 items-center justify-between flex fixed font-extrabold text-sm md:text-xl h-10 md:h-14 w-screen">
        <button onClick={() => router.push('/login')} className='flex items-center bg-marrs hover:bg-marrs/75 text-white w-auto px-3 py-1 h-auto rounded-lg'>
          <ArrowBackIcon />
        </button>          
      </div>
      <div className="bg-white p-8 rounded-lg shadow-md w-96 md:mt-14 mt-10">
        <h2 className="text-2xl font-bold text-center mb-6">Cadastro</h2>
        <form id="signupForm" onSubmit={handleSignup} className="space-y-4">
          <SignupInput label='E-mail' type='email' name='email' placeholder='Digite seu e-mail' required={true} />
          <SignupInput label='Nome' type='text' name='name' placeholder='Digite seu nome' required={true} />
          <div>
            <label htmlFor="slug" className="block text-sm font-medium text-gray-700">
              Nome de usuário
            </label>
            <TextField
              name="slug"
              placeholder="Nome de usuário"
              value={slug}
              onChange={(e) => validateSlug(e.target.value)}
              required
              fullWidth
              variant="outlined"
              error={!!error}
              helperText={error}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AlternateEmailIcon />
                  </InputAdornment>
                ),
              }}
              className="mt-1"
            />
        </div>                 
          <SignupInput label='Foto de perfil' type='file' name='profilePhoto' />
          <SignupInput label='Foto de capa' type='file' name='wallpaper' />
          <div className="relative mt-1">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Nova senha"
              required
              className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-marrs focus:border-marrs"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-600 hover:text-gray-800 focus:outline-none"
            >
              {showPassword ? (
                  <VisibilityOffIcon />
              ) : (
                  <VisibilityIcon />
              )}
            </button>
          </div>        
          <button
            type="submit"
            className="w-full py-2 px-4 bg-marrs hover:bg-marrs/75 text-white font-bold rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          >
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  )
}

export default Signup