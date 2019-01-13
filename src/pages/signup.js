import React, { Component } from 'react'
import Link from 'react-router-dom/Link'
import withStyles from '@material-ui/core/styles/withStyles'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography';
import axios from 'axios';


//MUI
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';



const styles = (theme) => ({
    ...theme.spreadIt
});


class signup extends Component {
    constructor(){
        super();
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            handle: '',
            address: '',
            birthday: '',
            questionone: '',
            questiontwo: '',
            questionthree: '',
            imageInput: '',
            errors: {}
        };
    }

     handleSubmit = (event) => {
        event.preventDefault();
        this.setState({
            loading: true
        })
        const newUserData = {
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            handle: this.state.handle,
            address: this.state.address,
            birthday: this.state.birthday,
            questionone: this.state.questionone,
            questiontwo: this.state.questiontwo,
            questionthree: this.state.questionthree,
            imageInput: this.state.imageInput
        }

        axios.post('/signup', newUserData)
        .then( res => {
            localStorage.setItem('FBIdToken', `Bearer ${res.data.token}`);
            this.setState({
                loading: false
            });
            window.location.href = '/profile';
        })
        .catch(error => {
            this.setState({
                errors: error.response.data,
                loading: false
            })
        });
    }

    handleImageChange = (event) => {
        const image = event.target.files[0];
        const formData = new FormData();
        formData.append('image', image, image.name);
        this.uploadImage(formData);
    };

    uploadImage = (formData) => {
        axios
      .post('https://2ndwind.xyz:444/api/images/upload', formData)
      .then((result) => {
          let imageURL = result.data.imageUrl;
          this.setState(
            {imageInput: imageURL}
          );
      })
      .catch((err) => console.log(err));              
    };
    
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
                    SignUp
                </Typography>
                <form noValidate onSubmit={this.handleSubmit}>
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
                    fullWidth
                    />
                    <TextField
                    id="password"
                    name="password"
                    type="password"
                    label="Password"
                    className={classes.textField}
                    helperText={errors.password}
                    error={errors.password ? true : false}
                    value={this.state.password}
                    onChange={this.handleChange}
                    fullWidth
                    />
                    <TextField
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    label="Confirm Password"
                    className={classes.textField}
                    helperText={errors.confirmPassword}
                    error={errors.confirmPassword ? true : false}
                    value={this.state.confirmPassword}
                    onChange={this.handleChange}
                    fullWidth
                    />
                    <TextField
                    id="handle"
                    name="handle"
                    type="text"
                    label="Handle"
                    className={classes.textField}
                    helperText={errors.handle}
                    error={errors.handle ? true : false}
                    value={this.state.handle}
                    onChange={this.handleChange}
                    fullWidth
                    />
                    <TextField
                    id="address"
                    name="address"
                    type="text"
                    label="Address"
                    className={classes.textField}
                    helperText={errors.address}
                    error={errors.address ? true : false}
                    value={this.state.address}
                    onChange={this.handleChange}
                    fullWidth
                    />
                    <TextField
                    id="birthday"
                    name="birthday"
                    type="date"
                    label="Birthday"
                    className={classes.textField}
                    helperText={errors.birthday}
                    error={errors.birthday ? true : false}
                    value={this.state.birthday}
                    onChange={this.handleChange}
                    InputLabelProps={{
                        shrink: true,
                        }}
                    fullWidth
                    />
                    <TextField
                    id="questionone"
                    name="questionone"
                    type="text"
                    label="Security Question One"
                    className={classes.textField}
                    helperText={errors.questionone}
                    error={errors.questionone ? true : false}
                    value={this.state.questionone}
                    onChange={this.handleChange}
                    fullWidth
                    />
                    <TextField
                    id="questiontwo"
                    name="questiontwo"
                    type="text"
                    label="Security Question Two"
                    className={classes.textField}
                    helperText={errors.questiontwo}
                    error={errors.questiontwo ? true : false}
                    value={this.state.questiontwo}
                    onChange={this.handleChange}
                    fullWidth
                    />
                    <TextField
                    id="questionthree"
                    name="questionthree"
                    type="text"
                    label="Security Question Three"
                    className={classes.textField}
                    helperText={errors.questionthree}
                    error={errors.questiontwo ? true : false}
                    value={this.state.questionthree}
                    onChange={this.handleChange}
                    fullWidth
                    />
                    <Typography variant="h6" gutterBottom>
                        profile image
                        <input
                        type="file"
                        id="imageInput"
                        onChange={this.handleImageChange}
                        />
                    </Typography>
            
                    {errors.imageInput && (

                        <Alert severity="error">Please upload a profile image</Alert>
                    )}
                    {errors.general && (
                    <Typography variant="body2" className={classes.customError}>
                        {errors.general}
                    </Typography>
                    )}
                    <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    disabled={loading}
                    >
                    SignUp
                    {loading && (
                        <CircularProgress size={30} className={classes.progress} />
                    )}
                    </Button>
                    <br />
                    <small>
                    Already have an account ? Login <Link to="/login">here</Link>
                    </small>
                </form>
                </Grid>
                <Grid item sm />
            </Grid>
        );
    }
}


signup.prototypes = {
    classes : PropTypes.object.isRequired
}

export default withStyles(styles)(signup)
