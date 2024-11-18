import '../globals.css'
import Profile from '../profile/page.js'

async function fetchProfileData(slug) {
    const response = await fetch(`http://localhost:3001/profiles/${slug}`)
    if (!response.ok) {
      throw new Error('Perfil não encontrado')
    }
    return response.json()
}
  
async function Page({ params }) {
    const { slug } = params

    const profileData = await fetchProfileData(slug)

    return (
        <Profile name={profileData.nome}/>
    )
}

export default Page
  