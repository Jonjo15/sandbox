import React, {useState, useEffect, useContext} from "react"
import {auth} from "../firebase/config"
import {createUserData} from "../firebase/firestoreActions"
import {useHistory} from "react-router-dom"
const userContext = React.createContext()

export const useUser = () => useContext(userContext)

export function ContextProvider({children}) {
    const [user, setUser] = useState(null)
    // const [credentials, setCredentials] = useState({})
    const [loading, setLoading] = useState(true)
    const [email, setEmail] = useState("")
    const [userId, setUserId] = useState("")
    const [userName, setUserName] = useState("")
    const [signupError, setSignupError] = useState("")
    const [loginError, setLoginError] = useState("")
    const history = useHistory()
    
    const resetData = () => {
        setUser(null)
        setEmail("")
        setUserName("")
        setUserId("")
    }
    const clearErrors = () => {
        setSignupError("")
        setLoginError("")
    }
    const login = (email, pass) => {
        return auth.signInWithEmailAndPassword(email, pass)
        .then((data) => {
            setEmail(data.user.email)
            setUserId(data.user.uid)
            // history.push("/")
            // setUserName(username) TODO:
        })
        .catch(err => {
            console.error(err.message, err.code)
            setLoginError(err.message)
        })
    }
    const logout = () => {
        return auth.signOut()
        .then(() => {
            resetData()
        })
        .catch(err => {
            console.error(err)
        })
    }
    const signup = (email, pass, username) => {
        return auth.createUserWithEmailAndPassword(email, pass)
        .then(data => {
            createUserData(data.user, username);
            setEmail(data.user.email)
            setUserId(data.user.uid)
            setUserName(username)
            setSignupError("")
            history.push("/")
        })
        .catch(err => {
            console.log(err)
            setSignupError(err.message)
        })
        
        // .then(() => {
        //     console.log("success")
        // })
        // .catch(err => {
        //     console.error(err)
        // })
    }
    const value = {
        user,
        setUser,
        login,
        logout,
        signup, 
        email, 
        userName,
        userId, 
        signupError, 
        loginError, 
        // credentials, 
        // setCredentials
    }
    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (user) {
                setUser(user)
                console.log(auth)
                // setCredentials(createCredentials(user))
                setLoading(false)
                history.push("/")
                clearErrors()
            }
            else {
                // console.log("logging out")
                setUser(null)
                setLoading(false)
                // setCredentials(null)
            }
        })
    }, [history])
    return (
        <userContext.Provider value={value}>
            {!loading && children}
        </userContext.Provider>
    )
}
