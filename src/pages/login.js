import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import Typography from '@material-ui/core/Typography';
import axios from 'axios';


//MUI
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress';


const styles = (theme) => ({
    ...theme.spreadIt  
});


class login extends Component {
    constructor(){
        super();
        this.state = {
            email: '',
            password: '',
            confirmPassword:'',
            handle:'',
            loading: false,
            errors: {}
        };
    }

     handleSubmit = (event) => {
        event.preventDefault();
        this.setState({
            loading: true
        })
        const userData = {
            email: this.state.email,
            password: this.state.password
        }

        axios.post('login', userData)
        .then( res => {
            console.log(res.data);
            localStorage.setItem('FBIdToken', `Bearer ${res.data.token}`);
            this.setState({
                loading: false
            });
            window.location.href = '/profile';
        })
        .catch(error => {
            this.setState({
                errors: error,
                loading: false
            })
        });
    }
    
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        const {classes} = this.props;
        const {loading, errors} = this.state;

        return (
            <Grid container className={classes.form}>
                <Grid item sm />
                    <Grid item sm>
                        <Typography variant="h2" className={classes.pageTitle}>
                            Login
                        </Typography>
                        <form noValidate onSubmit={this.handleSubmit} autoComplete="off">
                        <TextField
                            id="email"
                            name="email"
                            type="email"
                            label="Email"
                            className={classes.textField}
                            helperText={errors.email}
                            error={errors.email ? true : false}
                            value={this.state.email}
                            onChange={this.handleChange}
                            fullWidth/>
                            {errors.general && (
                                <Typography variant="body2" className={classes.customeError}>
                                    {errors.general}
                                </Typography>
                            )}
                            <TextField id="password" 
                                name="password" 
                                type="password" 
                                label="password" 
                                className={classes.TextField}
                                helperText={errors.password}
                                error={errors.password ? true : false} 
                                onChange={this.handleChange}
                                value={this.state.password}  
                                fullWidth/>
                            <Button 
                            color="primary" 
                            type="submit" 
                            variant="outlined" 
                            disabled={loading}
                            className={classes.button}>Login</Button>
                            { loading && (
                                <CircularProgress size={30} className={classes.progress}/>
                            )}
                            <br/>
                        </form>
                    </Grid>
                <Grid item sm />    
            </Grid>
        );
    }
}

export default withStyles(styles)(login)
