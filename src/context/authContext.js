import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { createContext, useContext, useEffect, useState } from "react"
import { auth } from "../firebase"

export const authContext = createContext()

export const useAuth = () => {
    const context = useContext(authContext)
    if (!context) throw Error("There is no auth provider")
    return context
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const login = (email, password) => {
        signInWithEmailAndPassword(auth, email, password)
    }

    const logout = () => {
        signOut(auth)
        setUser(null)
    }

    useEffect((() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            setLoading(false)
        })

        return () => unsubscribe()
    }), [])

    return (
        <authContext.Provider value={{ login, logout, user, loading }}>
            {children}
        </authContext.Provider>
    )
}