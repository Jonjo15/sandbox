import {useState, useEffect} from "react"
import {firestore, auth} from "../firebase/config"

const useLikes = (postId) => {
    const [likes, setLikes] = useState([])

    useEffect(() => {
        const unsub = firestore.collection("likes").where("userId", "==", auth.currentUser.uid).where("postId", "==", postId)
        .onSnapshot(data => {
            if (!data.empty) {
                    let docs = [];
                        data.forEach(doc => {
                            docs.push({likeId: doc.id, ...doc.data()})
                        })
                setLikes(docs)
            }
            
        })
        return () => unsub();
    }, [postId])

    return {likes, setLikes}
}
export default useLikes