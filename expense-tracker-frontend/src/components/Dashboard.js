// src/components/Dashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Table,
  Navbar,
  Nav,
  Modal,
} from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';

function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    category: '',
  });
  const [editingExpense, setEditingExpense] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const token = localStorage.getItem('token');

  const fetchExpenses = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/expenses', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setExpenses(res.data);
    } catch (error) {
      alert('Please login again');
      window.location.href = '/';
    }
  };

  useEffect(() => {
    fetchExpenses();
    // eslint-disable-next-line
  }, []);

  const { name, amount, category } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    try {
      if (editingExpense) {
        // Update expense
        await axios.put(
          `http://localhost:5000/api/expenses/${editingExpense._id}`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setEditingExpense(null);
      } else {
        // Add new expense
        await axios.post('http://localhost:5000/api/expenses', formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      setFormData({ name: '', amount: '', category: '' });
      fetchExpenses();
      setShowModal(false);
    } catch (error) {
      alert(error.response.data.error);
    }
  };

  const onEdit = expense => {
    setFormData({
      name: expense.name,
      amount: expense.amount,
      category: expense.category,
    });
    setEditingExpense(expense);
    setShowModal(true);
  };

  const onDelete = async id => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      try {
        await axios.delete(`http://localhost:5000/api/expenses/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        fetchExpenses();
      } catch (error) {
        alert(error.response.data.error);
      }
    }
  };

  const onLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    window.location.href = '/';
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingExpense(null);
    setFormData({ name: '', amount: '', category: '' });
  };

  const handleShowModal = () => setShowModal(true);

  return (
    <>
      <Navbar bg="primary" variant="dark" className="mb-4">
        <Container>
          <Navbar.Brand href="#">Expense Tracker</Navbar.Brand>
          <Nav className="ml-auto">
            <Nav.Link onClick={onLogout}>Logout</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Container>
        <Row className="mb-4">
          <Col>
            <h2 className="text-center">Welcome to your Dashboard</h2>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col className="d-flex justify-content-end">
            <Button variant="primary" onClick={handleShowModal}>
              {editingExpense ? 'Edit Expense' : 'Add Expense'}
            </Button>
          </Col>
        </Row>

        <Row>
          <Col>
            {expenses.length > 0 ? (
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Amount ($)</th>
                    <th>Category</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {expenses.map(expense => (
                    <tr key={expense._id}>
                      <td>{expense.name}</td>
                      <td>{expense.amount}</td>
                      <td>{expense.category}</td>
                      <td>{new Date(expense.date).toLocaleDateString()}</td>
                      <td>
                        <Button
                          variant="info"
                          size="sm"
                          className="me-2"
                          onClick={() => onEdit(expense)}
                        >
                          <FaEdit />
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => onDelete(expense._id)}
                        >
                          <FaTrash />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <p>No expenses found. Add some expenses to get started.</p>
            )}
          </Col>
        </Row>
      </Container>

      {/* Modal for Adding/Editing Expense */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {editingExpense ? 'Edit Expense' : 'Add Expense'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
              <Form.Control
                name="category"
                value={category}
                onChange={onChange}
                type="text"
                placeholder="Enter category"
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="me-2">
              {editingExpense ? 'Update Expense' : 'Add Expense'}
            </Button>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancel
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Dashboard;
