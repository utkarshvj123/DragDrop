import React from "react";
import "./style.css";
import PropTypes from "prop-types";

export default function NavBar(props) {
  const { heading, logout, buttonName, buttonClass } = props;

  return (
    <div>
      <nav className="navbar navbar-light">
        <div className="d-flex flex-row justify-content-between">
          <div>
            <h4>
              <b>{heading}</b>
            </h4>
          </div>
          <div>
            <button className={buttonClass} onClick={() => logout()}>
              {buttonName}{" "}
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}

NavBar.defaultProps = {
  heading: "Default",
  logout: () => {},
  buttonName: "Logout",
  buttonClass: "btn-primary",
};

NavBar.propTypes = {
  heading: PropTypes.string,
  logout: PropTypes.func,
  buttonName: PropTypes.string,
  buttonClass: PropTypes.string,
};
