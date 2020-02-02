import React, { Component, Fragment } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import axios from 'axios';


//MUI
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
// Icons
import EditIcon from '@material-ui/icons/Edit';


const styles = (theme) => ({
    paper: {
      padding: 20
    },
    profile: {
      '& .image-wrapper': {
        textAlign: 'center',
        position: 'relative',
        '& button': {
          position: 'absolute',
          top: '80%',
          left: '70%'
        }
      },
      '& .profile-image': {
        margin: 'auto',
        width: 200,
        height: 200,
        objectFit: 'cover',
        maxWidth: '100%',
        borderRadius: '50%'
      },
      '& .profile-details': {
        textAlign: 'center',
        '& span, svg': {
          verticalAlign: 'middle'
        },
        '& a': {
          color: theme.palette.primary.main
        }
      },
      '& hr': {
        border: 'none',
        margin: '0 0 10px 0'
      },
      '& svg.button': {
        '&:hover': {
          cursor: 'pointer'
        }
      }
    },
    buttons: {
      textAlign: 'center',
      '& a': {
        margin: '20px 10px'
      }
    }
  });

class Profile extends Component {

  state = {
    handle: '',
    email: '',
    address: '',
    birthday: '',
    questionone: '',
    questiontwo: '',
    questionthree: '',
    open:false
  };


  uploadImage = (formData) => {
      axios
      .post('/user/image', formData)
      .then(() => {
          this.getUserData();
      })
      .catch((err) => console.log(err));              
  };

  handleEditPicture = () => {
      const fileInput = document.getElementById('imageInput');
      fileInput.click();
  };

  getUserData = () => {
      axios
      .post('/user/detail')
      .then((res) => {
          this.props.user = res.data;
      })
      .catch((err) => {
        localStorage.removeItem('FBIdToken');
        window.location.href = '/login';
      });
  }

  handleImageChange = (event) => {
      const image = event.target.files[0];
      const formData = new FormData();
      formData.append('image', image, image.name);
      this.uploadImage(formData);
  };

  editUserDetails = (userDetails) =>{
    axios
    .post('/user', userDetails)
    .then(() => {
      this.getUserData();
    })
    .catch((err) => console.log(err));
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = () => {
    const userDetails = {
      email: this.state.email,
      handle: this.state.handle
    };
    this.editUserDetails(userDetails);
    this.handleClose();
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

    render() {
        let { 
            classes,
            user: {handle, createdAt, email, address, birthday, questionone, questiontwo, questionthree, imageInput}
        } = this.props;
      

        let profileMarkup = ( 
            <Paper className={classes.paper}>
                <div className={classes.profile}>
                    <div className="profile-image">
                    <div className="image-wrapper">
                        <img src={imageInput} alt="profile" className="profile-image" />
                        <input
                          type="file"
                          id="imageInput"
                          hidden="hidden"
                          onChange={this.handleImageChange}
                        />
                        <Tooltip title="Edit profile picture" placement="top">
                          <IconButton onClick={this.handleEditPicture} className="button">
                            <EditIcon color="primary" />
                          </IconButton>
                        </Tooltip>
                      </div> 
                        <Fragment>
                          <Tooltip title="Edit details" placement="top">
                            <IconButton onClick={this.handleOpen} className={classes.button}>
                              <EditIcon color="primary" />
                            </IconButton>
                          </Tooltip>
                          <Dialog
                            open={this.state.open}
                            onClose={this.handleClose}
                            fullWidth
                            maxWidth="sm"
                          >
                        <DialogTitle>Edit your details</DialogTitle>
                        <DialogContent>
                          <form>
                            <TextField
                              name="handle"
                              tpye="text"
                              label="Handle"
                              multiline
                              rows="1"
                              placeholder="Your account handle"
                              className={classes.textField}
                              value={this.state.handle}
                              onChange={this.handleChange}
                              fullWidth
                            />
                            <TextField
                              name="address"
                              tpye="text"
                              label="address"
                              placeholder="Your address"
                              className={classes.textField}
                              value={this.state.address}
                              onChange={this.handleChange}
                              fullWidth
                            />
                            <TextField
                              name="birthday"
                              type="date"
                              label="birthday"
                              placeholder="Your birthday"
                              className={classes.textField}
                              value={this.state.birthday}
                              onChange={this.handleChange}
                              fullWidth
                            />
                            <TextField
                              name="questionone"
                              tpye="text"
                              label="questionone"
                              placeholder="Question One"
                              className={classes.textField}
                              value={this.state.questionone}
                              onChange={this.handleChange}
                              fullWidth
                            />
                            <TextField
                              name="questiontwo"
                              tpye="text"
                              label="questiontwo"
                              placeholder="Question Two"
                              className={classes.textField}
                              value={this.state.questiontwo}
                              onChange={this.handleChange}
                              fullWidth
                            />
                            <TextField
                              name="questionthree"
                              tpye="text"
                              label="questionthree"
                              placeholder="Question Three"
                              className={classes.textField}
                              value={this.state.questionthree}
                              onChange={this.handleChange}
                              fullWidth
                            />
                          </form>
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={this.handleClose} color="primary">
                            Cancel
                          </Button>
                          <Button onClick={this.handleSubmit} color="primary">
                            Save
                          </Button>
                        </DialogActions>
                      </Dialog>
                    </Fragment>
 
                    </div>
                    <hr/>
                    <div className="profile-details">
                        <h3>Handle</h3>
                        <Typography variant="body2">
                            {handle}
                        </Typography>
                        <h3>Email</h3>
                        <Typography variant="body2">
                            {email}
                        </Typography>
                        <h3>Address</h3>
                        <Typography variant="body2">
                            {address}
                        </Typography>
                        <h3>Birthday</h3>
                        <Typography variant="body2">
                          {birthday}
                        </Typography>
                        <h3>Question One</h3>
                        <Typography variant="body2">
                            {questionone}
                        </Typography>
                        <h3>Question Two</h3>
                        <Typography variant="body2">
                            {questiontwo}
                        </Typography>
                        <h3>Question Three</h3>
                        <Typography variant="body2">
                            {questionthree}
                        </Typography>
                    </div>
                </div>
            </Paper>
        ) 

        return profileMarkup;
    }
}

export default withStyles(styles)(Profile);
