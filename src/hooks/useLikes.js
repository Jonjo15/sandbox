import {useState, useEffect} from "react"
import {firestore, auth} from "../firebase/config"

const useLikes = (postData) => {
    const [likes, setLikes] = useState([])
    const [length, setLength] = useState(0)
    useEffect(() => {
        const unsub = firestore.collection("likes").where("userId", "==", auth.currentUser.uid).where("postId", "==", postData.postId)
        .onSnapshot(snap => {
            let docs = []
            snap.forEach(doc => {
                docs.push({...doc.data(), likeId: doc.id})
            })
            setLikes(docs)
            setLength(docs.length)

        })
        return () => unsub();
    }, [postData.postId])

    return {likes, setLikes, length, setLength}
}
export default useLikes