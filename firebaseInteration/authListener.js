import { onAuthStateChanged } from "firebase/auth"
import { query, collection, where, getDocs } from "firebase/firestore"
import { auth, db } from "@/firebaseconfig"

const listenToAuthChanges = async (setUserD) => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
        if (currentUser) {
            const uid = currentUser.uid
            const q = query(collection(db, "users"), where("uid", "==", uid))
            try {
                const querySnapshot = await getDocs(q)
                querySnapshot.forEach((doc) => {
                    setUserD({ id: doc.id, ...doc.data() })
                })
            } catch (error) {
                console.error("Erro ao buscar documentos:", error)
            }
        } else {
            console.log("Nenhum usuário logado")
        }
    })

    return unsubscribe
}

export default listenToAuthChanges