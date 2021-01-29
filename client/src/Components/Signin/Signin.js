import './Signin.css';

import React, { Component } from 'react';

import {Link} from "react-router-dom";
import { Redirect } from "react-router-dom";

import Cookie from "js-cookie"

import {createGetRequest, createPostRequest} from '../../actions/httpRequest';

class Signin extends Component {
    constructor( props ){
        super( props );
        this.state = {
            username: "",
            password: "",
            loggedIn: false
        }
        this.post = {
            username: "",
            password: ""
        }

        this.recievedData = {}

        this.handleLogin = this.handleLogin.bind(this);
    }

    handleLogin = async (e) => {
        this.post["username"] = this.state["username"];
        this.post["password"] = this.state["password"];


        e.preventDefault()

        createPostRequest('/api/auth/signin', this.post, 'json').then((res) => {
                        if(res !== undefined && res !== {}){
                            var accessToken = res["accessToken"]
                            Cookie.set("token", accessToken);
                            console.log(accessToken)
                            if(accessToken !== null){
                                this.setState({
                                    loggedIn: true
                                })
                            }
                            else{
                                console.error("Res undefined")
                                this.setState({
                                    loggedIn: false,
                                    loginState: "Failed!"
                                })
                                alert("Failed!")
                            }
                        }
                        else{
                            console.error("Res undefined")
                            this.setState({
                                loggedIn: false,
                                loginState: "Failed!"
                            })
                            alert("Failed!")
                        }
        })
    }

    render(){

        if (this.state.loggedIn) {
            return <Redirect to={'/cities'} />
        }
        else{

      return (<div className="wrapper fadeInDown">
          <div className="fadeIn first">
              <h1>Sign In</h1>
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
                  <input type="password" id="password" className="fadeIn third" name="password" placeholder="Password"
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
              <Link to="/signup">
                  <input type="button" value="Sign Up"></ input>
              </Link >
              <Link to="/cities">
                  <input type="button" value="Cities"></ input>
              </Link >
          </div>
      </div>
  )}
  }
}

export default Signin;
