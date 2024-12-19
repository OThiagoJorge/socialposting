import '../globals.css'
import PublishIcon from '@mui/icons-material/Publish'
import FileUploadIcon from '@mui/icons-material/FileUpload'
import { auth, db } from '@/firebaseconfig.js'
import { onAuthStateChanged } from "firebase/auth"
import { useEffect, useState } from "react"
import { collection, query, where, getDocs, addDoc } from "firebase/firestore"
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { v4 as uuidv4 } from "uuid"

const PublishAuthor = ({user}) => {
    console.log('username: ', user)
    return (
        <div className='flex flex-row items-center'>
            <button className='rounded-full w-12 h-12 mt-3 ml-3 overflow-hidden'>
                <img 
                    src={user?.profilePhotoUrl} 
                    alt="Profile"
                />
            </button>
            <a className='ml-3 cursor-pointer'>
                <h1 className='font-extrabold'>{user?.name}</h1>
            </a>
        </div>
    )
}

const Publish = () => {
    const [userD, setUserD] = useState("")
    const [dataBaseId, setDatabaseId] = useState('')

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUserD(currentUser)
        })
        return () => unsubscribe()
    }, [])

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                console.log("Usuário logado:", currentUser.uid);
                const uid = currentUser.uid;
                const q = query(collection(db, "users"), where("uid", "==", uid));

                try {
                    const querySnapshot = await getDocs(q);
                    querySnapshot.forEach((doc) => {
                        console.log(doc.id, " => ", doc.data());
                        setUserD(doc.data()); // Atualiza o estado com os dados do Firestore
                        setDatabaseId(doc.id)
                    });
                } catch (error) {
                    console.error("Erro ao buscar documentos:", error);
                }
            } else {
                console.log("Nenhum usuário logado");
                setUserD(null);
            }
        });

        return () => unsubscribe(); // Remove o listener ao desmontar o componente
    }, [])

    console.log('imediatamente após: ', userD)

    const storage = getStorage()
    const uploadFile = async (file, slug) => {
        const randomFileName = uuidv4();
        const storageRef = ref(storage, `posts/${slug}/${randomFileName}`);
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
      }

      const handleSubmit = async (e) => {
        e.preventDefault()
    
        const text = e.target.textarea.value;
        const file = e.target.file.files[0];
        const slug = userD.slug;
        const profilePhoto = userD.profilePhotoUrl
        const authorName = userD.name
        try {
            // Faz upload do arquivo e obtém o URL
            const fileUrl = await uploadFile(file, slug);
    
            // Referência à subcoleção "posts" dentro do documento do usuário
            const postsCollectionRef = collection(db, 'feed');
    
            // Adiciona um novo documento à subcoleção
            await addDoc(postsCollectionRef, {
                name: authorName,
                profilePhoto: profilePhoto,
                text: text,
                file: fileUrl,
                timestamp: new Date(), // Opcional: Marcação de tempo
            });
    
            console.log("Post criado com sucesso!");
        } catch (error) {
            console.error("Erro ao criar post:", error.message);
        }
        window.location.reload()
    };

    return (
        <div className='relative w-full md:w-[512px] mx-auto bg-white grid grid-rows-3 border-b-4 border-gray-300 md:rounded-2xl overflow-hidden'>
            <PublishAuthor user={userD} />
            <form method='post' onSubmit={handleSubmit} className='grid grid-col-1 justify-items-center row-span-2 relative mx-auto w-full'>
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
                            name='file' 
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