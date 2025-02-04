'use server'

import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { v4 as uuidv4 } from "uuid"
import { auth, db } from "@/firebaseconfig.js"
import { onAuthStateChanged } from "firebase/auth"
import { collection, query, where, getDocs, addDoc } from "firebase/firestore"

let userD = null

onAuthStateChanged(auth, async (currentUser) => {
    if (currentUser) {
        const uid = currentUser.uid
        const q = query(collection(db, "users"), where("uid", "==", uid))
        try {
            const querySnapshot = await getDocs(q)
            querySnapshot.forEach((doc) => {
                userD = doc.data()
            })
        } catch (error) {
            console.error("Erro ao buscar documentos:", error)
        }
    } else {
        console.log("Nenhum usuário logado")
        userD = null
    }
})

const uploadFile = async (file, slug) => {
    if(file){
    const storage = getStorage()
    const randomFileName = uuidv4()
    const storageRef = ref(storage, `posts/${slug}/${randomFileName}`)
    try {
        const snapshot = await uploadBytes(storageRef, file)
        console.log("Upload concluído com sucesso!", snapshot.metadata)
        const url = await getDownloadURL(storageRef)
        return url
    } catch (error) {
        console.error("Erro ao fazer upload:", error.message)
        throw error
    }}
}

const handleSubmitPost = async (e) => {
    e.preventDefault()

    if (!userD) {
        console.error("Dados do usuário não carregados")
        return
    }

    let text = e.target.textarea.value
    const file = e.target.file.files[0]
    const { slug, profilePhotoUrl, name } = userD

    if (!slug || !profilePhotoUrl || !name) {
        console.error("Dados do usuário estão incompletos")
        return
    }

    if (!text && !file) {
        console.error("Texto e arquivo estão vazios")
        return
    }

    if (text.length > 5000) {
        text = text.substring(0, 5000)
        console.warn("Texto truncado para 5000 caracteres")
    }

    let fileUrl = ""
    let fileExtension = ""

    if (file) {
        const allowedExtensions = ["image/jpg", "image/jpeg", "image/png", "image/gif", "video/mp4", "video/avi", "video/mov"]
        if (!allowedExtensions.includes(file.type)) {
            console.error("Tipo de arquivo não permitido")
            return
        }
        fileUrl = await uploadFile(file, slug)
        fileExtension = file.name.split('.').pop()
    }

    try {
        const postsCollectionRef = collection(db, "feed")
        await addDoc(postsCollectionRef, {
            name,
            profilePhoto: profilePhotoUrl,
            text: text || "",
            file: fileUrl || "",
            extension: fileExtension ? `.${fileExtension}` : "",
            timestamp: new Date()
        })
        console.log("Post criado com sucesso")
        location.reload()
    } catch (error) {
        console.error("Erro ao criar post:", error.message)
    }
}

export default handleSubmitPost