import React from "react";
import ReactFormInputValidation from "react-form-input-validation";
import "./style.scss";
import { withRouter } from "react-router-dom";
import styled from "styled-components";

const StyledLabel = styled.label`
  text-align: left;
`;

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
      errors: {},
    };
    this.form = new ReactFormInputValidation(this);
    this.form.useRules({
      name: "required",
      email: "required|email",
      password: "required",
      confirmPassword: "required",
    });
    this.form.onformsubmit = (fields) => {
      if (fields.password !== fields.confirmPassword) {
        console.log("password not matched");
      } else {
        localStorage.setItem("email", fields.email);
        localStorage.setItem("password", fields.password);
        this.props.history.push("/");
      }
    };
  }

  render() {
    return (
      <React.Fragment>
        <form onSubmit={this.form.handleSubmit}>
          <p className="custom-input">
            <StyledLabel>
              Name
              <input
                type="name"
                name="name"
                className="mt-2 form-control"
                onBlur={this.form.handleBlurEvent}
                onChange={this.form.handleChangeEvent}
                value={this.state.fields.name}
                autoComplete="off"
              />
            </StyledLabel>
            <label className="error">
              {this.state.errors.name ? this.state.errors.name : ""}
            </label>
          </p>
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
          <p className="custom-input">
            <StyledLabel>
              Confirm Password
              <input
                type="password"
                name="confirmPassword"
                className="mt-2 form-control"
                onBlur={this.form.handleBlurEvent}
                onChange={this.form.handleChangeEvent}
                value={this.state.fields.confirmPassword}
                autoComplete="off"
              />
            </StyledLabel>
            <label className="error">
              {this.state.errors.confirmPassword
                ? this.state.errors.confirmPassword
                : ""}
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

export default withRouter(SignUp);
