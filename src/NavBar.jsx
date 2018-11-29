import React, { Component } from "react";

class NavBar extends Component {
  render() {
    return (
      <div>
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
        <span className="userCount">Users Online: {this.props.users}</span>
      </nav>
      </div>
    );
  }
}

export default NavBar;
