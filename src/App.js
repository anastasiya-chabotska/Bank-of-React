import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './Components/Home';
import UserProfile from './Components/UserProfile';
import LogIn from './Components/Login';
import Debit from './Components/Debit';
import Credit from './Components/Credit';
class App extends Component {

  constructor() {
    super();

    this.state = {
      accountBalance: 14568.27,
      currentUser: {
        userName: 'bob_loblaw',
        memberSince: '08/23/99',
      },
      debitInfo: [],
      creditInfo: []
    }
  }
  getInfo = () => {
    fetch("https://moj-api.herokuapp.com/debits", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
    })
      .then(res => res.json())
      .then(data => {
        let totalDebit = 0;
        for (let i = 0; i < data.length; i++) {
          totalDebit += data[i].amount;
        }
        this.setState({ totalDebit })

        // Set the info into state.debitInfo
        this.setState({ debitInfo: data })
      })
    fetch("https://moj-api.herokuapp.com/credits", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
    })
      .then(res => res.json())
      .then(data => {
        let totalCredit = 0;
        for (let i = 0; i < data.length; i++) {
          totalCredit += data[i].amount;
        }
        // Set the info into state.creditInfo
        this.setState({ creditInfo: data })
        this.setState({ totalCredit })
        this.setState({ accountBalance: this.state.accountBalance - this.state.totalDebit - this.state.totalCredit })
      })
  }
  addToDebit = (newAmount, newDescription, newDate) => {
    let temp = [{ description: newDescription, amount: newAmount, date: newDate }];
    this.setState({ debitInfo: this.state.debitInfo.concat(temp) })
  }
  componentDidMount() {
    this.getInfo();
  }
  mockLogIn = (logInInfo) => {
    const newUser = { ...this.state.currentUser }
    newUser.userName = logInInfo.userName
    this.setState({ currentUser: newUser })
  }
  addToCredit = (newAmount, newDescription, newDate) => {
    let temp = [{ description: newDescription, amount: newAmount, date: newDate }];
    this.setState({ creditInfo: this.state.debitInfo.concat(temp) })
  }
  render() {
    const CreditComponent = () => (<Credit creditInfo={this.state.creditInfo} onSubmit={this.addToCredit} />)
    const DebitComponent = () => (<Debit debitInfo={this.state.debitInfo} onSubmit={this.addToDebit} />)
    const LogInComponent = () => (<LogIn user={this.state.currentUser} mockLogIn={this.mockLogIn} {...this.props} />)
    const HomeComponent = () => (<Home accountBalance={this.state.accountBalance} />);
    const UserProfileComponent = () => (
      <UserProfile userName={this.state.currentUser.userName} memberSince={this.state.currentUser.memberSince} />
    );

    return (
      <Router>
        <div>
          <Route exact path="/" render={HomeComponent} />
          <Route exact path="/userProfile" render={UserProfileComponent} />
          <Route exact path="/login" render={LogInComponent} />
          <Route exact path="/debit" render={DebitComponent} />
          <Route exact path="/credit" render={CreditComponent} />
        </div>
      </Router>
    );
  }

}

export default App;