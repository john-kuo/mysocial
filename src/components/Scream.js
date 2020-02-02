import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import Link from 'react-router-dom/Link'

//MUI
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const styles = {
    card: {
        display: 'flex',
        marginBottom: 20
    },
    image: {
        minWidth: 200
    },
    content: {
        padding: 25,
        objectFit: 'cover'
    }
}

class Scream extends Component {    
    render() {
        const { classes, scream: {body, createdAt, userImage, userHandle, screamId} } = this.props

        return (
            <Card className={classes.card}>
                <CardMedia 
                className={classes.image}
                image="https://i.imgur.com/bl3Mp3N.jpg"
                title="Profile Image"/>
                <CardContent className={classes.content}>
                    <Typography variant="h5" 
                                component={Link} 
                                to={`users/${userHandle}`} color="primary">{userHandle}</Typography>
                    <Typography variant="body2" color="textSecondary">{createdAt._second}</Typography>
                    <Typography variant="body1">{body}</Typography>
                </CardContent>
                
            </Card>            
        )
    }
}

export default withStyles(styles)(Scream);
