import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'


import Grid from '@material-ui/core/Grid'
import AppIcon from '../images/icon.png';


import { Typography } from '@material-ui/core';

const styles = (theme) => ({
    ...theme.spreadIt  
});

class home extends Component {

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
