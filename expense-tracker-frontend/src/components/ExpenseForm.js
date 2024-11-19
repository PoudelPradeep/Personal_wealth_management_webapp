// src/components/ExpenseForm.js
import React from 'react';
import { Form, Button } from 'react-bootstrap';

function ExpenseForm({ formData, onChange, onSubmit, editingExpense, handleCloseModal }) {
  const { name, amount, category } = formData;

  // Predefined categories
  const categories = ['Food', 'Entertainment', 'Education', 'Transportation', 'Health', 'Others'];

  return (
    <Form onSubmit={onSubmit}>
      <Form.Group controlId="name" className="mb-3">
        <Form.Label>Expense Name</Form.Label>
        <Form.Control
          name="name"
          value={name}
          onChange={onChange}
          type="text"
          placeholder="Enter expense name"
          required
        />
      </Form.Group>
      <Form.Group controlId="amount" className="mb-3">
        <Form.Label>Amount</Form.Label>
        <Form.Control
          name="amount"
          value={amount}
          onChange={onChange}
          type="number"
          placeholder="Enter amount"
          required
        />
      </Form.Group>
      <Form.Group controlId="category" className="mb-3">
        <Form.Label>Category</Form.Label>
        <Form.Select
          name="category"
          value={category}
          onChange={onChange}
          required
        >
          <option value="" disabled>
            Select a category
          </option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
      <Button variant="primary" type="submit" className="me-2">
        {editingExpense ? 'Update Expense' : 'Add Expense'}
      </Button>
      <Button variant="secondary" onClick={handleCloseModal}>
        Cancel
      </Button>
    </Form>
  );
}

export default ExpenseForm;
