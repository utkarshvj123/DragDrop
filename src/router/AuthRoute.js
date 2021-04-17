import React from "react";
import { Route, Redirect } from "react-router-dom";
import Home from "../modules/Home";
import NavBar from "../components/NavBar";

import { useDispatch } from "react-redux";
import { authenticateUserAction } from "../modules/Login/actions";

export default function AuthRoute(props) {
  const { isValidUser } = props;
  const dispatch = useDispatch();
  return (
    <div>
      {isValidUser ? (
        <>
          <NavBar
            logout={() => dispatch(authenticateUserAction(false))}
            heading={"Devza"}
            buttonName={"Logout"}
            buttonClass="btn btn-primary"
          />
          <Route exact path="/home" component={Home} />
        </>
      ) : (
        <Redirect to="/login" />
      )}
    </div>
  );
}
