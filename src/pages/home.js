import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'


import Grid from '@material-ui/core/Grid'
import axios from 'axios'
import AppIcon from '../images/icon.png';


import { Typography } from '@material-ui/core';

const styles = (theme) => ({
    ...theme.spreadIt  
});

class home extends Component {
    state = {
        screams: null,
        userData : {}
    }
    componentDidMount(){
        let token = localStorage.FBIdToken;
        axios.defaults.headers.common['Authorization'] = token;

        if (token) {
            this.getUserProfile(token);       
        }
    }

    getUserProfile = (token) => {
        axios
        .post('/user/detail')
        .then((res) => {
            this.setState({
                userData: res.data
            });
        })
        .catch((err) => {
            localStorage.removeItem('FBIdToken');
            window.location.href = '/login';
        });
    }


    render() {
        const {classes} = this.props;

        return (
            <Grid container className={classes.form}>
                <Grid item sm>
                    <div>
                        <img src={AppIcon} alt="monkey" className={classes.image} />
                        <Typography variant="h2" className={classes.pageTitle}>
                            Welcome To MySocial
                        </Typography>
                    </div>
                </Grid>
            </Grid>
        )
    }
}
export default withStyles(styles)(home)
