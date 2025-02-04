'use client'
import { createContext, useEffect, useState, useContext } from 'react'
import listenToAuthChanges from "@/firebaseInteration/authListener"

const AuthContext = createContext({ user: null, loading: true })

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const initializeListener = async () => {
            const unsubscribe = await listenToAuthChanges((user) => {
                setUser(user)
                setLoading(false)
            })
            return () => unsubscribe()
        }
        initializeListener()
    }, [])

    return (
        <AuthContext.Provider value={{ user, loading }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext)
}