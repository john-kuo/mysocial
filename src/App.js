import React from 'react';
import  {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import './App.css'
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import themeFile from './util/theme'
import jwtDecode from 'jwt-decode'
import { Typography } from '@material-ui/core';

//pages
import home from './pages/home';
import profile from './components/Profile';
import login from './pages/login';
import signup from './pages/signup';
import NavBar from './components/Navbar';

const theme = createMuiTheme(themeFile)

const token = localStorage.FBIdToken;

if (token) {
  const decode = jwtDecode(token);

  if (!decode.exp * 1000 > Date.now()) {
    localStorage.removeItem('FBIdToken');
    window.location.href = '/login';
  }
}

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <div className="App">
      <Router>
      <NavBar/>
        <div className="container">
          <Switch>
            <Route exact path="/" component={home}/>
            <Route exact path="/login" component={login}/>
            <Route exact path="/signup" component={signup}/>
            <Route exact path="/profile" component={profile}/>
          </Switch>
        </div>
      </Router>
      <div>
      <Typography variant="body2">
        2020 My Social | By Nathan Kuo
      </Typography>  
      </div>
    </div>
    </MuiThemeProvider>
  );
}

export default App;
