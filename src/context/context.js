import React, {useState, useEffect, useContext} from "react"
import {auth} from "../firebase/config"
import {createUserData, getUserCredentials} from "../firebase/firestoreActions"
import {useHistory} from "react-router-dom"
const userContext = React.createContext()

export const useUser = () => useContext(userContext)

export function ContextProvider({children}) {
    const [user, setUser] = useState(null)
    const [credentials, setCredentials] = useState({})
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
            return getUserCredentials()
        })
        .then(res => {
            setCredentials(res)
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
            setCredentials(null)
        })
        .catch(err => {
            console.error(err)
        })
    }
    const signup = (email, pass, username) => {
        return auth.createUserWithEmailAndPassword(email, pass)
        .then(data => {
            
            setEmail(data.user.email)
            setUserId(data.user.uid)
            setUserName(username)
            setSignupError("")
            history.push("/")
            return createUserData(username);
        })
        .then(()=> {
            return getUserCredentials()
        })
        .then((res) => 
            setCredentials(res)
        )
        .catch(err => {
            console.log(err)
            setSignupError(err.message)
        })
    }
    
    
   
    useEffect(() => {
        auth.onAuthStateChanged(async currUser => {
            if (currUser) {
                setUser(currUser)
                setLoading(false)
                history.push("/")
                clearErrors()
                getUserCredentials()
                .then(res => setCredentials(res))
                .catch(err => console.log(err.message))
            }
            else {
                setCredentials(null)
                setUser(null)
                setLoading(false)
            }
        })
    }, [history])
    
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
        credentials, 
        setCredentials
    }
    return (
        <userContext.Provider value={value}>
            {!loading && children}
        </userContext.Provider>
    )
}
