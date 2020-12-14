import {useState, useEffect} from "react"
import {firestore} from "../firebase/config"

const useUsersPosts = (userId) => {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        const unsub = firestore.collection("posts")
        .orderBy("createdAt", "desc")
        .where("userId", "==", userId)
        .onSnapshot(snap => {
            let docs = []
            snap.forEach(doc => {
                docs.push({...doc.data(), postId: doc.id})
            })
            setPosts(docs)
        })


        return () => unsub()
    }, [userId])

    return {posts}
}

export default useUsersPosts