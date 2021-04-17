import React from "react";
import ReactFormInputValidation from "react-form-input-validation";
import "./style.scss";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { authenticateUserAction } from "../Login/actions";
import styled from "styled-components";

const StyledLabel = styled.label`
  text-align: left;
`;

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: {
        email: "",
        password: "",
      },
      errors: {},
    };
    this.form = new ReactFormInputValidation(this);
    this.form.useRules({
      email: "required|email",
      password: "required",
    });
    this.form.onformsubmit = (fields) => {
      if (
        localStorage.getItem("email") === null &&
        localStorage.getItem("password") === null
      )
        return this.toastVisible("not registered please registered first");
      else if (localStorage.getItem("email") !== fields.email)
        return this.toastVisible("email not matched");
      else if (localStorage.getItem("password") !== fields.password)
        return this.toastVisible("password not matched");
      else {
        this.props.authenticateUserAction(true);
        this.props.history.push("/home");
      }
    };
  }

  toastVisible = (message) => {
    toast.dismiss();
    toast.error(message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  render() {
    return (
      <React.Fragment>
        <form onSubmit={this.form.handleSubmit}>
          <p className="custom-input">
            <StyledLabel>
              Email
              <input
                type="email"
                name="email"
                className="mt-2 form-control"
                onBlur={this.form.handleBlurEvent}
                onChange={this.form.handleChangeEvent}
                value={this.state.fields.email}
                autoComplete="off"
              />
            </StyledLabel>
            <label className="error">
              {this.state.errors.email ? this.state.errors.email : ""}
            </label>
          </p>
          <p className="custom-input">
            <StyledLabel>
              Password
              <input
                type="password"
                name="password"
                className="mt-2 form-control"
                onBlur={this.form.handleBlurEvent}
                onChange={this.form.handleChangeEvent}
                value={this.state.fields.password}
                autoComplete="off"
              />
            </StyledLabel>
            <label className="error">
              {this.state.errors.password ? this.state.errors.password : ""}
            </label>
          </p>

          <p>
            <button type="submit" className="btn btn-secondary">
              Submit
            </button>
          </p>
        </form>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ isValidUser }) => {
  return { isValidUser };
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    ...bindActionCreators({ authenticateUserAction }, dispatch),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
