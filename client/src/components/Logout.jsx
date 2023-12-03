import { useContext, useEffect } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { doSignOut } from '../firebase/fbFunctions'
import { useNavigate } from 'react-router-dom'

const Logout = () => {
    const { currentUser } = useContext(AuthContext)
    const navigate = useNavigate()

    useEffect(() => {
        const signOutAndNavigate = async () => {
            try {
                await doSignOut()
            } catch (error) {
                // handle error
            }
            navigate('/')
        }

        if (currentUser) {
            signOutAndNavigate()
        } else {
            navigate('/')
        }
    }, [currentUser, navigate])

    // No button is rendered
    return null
}

export default Logout
