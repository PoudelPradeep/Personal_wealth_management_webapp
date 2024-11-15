import React, { useState } from 'react';
import ExpenseForm from '../components/ExpenseForm';

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [formValues, setFormValues] = useState({
    amount: '',
    description: '',
    category: ''
  });
  const [noUpdate, setNoUpdate] = useState(false);

  const addOrUpdateExpense = (expense) => {
    if (editingIndex !== null) {
      const updatedExpenses = expenses.map((item, index) =>
        index === editingIndex ? expense : item
      );
      setExpenses(updatedExpenses);
      setEditingIndex(null);
    } else {
      setExpenses([...expenses, expense]);
    }

    // Clear formValues after the form in ExpenseForm has reset
    setFormValues({ amount: '', description: '', category: '' });
    setNoUpdate(false);
  };

  const deleteExpense = (index) => {
    setExpenses(expenses.filter((element, i) => i !== index));
  };

  const editExpense = (index) => {
    const expenseToEdit = expenses[index];
    setEditingIndex(index);
    setFormValues(expenseToEdit);
    setNoUpdate(true);
  };

  const updateFormValues = (field, value) => {
    setFormValues({ ...formValues, [field]: value });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Dashboard</h2>
      <ExpenseForm
        onAddExpense={addOrUpdateExpense}
        formValues={formValues}
        updateFormValues={updateFormValues}
        noUpdate={noUpdate}
        setUpdate={setNoUpdate}
      />
      <h3>Your Expenses</h3>
      <ul>
        {expenses.map((expense, index) => (
          <li key={index}>
            {expense.description} - ${expense.amount} ({expense.category})
            <button onClick={() => editExpense(index)}>Edit</button>
            <button onClick={() => deleteExpense(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
