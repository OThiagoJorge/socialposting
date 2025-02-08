import '@/globals.css'
import Profile from '@/app/profile/profile.js'
import { collection, query, where, getDocs } from "firebase/firestore"
import { db } from '@/firebaseconfig.js'

import { Suspense } from 'react'

async function fetchUserData(slug) {
  "use cache"
  cacheTag("articles")
  cacheLife('hours')
  const q = query(collection(db, "users"), where("slug", "==", slug))
  const querySnapshot = await getDocs(q)
  let userData = null
  querySnapshot.forEach((doc) => {
    userData = { id: doc.id, ...doc.data() }
  })
  return userData
}

function ProfileSkeleton() {
  return <div>Loading profile...</div>
}

function Page({ params }) {
  const userDataPromise = params.then(async ({ slug }) => fetchUserData(slug))

  return (
    <Suspense fallback={<ProfileSkeleton />}>
      <Profile user={userDataPromise} />
    </Suspense>
  )
}

export default Page
