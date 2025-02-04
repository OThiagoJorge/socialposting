import '@/globals.css'
import Profile from '@/app/profile/profile.js'
import { collection, query, where, getDocs } from "firebase/firestore"
import { db } from '@/firebaseconfig.js'

async function Page({ params }) {

  const { slug } = params
  
  try{
    const q = query(collection(db, "users"), where("slug", "==", slug))
    const querySnapshot = await getDocs(q)
    let userData = null
    querySnapshot.forEach((doc) => {
      userData = { id: doc.id, ...doc.data() }
    })
    return <Profile user={userData} />
  }catch (error) {
    console.error("Erro ao buscar o documento:", error)
    return <div>Erro ao carregar o perfil.</div>
  }
}

export default Page