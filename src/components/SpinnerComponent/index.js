import React from "react";
import LoadingOverlay from "react-loading-overlay";
import styled, { css } from "styled-components";
import { useSelector } from "react-redux";

const DarkBackground = styled.div`
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 999999; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */

  ${(props) =>
    props.disappear &&
    css`
      display: block; /* show */
    `}
`;

const SpinnerComponent = () => {
  const spinnerState = useSelector(
    (state) => state?.isValidUser?.spinnerVisibility
  );
  return (
    <DarkBackground disappear={spinnerState}>
      <LoadingOverlay
        active={spinnerState}
        spinner
        text="Loading your content..."
        style={{ width: "100%", height: "100%" }}
        className="spinner-class"
      />
    </DarkBackground>
  );
};
export default SpinnerComponent;
