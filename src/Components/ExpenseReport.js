import React, { Component } from "react";

class ExpenseReport extends Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
      <div>
        {this.props.expenseReports.map((report, index) => {
          const convertedAmount =
            report.expenseAmount *
            this.props.exchangeRates[report.expenseCurrency];

          return (
            <div key={index}>
              <h2>{`Receipt #${index + 1}`}</h2>
              <span>{report.expenseDescription}</span>
              <span>{`Currency: ${report.expenseCurrency}`}</span>
              <span>{`Amount in CAD: ${convertedAmount}`}</span>
            </div>
          );
        })}
        <span>{`Expense Report Total: ${this.props.expenseTotal}`}</span>
      </div>
    );
  }
}

export default ExpenseReport;
