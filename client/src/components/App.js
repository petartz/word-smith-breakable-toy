import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { hot } from "react-hot-loader/root";
import getCurrentUser from "../services/getCurrentUser";
import "../assets/scss/main.scss";
import RegistrationForm from "./registration/RegistrationForm";
import SignInForm from "./authentication/SignInForm";
import TopBar from "./layout/TopBar";
import AuthenticatedRoute from "./authentication/AuthenticatedRoute";
import UserProfile from "./layout/UserProfile.js"
import LandingPage from "./layout/LandingPage.js";

import Dictionaries from "./layout/Dictionaries.js";
import DictionaryShow from "./layout/DictionaryShow.js";

const App = (props) => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const fetchCurrentUser = async () => {
    try {
      const user = await getCurrentUser()
      setCurrentUser(user)
    } catch(err) {
      setCurrentUser(undefined)
    }
  }

  useEffect(() => {
    fetchCurrentUser()
  }, [])

  return (
    <Router>
      <TopBar user={currentUser} />

      <Route exact path="/">
        <LandingPage/>
      </Route>

      <Switch>
        <AuthenticatedRoute
          exact={true}
          path= "/profile/:id"
          user={currentUser}
          component={UserProfile}
        />

        <Route exact path="/dictionaries">
          <Dictionaries user={currentUser}/>
        </Route>

        <Route exact path="/dictionaries/:id">
          <DictionaryShow user={currentUser}/>
        </Route>
        <Route exact path="/users/new" component={RegistrationForm} />
        <Route exact path="/user-sessions/new" component={SignInForm} />
      </Switch>
    </Router>
  );
};

export default hot(App);
