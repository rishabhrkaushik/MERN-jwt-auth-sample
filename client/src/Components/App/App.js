import './App.css';

import {Link} from "react-router-dom";

import Cookie from "js-cookie"

function handleSignout() {
    Cookie.remove("token");
}

function App() {
    return (
        <div style = {{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh"
        }}>
            <div style = {{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }} >
                <Link to = "/signin" >
                    <input type = "button" value = "Sign In"  />
                </Link >
                <Link to = "/signup" >
                    <input type = "button" value = "Sign Up"  />
                </Link >
                <Link to = "/cities" >
                    <input type = "button" value = "Cities"  />
                </Link >
                <input type = "button" value = "Signout"
                    onClick = {
                        handleSignout()
                    } />
            </div >
        </ div>
    );
}

    export default App;
