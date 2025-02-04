'use client'
import '@/globals.css'
import { AuthProvider, CommentsModalProvider } from '@/app/contexts'
import { Navbar, NavbarOptions } from '@/app/components'
import { useState } from 'react'

export default function Layout({children}){
  const [isClickedTopProfile, setIsCLickedTopProfile] = useState(false)
      const handleProfileTrigger = (isProfileClicked) => {
          if(isProfileClicked){
              setIsCLickedTopProfile(!isClickedTopProfile)
          }
      }
  return (
    <html lang="pt-br">
      <head>
        <title>Social Posting</title>
        <meta charSet='utf-8'/>
        <link rel="icon" type="image/x-icon" href="/icon.png"></link>
      </head>
      <body className='bg-gray-100'>        
        <AuthProvider>
          <CommentsModalProvider>
            <Navbar onProfileTrigger={handleProfileTrigger} />
            {isClickedTopProfile && (
              <NavbarOptions />
            )}
            {children}
          </CommentsModalProvider>
        </AuthProvider>        
      </body>
    </html>
    
)}