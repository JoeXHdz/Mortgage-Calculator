import React, { useState } from "react";
import "./index.css";

const App = () => {
  const [monthlyPayment, setMonthlyPayment] = useState(null);

  const handleCalculation = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const principal = parseFloat(formData.get("balance"));
    const annualRate = parseFloat(formData.get("rate")) / 100;
    const termYears = parseInt(formData.get("term"), 10);

    if (isNaN(principal) || isNaN(annualRate) || isNaN(termYears)) {
      setMonthlyPayment("");
      return;
    }

    const monthlyRate = annualRate / 12;
    const totalPayments = termYears * 12;
    const monthlyPayment =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) /
      (Math.pow(1 + monthlyRate, totalPayments) - 1);

    setMonthlyPayment(
      !isNaN(monthlyPayment) && monthlyPayment > 0
        ? monthlyPayment.toFixed(2)
        : ""
    );
  };

  return (
    <div>
      <section className="">
        <h3 className="">Mortgage Calculator</h3>
        <form onSubmit={handleCalculation} className="">
          <div>
            <label htmlFor="balance" className="">Mortgage Loan Balance (USD)</label>
            <input name="balance" type="number" required step="0.01" className="" />
          </div>
          <div>
            <label htmlFor="rate" className="">Annual Percentage Rate (APR)</label>
            <input name="rate" type="number" required step="0.01" className="" />
          </div>
          <div>
            <label htmlFor="term" className="">Loan Term (Years)</label>
            <select name="term" required className="">
              <option value="">Select Term</option>
              <option value="15">15 Years</option>
              <option value="30">30 Years</option>
            </select>
          </div>
          <div>
            <button type="submit" className="">Calculate</button>
          </div>
        </form>
        {monthlyPayment !== null && (
          <div id="output" className="">
            Monthly Payment: ${monthlyPayment}
          </div>
        )}
      </section>
    </div>
  );
};

export default App;
