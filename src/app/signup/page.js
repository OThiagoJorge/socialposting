'use client'
import '../globals.css'
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth, db } from '@/firebaseconfig.js'
import { collection, addDoc } from "firebase/firestore"
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { InputAdornment, TextField } from '@mui/material';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail'
import { v4 as uuidv4 } from "uuid"

const Signup = () => {
  const storage = getStorage()

const uploadFile = async (file, slug) => {
  const randomFileName = uuidv4();
  const storageRef = ref(storage, `profile/${slug}/${randomFileName}`);
  try {
    const snapshot = await uploadBytes(storageRef, file);
    console.log('Upload concluído com sucesso!', snapshot.metadata);

    // Obter o URL de download
    const url = await getDownloadURL(storageRef);
    return url;
  } catch (error) {
    console.error('Erro ao fazer upload:', error.message);
    throw error; // Importante para lidar com erros no upload
  }
};

const handleSignup = async (e) => {
  e.preventDefault();

  const email = e.target.email.value;
  const password = e.target.password.value;
  const name = e.target.name.value;
  const slug = e.target.slug.value;
  const profilePhoto = e.target.profilePhoto.files[0];
  const wallpaper = e.target.wallpaper.files[0];

  try {
    // Criar usuário no Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log("Usuário criado com sucesso:", userCredential.user);
    const uid = userCredential.user.uid
    // Fazer upload das imagens e obter URLs
    const [profilePhotoUrl, wallpaperUrl] = await Promise.all([
      uploadFile(profilePhoto, slug),
      uploadFile(wallpaper, slug)
    ]);

    // Salvar informações no Firestore
    const docRef = await addDoc(collection(db, "users"), {
      uid,
      name,
      slug,
      profilePhotoUrl,
      wallpaperUrl
    });
    console.log("Documento criado com ID:", docRef.id);
  } catch (error) {
    console.error("Erro durante o processo de cadastro:", error.message);
  }
};


  return (
    <div className="grid justify-center pt-5 bg-gray-100 h-full pb-5 fixed w-full">
      <h1 className="text-5xl text-center mb-5">Bem vindo!</h1>
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Cadastro</h2>
        <form id="signupForm" onSubmit={handleSignup} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">E-mail</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Digite seu e-mail"
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nome</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Digite seu nome"
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="slug" className="block text-sm font-medium text-gray-700">Nome de usuário</label>
            <TextField
              id="slug"
              name="slug"
              placeholder="Nome de usuário"
              required
              fullWidth
              variant="outlined"
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
          <div>
            <label htmlFor="profilePhoto" className="block text-sm font-medium text-gray-700">Foto de perfil</label>
            <input
              type="file"
              id="profilePhoto"
              name="profilePhoto"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="Wallpaper" className="block text-sm font-medium text-gray-700">Foto de capa</label>
            <input
              type="file"
              id="wallpaper"
              name="wallpaper"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Crie sua senha</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Digite sua senha"
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white font-bold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  )
}

export default Signup