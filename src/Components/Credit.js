import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Debit extends Component {
    constructor(props) {
        super(props);
        this.state = { newDescription: '', newAmount: 0 }
    }
    onFormSubmit = (e) => {
        e.preventDefault();
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = mm + '/' + dd + '/' + yyyy;
        this.props.onSubmit(this.state.newAmount, this.state.newDescription, today);
    }
    collectDescription = (e) => {
        this.setState({ newDescription: e.target.value });
    }
    collectAmount = (e) => {
        this.setState({ newAmount: e.target.value });
    }
    render() {
        let balance = 0;
        const creditList = this.props.creditInfo.map((info) => {
            balance += parseInt(info.amount); 
            return (
                <div key={info.id} style={{ textAlign: 'center', padding: '20px', borderBottom: '1px solid black' }}>
                    <h4>Description: {info.description}</h4>
                    <h4>Date: {info.date}</h4>
                    <h4>Amount: {info.amount}</h4>
                </div>
            )
        })
        return (
            <div>
                <Link style={{ fontSize: '5rem' }} to='/'>Home</Link>
                <form style={{ fontSize: '2.5rem' }} onSubmit={this.onFormSubmit}>
                    <label>Credit Description</label>
                    <input type="text" onChange={this.collectDescription} />
                    <label>Credit Amount</label>
                    <input type="number" onChange={this.collectAmount} />
                    <button type="submit">Add to Debit</button>
                </form>
                <h1>Your Credit Balance: {balance}</h1>
                <h1>{creditList}</h1>
            </div>
        )
    }
}

export default Debit;