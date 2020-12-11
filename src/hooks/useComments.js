import {useState, useEffect} from "react"
import {firestore} from "../firebase/config"

const useComments = (postId) => {
    const [comments, setComments] = useState([])

    useEffect(() => {
        const unsub = firestore.collection("comments").where("postId", "==", postId)
        .onSnapshot(snap => {
            let docs = []
            snap.forEach(doc => {
                docs.push({...doc.data(), commentId: doc.id})
            })
            setComments(docs)
        })


        return () => unsub()
    }, [postId])

    return {comments}
}

export default useComments