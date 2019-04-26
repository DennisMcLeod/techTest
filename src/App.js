import React, { Component } from "react";
import ExpenseInputForm from "./Components/ExpenseInputForm.js";
import ExpenseReport from "./Components/ExpenseReport.js";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expenseReports: [],
      exchangeRates: {},
      expenseTotal: 0
    };
  }

  componentDidMount() {
    const exchangeRatesEndpoint =
      "https://api.exchangeratesapi.io/latest?base=CAD";

    fetch(exchangeRatesEndpoint)
      .then(response => response.json())
      .then(data => {
        this.setState({
          exchangeRates: data.rates
        });
      });
  }
  getReceiptDetails = (expenseDescription, expenseAmount, expenseCurrency) => {
    if (this.state.expenseReports.length >= 5) {
      alert("Maximum five expense reports");
      return;
    }

    if (!expenseCurrency || !expenseDescription || expenseAmount === 0) {
      alert("Please complete all fields");
      return;
    }

    if (
      this.state.expenseTotal +
        expenseAmount * this.state.exchangeRates[expenseAmount] >=
      1000
    ) {
      alert("Expense reports should be lower than $1000 CAD");
      return;
    }

    this.setState(
      {
        expenseReports: [
          ...this.state.expenseReports,
          {
            expenseDescription: expenseDescription,
            expenseAmount: expenseAmount,
            expenseCurrency: expenseCurrency
          }
        ]
      },
      () => {
        const expenseTotal = this.state.expenseReports.reduce((a, b) => ({
          expenseAmount:
            parseInt(
              a.expenseAmount * this.state.exchangeRates[expenseCurrency]
            ) +
            parseInt(
              b.expenseAmount * this.state.exchangeRates[expenseCurrency]
            )
        }));

        this.setState({
          expenseTotal: expenseTotal.expenseAmount
        });
      }
    );
  };

  render() {
    return (
      <div className="App">
        <ExpenseInputForm
          getReceiptDetails={this.getReceiptDetails}
          exchangeRates={this.state.exchangeRates}
        />
        <ExpenseReport
          expenseReports={this.state.expenseReports}
          exchangeRates={this.state.exchangeRates}
          expenseTotal={this.state.expenseTotal}
        />
      </div>
    );
  }
}

export default App;
