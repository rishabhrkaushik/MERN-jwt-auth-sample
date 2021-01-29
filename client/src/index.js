import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import './index.css';
import App from './Components/App/App';
import Signin from './Components/Signin/Signin';
import Signup from './Components/Signup/Signup';
import Cities from "./Components/Cities/Cities";


import reportWebVitals from './reportWebVitals';

ReactDOM.render(
        <Router>
            <Switch>
                <Route exact path="/">
                    <App />
                </Route>
                <Route exact path="/signin">
                    <Signin />
                </Route>
                <Route exact path="/signup">
                    <Signup />
                </Route>
                <Route exact path="/cities">
                    <Cities />
                </Route>
                <Route path="*">
                    <h1>
                        Not Found
                    </h1>
                </Route>
            </Switch>
        </Router>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
