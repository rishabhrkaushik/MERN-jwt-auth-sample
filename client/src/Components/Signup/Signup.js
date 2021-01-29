import './Signup.css';

import React, { Component } from 'react';

import {Link} from "react-router-dom";

import Cookie from "js-cookie"

import {createGetRequest, createPostRequest} from '../../actions/httpRequest';

class Signup extends Component {
    constructor( props ){
        super( props );
        this.state = {
            username: "",
            password: "",
        }
        this.post = {
            username: "",
            password: ""
        }

        this.recievedData = {}

        this.handleLogin = this.handleLogin.bind(this);
    }

    handleLogin = async (e) => {
        this.post = this.state;

        e.preventDefault()

        createPostRequest('/api/auth/signup', this.post, 'json').then((res) => {
                        if(res !== undefined && res !== {}){
                            console.log(res["message"])
                        }
                        else{
                            console.error("Res undefined")
                        }
        })
    }

    render(){

        return (<div className="wrapper fadeInDown">
            <div className="fadeIn first">
                <h1>Sign Up</h1>
            </div>

            <div id="formContent">
                <form>
                    <input type="text" id="username" className="fadeIn second" name="username" placeholder="Username"
                        onChange={ ( e ) => {
                                    this.setState( {
                                        username: e.target.value,
                                    });
                                } }>
                    </input>
                    <input type="text" id="password" className="fadeIn third" name="password" placeholder="Password"
                        onChange={(e) => {
                                    this.setState( {
                                        password: e.target.value,
                                    });
                                }}>
                    </input>
                    <input type="button" className="fadeIn fourth" value="Log In"
                        onClick={ this.handleLogin }>
                    </input>
                </form>
            </div>
            <div className="buttons">
                <Link to="/signin">
                    <input type="button" value="Sign In"></ input>
                </Link >
                <Link to="/cities">
                    <input type="button" value="Cities"></ input>
                </Link >
            </div>
        </div>
    )}
}

export default Signup;
