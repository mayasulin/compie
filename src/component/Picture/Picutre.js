import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: '250px',
  },
  media: {
    height: 140,
  },
});

function PictureCard(props) {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={props.details.url}
          title={props.details.decription}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.details.name}
          </Typography>
          <Typography gutterBottom color="textSecondary" variant="caption" component="p">
            By: {props.details.artistName}
          </Typography>
          <Typography variant="body2" component="p">
            {props.details.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default PictureCard;