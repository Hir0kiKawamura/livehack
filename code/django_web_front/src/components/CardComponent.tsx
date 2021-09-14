import React from "react";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Card, CardActionArea, CardMedia, Button, CardContent, Typography, CardActions } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            maxWidth: 345,
        },
        media: {
            height: 145,
        }
    }),
);

export const CardComponent = () => {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image="イメージパス"
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        タイトル
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        説明
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary">
                    Share
                </Button>
                <Button size="small" color="primary">
                    Learn More
                </Button>
            </CardActions>
        </Card>
    );
}

export default CardComponent;