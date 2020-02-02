import React, { Component } from 'react'
import Link from 'react-router-dom/Link'


import AppBar from '@material-ui/core/AppBar'
import ToolBar from '@material-ui/core/ToolBar'
import Button from '@material-ui/core/Button'

class NavBar extends Component {
    state = {
        isLoggedIn: false
    }

    componentDidMount() {
        if(localStorage.FBIdToken){
            this.setState({
                isLoggedIn: true
              });
        }

    }

    logout = (event) => {
        localStorage.removeItem('FBIdToken');
        window.location.href = '/login';
    };

    render() {
        return (
            <AppBar>
                <ToolBar className="nav-container">
                {!this.state.isLoggedIn ?
                    <div>
                        <Button color="inherit" component={Link} to="/">Home</Button>
                        <Button color="inherit" component={Link} to="/login">Login</Button>
                        <Button color="inherit" component={Link} to="/signup">Signup</Button>
                    </div>
                   : 
                   <div>
                        <Button color="inherit" component={Link} to="/">Home</Button>
                        <Button color="inherit" component={Link} to="/profile" >Profile</Button>
                        <Button color="inherit" onClick={this.logout} >Logout</Button>
                    </div>
                } 

                </ToolBar>
            </AppBar>
        )
    }
}

export default NavBar;
