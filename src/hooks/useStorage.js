import {auth, storage, firestore} from "../firebase/config"
import {useState, useEffect} from "react"

const useStorage = (file) => {
    const [url, setUrl] = useState(null)
    const [error, setError] = useState(null)
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        const storageRef = storage.ref(file.name)
        const userRef = firestore.collection("users").doc(auth.currentUser.uid)
        const postsRef = firestore.collection("posts").where("userId", "==", auth.currentUser.uid).get()
        const commentsRef = firestore.collection("comments").where("userId", "==", auth.currentUser.uid).get()
        storageRef.put(file).on("state_changed",
         (snap) => {
             let percentage = (snap.bytesTransferred / snap.totalBytes) * 100
             setProgress(percentage)
         },
         (err) => {
             setError(err)
         }, 
         async() => {
             let url = await storageRef.getDownloadURL()
             await userRef.update({imageUrl: url})
             if (!(await postsRef).empty) {
                 (await postsRef).forEach(doc => doc.ref.update({imageUrl: url}))
             }
             if (!(await commentsRef).empty) {
                 (await commentsRef).forEach(doc => doc.ref.update({imageUrl: url}))
             }
             setUrl(url)
         } )
    }, [file])

    return {url, error, progress}
}

export default useStorage