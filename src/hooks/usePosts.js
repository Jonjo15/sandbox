import {useState, useEffect} from "react"
import {firestore} from "../firebase/config"

const useFirestore = (collection) => {
    const [posts, setPosts] = useState([])


    useEffect(() => {
        firestore.collection(collection)
        .orderBy("createdAt", "desc")
        .onSnapshot(snap => {
            let docs = []
            snap.forEach(post => {
                docs.push({postId: post.id, ...post.data() })
            })
            // console.log(docs)
            setPosts(docs)
        })
    }, [collection])

    return {posts}
}

export default useFirestore