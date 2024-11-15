import React, { useEffect, useState } from 'react';
import "../styles.css";

const ExpenseForm = ({ onAddExpense, formValues, updateFormValues, noUpdate, setUpdate }) => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');

  // Sync form state with formValues only if formValues has values
  useEffect(() => {
      setAmount(formValues.amount || '');
      setDescription(formValues.description || '');
      setCategory(formValues.category || '');
  }, [formValues]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddExpense({ amount, description, category });

    // Reset local state after submission
    setAmount('');
    setDescription('');
    setCategory('');
    setUpdate(false); // Switch to "Add Expense" mode
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => {
          setAmount(e.target.value);
          updateFormValues('amount', e.target.value);
        }}
        required
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
          updateFormValues('description', e.target.value);
        }}
        required
      />
      <select
        value={category}
        onChange={(e) => {
          setCategory(e.target.value);
          updateFormValues('category', e.target.value);
        }}
        required
      >
        <option value="">Select Category</option>
        <optgroup label="Food & Dining">
          <option value="Groceries">Groceries</option>
          <option value="Restaurants">Restaurants</option>
          <option value="Coffee Shops">Coffee Shops</option>
          <option value="Fast Food">Fast Food</option>
          <option value="Alcohol & Bars">Alcohol & Bars</option>
        </optgroup>
        <optgroup label="Transportation">
          <option value="Public Transport">Public Transport</option>
          <option value="Fuel/Gas">Fuel/Gas</option>
          <option value="Taxi/Ride-Sharing">Taxi/Ride-Sharing</option>
          <option value="Vehicle Maintenance">Vehicle Maintenance</option>
          <option value="Parking">Parking</option>
        </optgroup>
        <optgroup label="Housing">
          <option value="Rent/Mortgage">Rent/Mortgage</option>
          <option value="Utilities">Utilities</option>
          <option value="Internet">Internet</option>
          <option value="Maintenance & Repairs">Maintenance & Repairs</option>
        </optgroup>
        <optgroup label="Healthcare">
          <option value="Medical Bills">Medical Bills</option>
          <option value="Pharmacy">Pharmacy/Prescriptions</option>
          <option value="Health Insurance">Health Insurance</option>
          <option value="Dental Care">Dental Care</option>
          <option value="Vision Care">Vision Care</option>
        </optgroup>
        <optgroup label="Miscellaneous">
          <option value="Miscellaneous">Miscellaneous</option>
        </optgroup>
      </select>
      <button type="submit">{noUpdate ? 'Update Expense' : 'Add Expense'}</button>
    </form>
  );
};

export default ExpenseForm;
