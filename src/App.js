import React from "react";
import "./App.css";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import { connect } from "react-redux";
import AuthRoute from "./router/AuthRoute";
import PropTypes from "prop-types";
import LandingPage from "./modules/LandingPage";
import SpinnerComponent from "./components/SpinnerComponent";

function App(props) {
  return (
    <div className="App">
      <Router>
        <SpinnerComponent />
        <Switch>
          <Route exact={true} path="/login" component={LandingPage} />
          <AuthRoute isValidUser={props.isValidUser?.getCurrentStatus} />
          <Route
            path="/"
            render={() => <Redirect from="/" to="/login" />}
          ></Route>
          <Redirect from="*" to="/login" />
        </Switch>
      </Router>
    </div>
  );
}

const mapStateToProps = ({ isValidUser }) => {
  return { isValidUser };
};
export default connect(mapStateToProps, null)(App);

App.defaultProps = {
  isValidUser: false,
};
App.propTypes = {
  isValidUser: PropTypes.bool,
};
