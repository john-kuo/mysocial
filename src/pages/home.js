import React, { Component } from 'react'

import Grid from '@material-ui/core/Grid'
import axios from 'axios'

import Profile from '../components/Profile';

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
            const token = localStorage.FBIdToken;
            let profileMarkup = token
            ? (<Profile user={this.state.userData}/>) 
            : <p>You have to login to see your profile</p>
        return (
            <Grid container spacing={3}>
                <Grid item xs={12}>
                   {profileMarkup}
                </Grid>
            </Grid>
        )
    }
}

export default home;
