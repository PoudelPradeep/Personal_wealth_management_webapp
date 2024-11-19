// src/components/Dashboard.js
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import {
  Container,
  Row,
  Col,
  Button,
  Table,
  Navbar,
  Nav,
  Modal,
  Spinner,
} from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { AuthContext } from '../context/AuthContext';
import ExpenseForm from './ExpenseForm';
import ExpenseChart from './ExpenseChart';

function Dashboard() {
  const { auth, logout } = useContext(AuthContext);

  const [expenses, setExpenses] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    category: '',
  });
  const [editingExpense, setEditingExpense] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchExpenses = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/expenses`, {
        withCredentials: true,
      });
      setExpenses(res.data.expenses);
    } catch (error) {
      alert('Please login again');
      window.location.href = '/';
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
    // eslint-disable-next-line
  }, []);

  const onEdit = (expense) => {
    setFormData({
      name: expense.name,
      amount: expense.amount,
      category: expense.category,
    });
    setEditingExpense(expense);
    setShowModal(true);
  };

  const onDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      try {
        await axios.delete(`${process.env.REACT_APP_API_URL}/expenses/${id}`, {
          withCredentials: true,
        });
        fetchExpenses();
      } catch (error) {
        alert(error.response.data.message || 'Error deleting expense');
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingExpense(null);
    setFormData({ name: '', amount: '', category: '' });
  };

  const handleShowModal = () => setShowModal(true);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingExpense) {
        // Update expense
        await axios.put(
          `${process.env.REACT_APP_API_URL}/expenses/${editingExpense._id}`,
          formData,
          { withCredentials: true }
        );
        setEditingExpense(null);
      } else {
        // Add new expense
        await axios.post(`${process.env.REACT_APP_API_URL}/expenses`, formData, {
          withCredentials: true,
        });
      }
      setFormData({ name: '', amount: '', category: '' });
      fetchExpenses();
      setShowModal(false);
    } catch (error) {
      alert(error.response.data.message || 'Error submitting expense');
    }
  };

  return (
    <>
      <Navbar bg="primary" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#">Expense Tracker</Navbar.Brand>
          <Nav className="ml-auto">
            <Nav.Link onClick={logout}>Logout</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Container className="my-4">
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
            {loading ? (
              <div className="text-center">
                <Spinner animation="border" variant="primary" />
              </div>
            ) : expenses.length > 0 ? (
              <>
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
                    {expenses.map((expense) => (
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

                {/* Expense Chart */}
                
                <Row className="mt-5 justify-content-center" style={{height : '250px'}}>
                  
                      <ExpenseChart expenses={expenses} />
                    
                </Row>

              </>
            ) : (
              <p>No expenses found. Add some expenses to get started.</p>
            )}
          </Col>
        </Row>
      </Container>

      {/* Expense Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {editingExpense ? 'Edit Expense' : 'Add Expense'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ExpenseForm
            formData={formData}
            onChange={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
            onSubmit={onSubmit}
            editingExpense={editingExpense}
            handleCloseModal={handleCloseModal}
          />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Dashboard;
