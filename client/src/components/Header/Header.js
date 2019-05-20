import React from "react";
import "./Header.css";

class Header extends React.Component {

    render() {
        return (

            <div className="jumbotron jumbotron-fluid">
                <div className="container">
                    <h1 className="display-3">Project Title</h1>
                    <p className="lead">What are we doing</p>
                    <hr className="my-2"></hr>
                </div>
            </div>




        )
    }
}

export default Header;