import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./components/Profile";
import Nav from "./components/Nav";
import { AuthProvider } from "./Auth/Auth";
import Error from "./pages/Error";
import SignUp from "./pages/SignUp";
import AddGym from "./pages/AddGym";
import GymProfile from "./pages/GymProfile";
import firebase from "./firebase";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import UserProvder from "./UserProvider";
import { UserContext } from "./UserProvider";
import Routes from "./Routes"

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
    };
    this.authListener = this.authListener.bind(this);
  }
  componentDidMount() {
    this.authListener();
  }
  authListener() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
        localStorage.setItem('user', user.uid);
      } else {
        this.setState({ user: null });
        localStorage.removeItem('user');
      }
    });
  }
  render() {

    return (

      <div>
        
        <Nav />
        <Routes />

        <Footer />
        
      </div>

    );
  }
}

export default App;
