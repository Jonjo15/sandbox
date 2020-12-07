import {useState, useEffect} from "react"
import {firestore, auth} from "../firebase/config"

export const useCredentials = () => {
    const [credentials, setCredentials] = useState([]);
    const [error, setError] = useState("")
    // db.collection("cities").where("capital", "==", true)
//     .get()
//     .then(function(querySnapshot) {
//         querySnapshot.forEach(function(doc) {
//             // doc.data() is never undefined for query doc snapshots
//             console.log(doc.id, " => ", doc.data());
//         });
//     })
//     .catch(function(error) {
//         console.log("Error getting documents: ", error);
//     });
    useEffect(() => {
        //TODO: WRITE THIS SHIT
        firestore.collection("users").where("userId", "==", auth.currentUser.uid)
        .get()
        .then(snap => {
            snap.forEach(doc => {
                console.log(doc.data())
                setCredentials(doc.data())
                setError("")
            })
           
        })
        .catch(err => setError(err.message))
    // return { credentials, error }

}, [])

    return {credentials, error}
}