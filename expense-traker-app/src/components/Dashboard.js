import React, { useEffect, useState } from 'react';
import ExpenseForm from '../components/ExpenseForm';
import axios from 'axios';

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [formValues, setFormValues] = useState({ amount: '', description: '', category: '' });
  const [noUpdate, setNoUpdate] = useState(false);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/expenses');
      setExpenses(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const addOrUpdateExpense = async (expense) => {
    if (editingIndex !== null) {
      const updatedExpense = await axios.put(`http://localhost:5000/api/expenses/${expenses[editingIndex]._id}`, expense);
      setExpenses((prevExpenses) => prevExpenses.map((item, i) => (i === editingIndex ? updatedExpense.data : item)));
      setEditingIndex(null);
    } else {
      const newExpense = await axios.post('http://localhost:5000/api/expenses', expense);
      setExpenses([...expenses, newExpense.data]);
    }
    setFormValues({ amount: '', description: '', category: '' });
    setNoUpdate(false);
  };

  const deleteExpense = async (index) => {
    try {
      await axios.delete(`http://localhost:5000/api/expenses/${expenses[index]._id}`);
      setExpenses(expenses.filter((_, i) => i !== index));
    } catch (err) {
      console.error(err);
    }
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
          <li key={expense._id}>
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
