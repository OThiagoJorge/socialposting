import '../globals.css'
import Profile from '../profile/page.js'
import { collection, query, where, getDocs } from "firebase/firestore"
import { db } from '@/firebaseconfig.js'

async function Page({ params }) {
  const { slug } = params
  try {
    const q = query(collection(db, "users"), where("slug", "==", slug))
    const querySnapshot = await getDocs(q)
    let userData = null

    querySnapshot.forEach((doc) => {
      userData = doc.data()
    })

    if (userData) {
      console.log("Dados do documento:", userData)
    } else {
      console.log("Nenhum documento encontrado!")
    }

    return <Profile user={userData} />
  } catch (error) {
    console.error("Erro ao buscar o documento:", error)
    return <div>Erro ao carregar o perfil.</div>
  }
}

export default Page