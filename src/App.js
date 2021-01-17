import logo from "./logo.svg";
import "./App.css";
import React, { Component } from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";

//components
import Home from "./components/Home";
import UserProfile from "./components/UserProfile";
import LogIn from "./components/LogIn";
import Debits from "./components/Debits";
import Credits from "./components/Credits";

class App extends Component {
  constructor() {
    super();
    this.state = {
      accountBalance: 14568.27,
      debitData: [],
      creditData: [],
      currentUser: {
        userName: "bob_loblaw",
        memberSince: "08/23/99",
      },
    };
  }

  componentDidMount() {
    this.fetchDebitData();
    this.fetchCreditData();
  }

  fetchDebitData() {
    fetch(`https://moj-api.herokuapp.com/debits`)
      .then((response) => response.json())
      .then((response) => {
        this.setState({ debitData: response });
        response.map((item) =>
          this.setState({
            accountBalance: this.state.accountBalance - item.amount,
          })
        );
      })

      .catch((error) => console.error(error));
  }

  fetchCreditData() {
    fetch(`https://moj-api.herokuapp.com/credits`)
      .then((response) => response.json())
      .then((response) => {
        this.setState({ creditData: response });
        response.map((item) =>
          this.setState({
            accountBalance: this.state.accountBalance + item.amount,
          })
        );
      })

      .catch((error) => console.error(error));
  }

  updateDebitData = (data) => {
    let arr = this.state.debitData;
    arr.unshift(data);
    this.setState({
      debitData: arr,
      accountBalance: this.state.accountBalance - data.amount,
    });
  };

  updateCreditData = (data) => {
    let arr = this.state.creditData;
    arr.unshift(data);
    this.setState({
      creditData: arr,
      accountBalance: this.state.accountBalance + data.amount,
    });
  };

  mockLogIn = (logInInfo) => {
    const newUser = { ...this.state.currentUser };
    //console.log(logInInfo.userName);
    newUser.userName = logInInfo.userName;
    this.setState({ currentUser: newUser });
  };

  render() {
    const HomeComponent = () => (
      <Home accountBalance={this.state.accountBalance} />
    );
    const UserProfileComponent = () => (
      <UserProfile
        userName={this.state.currentUser.userName}
        memberSince={this.state.currentUser.memberSince}
      />
    );
    const LogInComponent = () => (
      <LogIn
        user={this.state.currentUser}
        mockLogIn={this.mockLogIn}
        {...this.props}
      />
    );

    const DebitsComponent = () => (
      <Debits
        accountBalance={this.state.accountBalance}
        debitData={this.state.debitData}
        updateDebitData={this.updateDebitData}
      />
    );

    const CreditsComponent = () => (
      <Credits
        accountBalance={this.state.accountBalance}
        creditData={this.state.creditData}
        updateCreditData={this.updateCreditData}
      />
    );
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={HomeComponent} />
          <Route exact path="/userProfile" render={UserProfileComponent} />
          <Route exact path="/login" render={LogInComponent} />
          <Route exact path="/debits" render={DebitsComponent} />
          <Route exact path="/credits" render={CreditsComponent} />
        </Switch>
      </Router>
    );
  }
}

export default App;
