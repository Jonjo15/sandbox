import {firestore, auth} from "./config"

// export const getUserName = (uid) => {
    // firestore.collection("users").get().where("uid" == uid)
// }
// db.collection("app").document("users").collection(uid).document("notifications")
// db.collection("cities").doc("LA").set({
//     name: "Los Angeles",
//     state: "CA",
//     country: "USA"
// })
export const createUserData = async(userData, username) => {
    const userObj = {
        username,
        userId: userData.uid,
        email: userData.email
    }
    await firestore.collection("users").doc(username).set(userObj)
}

export const createPost = (body, username) => {
    let postObject = {
        username,
        body,
        createdAt: new Date().toISOString(),
        userId: auth.currentUser.uid
    }
    firestore.collection("posts").add(postObject)
    .then(() => console.log("Post created successfully"))
    .catch(err=>console.error(err.message))
        
}
// collection("cities").doc("DC").delete().then(function() {
//     console.log("Document successfully deleted!");
// }).catch(function(error) {
//     console.error("Error removing document: ", error);
// });
export const deletePost = (postId) => {
    console.log(postId)
    firestore.collection("posts").doc(postId)
    .delete()
    .then(() => console.log("post deleted"))
    .catch(err => console.error(err.message)) 
}
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
// export const createCredentials = (user) => {
//     const {setCredentials} = useUser()
//     firestore.collection("users").where("email", "==", user.email)
//     .get()
//     .then(function(querySnapshot) {
//         querySnapshot.forEach(doc => {
//             userCreds = {...doc.data()}
//         })
//     })
//     .then(() => {
//         return userCreds
//     })

// }