import React from 'react'
// import IconButton from "@material-ui/core/IconButton";
import Card from "@material-ui/core/Card"
import dayjs from "dayjs"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import useComments from "../hooks/useComments"
import DeleteCommentButton from "./DeleteCommentButton"
var relativeTime = require('dayjs/plugin/relativeTime')

// let commentObject = {
//     username: credentials.username,
//     body,
//     imageUrl,
//     createdAt: new Date().toISOString(),
//     userId: auth.currentUser.uid,
//     postId: postData.postId
// }
export default function Comments({postData}) {
    const {comments} = useComments(postData.postId);
    dayjs.extend(relativeTime)
    const commentMarkUp = comments.map((comment, index) => 
    (<Card key={comment.commentId}>
        <Grid container>
            <Grid item sm>
                <img className="comment-img" src={comment.imageUrl} alt="profile"/>
            </Grid>
            <Grid item sm>
                <Typography color="primary" variant="h5">{comment.username}</Typography>
                <Typography variant="h6">{comment.body}</Typography>
                <Typography variant="subtitle2">{dayjs(postData.createdAt).fromNow()}</Typography>
                <DeleteCommentButton postId={postData.postId} userId={comment.userId} commentId={comment.commentId}/>
            </Grid>
        </Grid>
        {index !== comments.length -1 ? (<hr className="visible-separator"/>) : null}
    </Card>)
    )
    return (
        commentMarkUp
    )

    }