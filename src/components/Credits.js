import React, { Component } from "react";
import {
  Link,
  Redirect,
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Card from "./Card";
import Home from "./Home";

class Credits extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newCreditAmount: 0,
      newCreditDescription: "",
    };
  }

  changeAmount = (e) => {
    this.setState({ newCreditAmount: e.target.value });
  };

  changeDescription = (e) => {
    this.setState({ newCreditDescription: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    let currentDate = new Date().toLocaleString();
    let obj = {
      amount: Number(this.state.newCreditAmount),
      description: this.state.newCreditDescription,
      date: currentDate,
    };

    this.props.updateCreditData(obj);
  };

  render() {
    return (
      <div className="display">
        <div className="header">
          <h2>Credits</h2>
        </div>
        <div className="links">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
          </ul>
        </div>
        <div>
          <div className="displayBalance">
            Balance: {this.props.accountBalance.toFixed(2)}
          </div>
          <div className="form">
            <form onSubmit={this.handleSubmit}>
              <div>
                <label>Amount</label>
                <input
                  type="text"
                  name="amount"
                  onChange={this.changeAmount}
                  value={this.newCreditAmount}
                />
              </div>
              <div>
                <label>Description</label>
                <input
                  type="text"
                  name="description"
                  onChange={this.changeDescription}
                  value={this.state.newCreditDescription}
                />
              </div>
              <button>Add New Credit</button>
            </form>
          </div>
          <div>
            {this.props.creditData.map((item, index) => (
              <Card
                key={index}
                description={item.description}
                amount={item.amount}
                date={new Date(item.date).toLocaleString()}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Credits;
