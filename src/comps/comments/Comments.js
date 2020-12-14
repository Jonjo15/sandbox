import React from 'react'
import {Link} from "react-router-dom"
import Card from "@material-ui/core/Card"
import dayjs from "dayjs"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import useComments from "../../hooks/useComments"
import DeleteCommentButton from "./DeleteCommentButton"
var relativeTime = require('dayjs/plugin/relativeTime')

export default function Comments({postData}) {
    const {comments} = useComments(postData.postId);
    dayjs.extend(relativeTime)
    const commentMarkUp = comments.map((comment, index) => 
    (<Card className="comment-card" key={comment.commentId}>
        <Grid container>
            <Grid item sm={2}>
                <img className="comment-img" src={comment.imageUrl} alt="profile"/>
            </Grid>
            <Grid style={{marginTop: 10}} item sm={4}>
                <Typography component={Link}  to={`/users/${comment.userId}`} color="primary" variant="h5">{comment.username}</Typography>
                <Typography color="textSecondary" variant="body2">{dayjs(postData.createdAt).fromNow()}</Typography>
                <br />
            </Grid>
            <Grid item sm= {6} style={{marginTop: 25}}>
                <Typography variant="body1">{comment.body}</Typography>
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