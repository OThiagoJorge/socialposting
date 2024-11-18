'use client'

import { useEffect, useRef } from 'react'
import { initializeApp } from 'firebase/app'
import { getAuth, EmailAuthProvider, createUserWithEmailAndPassword } from 'firebase/auth'
import * as firebaseui from 'firebaseui' // Certifique-se de importar usando o namespace
import 'firebaseui/dist/firebaseui.css' // Importação de CSS do FirebaseUI

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
}

// Inicializar o Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

const Login = () => {
  const uiRef = useRef(null)

  useEffect(() => {
    // Inicializar o Firebase UI Auth
    const ui =
      firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(auth)

    // Iniciar o Firebase UI Auth quando o componente é montado
    ui.start(uiRef.current, {
      signInOptions: [
        {
          provider: EmailAuthProvider.PROVIDER_ID,
          signInMethod: EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD,
        },
      ],
    })

    // Limpar o Firebase UI Auth ao desmontar o componente
    return () => ui.delete()
  }, [])

  return <div ref={uiRef}></div>
}

export default Login