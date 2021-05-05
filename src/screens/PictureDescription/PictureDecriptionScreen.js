import { Button, TextField } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { useEffect, useState } from 'react';
import {pics} from '../../utils/DataHelper';
import InputAdornment from '@material-ui/core/InputAdornment';
import { useParams } from 'react-router';

function PictureDescriptionScreen(props) {
    const [comments, setComments] = useState([]);
    const [commentEditor, setCommentEditor] = useState("");
    let { index } = useParams();
    let details = pics[index];
    let ws;
    
    const initConnection = () => {
        if (ws) {
            ws.onerror = ws.onopen = ws.onclose = null;
            ws.close();
          }
        
          ws = new WebSocket('ws://localhost:8080');
          ws.onopen = () => {
            console.log('Connection opened!');
          }
          ws.onmessage = ({ data }) => {
              let parsedMessage = JSON.parse(data);
              let message = '';
              if(parsedMessage.room === index)
                message = parsedMessage.message;
             handleComment(message)
            }
          ws.onclose = function() {
            ws = null;
          }
    }

    const postComment = () => {
        if (!ws) {
            handleComment("No WebSocket connection :(");
            return ;
          }
          
          let data = {
            message: commentEditor,
            room: index
          }
          ws.send(JSON.stringify(data));
          handleComment(commentEditor);
        setCommentEditor("");
        
    };

    const handleComment = (comment) => {
        let allComments = [...comments];
        allComments.push(comment);
        setComments(allComments);
    };

    initConnection();
  return (
    <Grid container xs={12}>
        <Grid item xs={8}>
            <Grid item>
                <Typography gutterBottom variant="h5" component="span">
                    {details.name} 
                </Typography>
                <Typography gutterBottom color="textSecondary" variant="caption" component="span">
                     By: {details.artistName}
                </Typography>
            </Grid>
            <Grid item>
                <img src={details.url} alt={details.name} />
            </Grid>
        </Grid>

        <Grid item xs={4}>
            <div style={{border: '1px solid black', height: '700px'}}>
            <div style={{height: '90%'}}>
                {comments && comments.map(comment => <Typography gutterBottom variant="body1" component="p">{comment}</Typography>)}
            </div>
            <div>
                <TextField style={{width: '80%'}}
                            InputProps={{
                                startAdornment: <InputAdornment position="start">Message: </InputAdornment>
                              }}
                              value={commentEditor}
                              onChange={(e) => setCommentEditor(e.target.value)} />
                <Button variant="contained" style={{verticalAlign: 'bottom', marginLeft: '10px'}} onClick={postComment}>Send</Button>
                </div>
            </div>
                
        </Grid>
    </Grid>
  );

}

export default PictureDescriptionScreen;
