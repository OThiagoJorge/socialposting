// Força a renderização dinâmica (SSR) da rota
export const dynamic = 'force-dynamic' 

import Profile from '@/app/profile/profile'
import { collection, query, where, getDocs } from "firebase/firestore"
import { db } from '@/firebaseconfig.js'

// Função que busca os dados do usuário com base no slug fornecido
async function fetchUserData(slug) {
  // Cria uma consulta para procurar usuários com o slug igual ao parâmetro
  const q = query(collection(db, "users"), where("slug", "==", slug))
  // Executa a consulta e aguarda os resultados
  const querySnapshot = await getDocs(q)

  // Se não houver resultados, retorna null
  if (querySnapshot.empty) return null

  // Obtém o primeiro documento encontrado e retorna os dados do usuário
  const doc = querySnapshot.docs[0]
  return { id: doc.id, ...doc.data() }
}

// Componente principal da página, executado no lado do servidor
export default async function Page({ params }) {
  let userData = null

  try {
    // Tenta buscar os dados do usuário utilizando o slug dos parâmetros da URL
    userData = await fetchUserData(params.slug)
  } catch (error) {
    // Em caso de erro na busca, imprime a mensagem de erro no console
    console.error("Failed to fetch user data", error)
  }

  // Renderiza o componente Profile, passando os dados do usuário (podem ser nulos)
  return <Profile user={userData} />
}