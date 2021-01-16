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

class Debits extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newDebitAmount: 0,
      newDebitDescription: "",
    };
  }

  changeAmount = (e) => {
    this.setState({ newDebitAmount: e.target.value });
  };

  changeDescription = (e) => {
    this.setState({ newDebitDescription: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    let currentDate = new Date().toLocaleString();
    let obj = {
      amount: Number(this.state.newDebitAmount),
      description: this.state.newDebitDescription,
      date: currentDate,
    };

    this.props.updateDebitData(obj);
  };

  render() {
    return (
      <div className="display">
        <div className="header">
          <h2>Debits</h2>
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
                  value={this.newDebitAmount}
                />
              </div>
              <div>
                <label>Description</label>
                <input
                  type="text"
                  name="description"
                  onChange={this.changeDescription}
                  value={this.state.newDebitDescription}
                />
              </div>
              <button>Add New Debit</button>
            </form>
          </div>
          <div>
            {this.props.debitData.map((item, index) => (
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

export default Debits;
