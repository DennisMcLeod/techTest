import React, { Component } from "react";



class ExpenseInputForm extends Component {
  constructor() {
    super();
    this.state = {
      expenseDescription: '',
      expenseAmount: 0,
      expenseCurrency: null,
    };
  }

  handleDescriptionChange = (e) => {
    this.setState({
      expenseDescription: e.target.value
    })
  }
  handleAmountChange = (e) => {
    this.setState({
      expenseAmount: e.target.value
    })
  }
  handleCurrencyChange = (e) => {
    this.setState({
      expenseCurrency: e.target.value
    })
  }

  handleFormSubmit = e => {
    e.preventDefault()
    this.props.getReceiptDetails(this.state.expenseDescription, this.state.expenseAmount, this.state.expenseCurrency)
  }

  
  render() {
    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <label htmlFor="expenseDescription" className="visuallyHidden">
            Enter Description of Receipt
          </label>
          <input
            id="receiptDescription"
            type="text"
            placeholder="Enter Description of Receipt"
            name="expenseDescription"
            value={this.state.expenseDescription}
            onChange={this.handleDescriptionChange}
          />
          <label htmlFor="expenseAmount">
            Enter Amount of Receipt
          </label>
          <input
            id="receiptAmount"
            type="number"
            placeholder="Enter Amount of Receipt"
            name="expenseAmount"
            value={this.state.expenseAmount}
            onChange={this.handleAmountChange}
            required
          />
          <label htmlFor="expenseAmount">
            Enter Amount of Receipt
          </label>
          <select name="expenseCurrency" id="expenseCurrency" onChange={this.handleCurrencyChange}>
            <option value="">Select Currency</option>
            {Object.keys(this.props.exchangeRates).map((currency, index) => {
              return(
              <option key={index} value={currency}>
                {currency}
              </option>
                
              )
            })}
          </select>
          <button type="submit">
            Submit Expense Report
          </button>
          </form>
      </div>
    );
  }
}

export default ExpenseInputForm;