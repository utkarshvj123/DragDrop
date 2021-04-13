import React, { Component } from 'react';
import './style.scss';
import '../../assets/styles/variable.scss';
import Login from '../../modules/Login/index';
import SignUp from '../../modules/SignUp/index';


export default class Card extends Component {

    render() {
        const { handleClick, signup, login } = this.props;
        return (
            <React.Fragment>
                <div className="custom-card">
                    {login ? (
                        <div>
                            <Login></Login>
                            <div className="mt-2 d-flex">
                                <span>click here to</span>
                                <div role="link" onClick={() => handleClick("signup")} className="card-link ml-1"> Sign Up?</div>
                            </div>
                        </div>
                    ) : null}
                    {signup ? (
                        <div>
                            <SignUp></SignUp>
                            <div className="mt-2 d-flex">
                                <span>click here to</span>
                                <div role="link" onClick={() => handleClick("login")} href="0" className="card-link ml-1"> Login</div>
                            </div>
                        </div>
                    ) : null}
                </div>
            </React.Fragment>
        )
    }
}
