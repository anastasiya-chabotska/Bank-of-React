import React, { Component } from "react";
import { Link } from "react-router-dom";

class UserProfile extends Component {
  render() {
    console.log(this.props.userName);
    return (
      <div className="display">
        <div className="header">
          <h1>User Profile</h1>
        </div>
        <div className="links">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Log In</Link>
            </li>
          </ul>
        </div>
        <div>Username: {this.props.userName}</div>
        <div>Member Since: {this.props.memberSince}</div>
      </div>
    );
  }
}

export default UserProfile;
