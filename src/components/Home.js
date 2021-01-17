import React, { Component } from "react";
import AccountBalance from "./AccountBalance";
import { Link } from "react-router-dom";
import bankLogo from "./bank.png";

class Home extends Component {
  render() {
    return (
      <div className="home">
        <div className="header">
          {/* <img src={bankLogo} alt="bank" /> */}
          <h1>Bank of React</h1>
        </div>
        <div className="links">
          <ul>
            <li>
              <Link to="/userProfile">User Profile</Link>
            </li>
            <li>
              <Link to="/debits">Debits</Link>
            </li>
            <li>
              <Link to="/credits">Credits</Link>
            </li>
          </ul>
        </div>
        <AccountBalance accountBalance={this.props.accountBalance} />
      </div>
    );
  }
}

export default Home;
