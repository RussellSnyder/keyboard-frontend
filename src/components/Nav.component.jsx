import React, { Component } from 'react';
import { NavLink } from "react-router-dom";

export class Nav extends Component {
    render() {
        // var currentRouteName = this.context.router.getCurrentPathname();
        // console.log(currentRouteName);
        return (
            <nav className="navbar navbar-expand-sm navbar-light bg-light">
                <NavLink className="navbar-brand" to="/">FlowKey ♪♫♬ Challenge</NavLink>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"/>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <NavLink exact={true} activeClassName="active" className="nav-link" to="/">Track List</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink activeClassName="active" className="nav-link" to="/about">About</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink activeClassName="active" className="nav-link" to="/new">New Song</NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    };
}

export default Nav;

