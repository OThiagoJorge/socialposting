'use client'
import { createContext, useState, useContext } from 'react'

const showCommentsModalContext = createContext( false )

export function CommentsModalProvider({ children }) {
    const [showCommentsModal, setShowCommentsModal] = useState(false)
    const [selectedPostId, setSelectedPostId] = useState("")
    const [closeCommentsModal, setCloseCommentsModal] = useState(false)

    return (
        <showCommentsModalContext.Provider value={{ 
            showCommentsModal, setShowCommentsModal,
            selectedPostId, setSelectedPostId,
            closeCommentsModal, setCloseCommentsModal
        }}>
            {children}
        </showCommentsModalContext.Provider>
    )
}

export function useShowCommentsModal() {
    return useContext(showCommentsModalContext)
}