import {useState, useEffect} from "react"
import {firestore, auth} from "../firebase/config"

export const useCredentials = () => {
    const [credentials, setCredentials] = useState([]);

    useEffect(() => {
        let unsub;
        //TODO: WRITE THIS SHIT
        unsub = firestore.collection("users")
        .onSnapshot(snap => {
            snap.forEach((doc, i) => {
                if (doc.data().userId === auth.currentUser.uid) {
                    setCredentials({...doc.data()})
                }
            })
        })
        return () => unsub
}, [])

    return {credentials}
}