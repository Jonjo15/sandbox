import React from "react"
import dayjs from "dayjs"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"
import DeleteButton from "./DeleteButton"
var relativeTime = require('dayjs/plugin/relativeTime')

const Post = ({postData}) => {
    dayjs.extend(relativeTime)
    return (
        <div className="ind-post">
            <Paper style={{position: "relative"}} elevation={3}>
                <Typography variant="body2">{postData.username}: {postData.body}</Typography>
                <Typography variant="subtitle1">{dayjs(postData.createdAt).fromNow()}</Typography>
                <DeleteButton userId={postData.userId} postId={postData.postId}/>
            </Paper>
            
        </div>
    )
}

export default Post