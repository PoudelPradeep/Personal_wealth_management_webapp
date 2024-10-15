import React, { useState } from 'react';
import ExpenseForm from './ExpenseForm';

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);

  const addExpense = (expense) => {
    setExpenses([...expenses, expense]);
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <ExpenseForm onAddExpense={addExpense} />
      <ul>
        {expenses.map((expense, index) => (
          <li key={index}>
            {expense.description} - ${expense.amount} ({expense.category})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
