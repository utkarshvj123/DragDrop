import React, { Component } from 'react';
import Card from '../../components/Card';  
import './style.scss';




export default class LandingPage extends Component {

    constructor(props){
        super(props);
        this.state={
            signUp:false,
            login:true
        }
    }
   
    
    onClickHandle=(value)=>{
    if(value === "login") return this.setState({login:true,signUp:false})
    else return this.setState({login:false,signUp:true})
    }

    render() {
        return (
            <React.Fragment>
                <div className='main-container'>
                    <div className="sub-container">
                        <div className="login-page"></div>
                        <Card signup={this.state.signUp} login={this.state.login} handleClick={this.onClickHandle}></Card>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
