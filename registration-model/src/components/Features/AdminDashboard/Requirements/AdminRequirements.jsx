import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaExternalLinkAlt,
  FaEye,
  FaTimes,
} from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast } from 'react-toastify';

const AdminRequirements = () => {
  const { uid } = useParams();
  const [requirements, setRequirements] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editingRequirement, setEditingRequirement] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    itemName: '',
    quantity: '',
    description: '',
    productLink: '',
    priority: 'medium',
  });
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    fetchRequirements();
  }, []);

  const fetchRequirements = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/requirements');
      const data = await response.json();
      if (data.success) {
        setRequirements(data.data);
      }
    } catch (error) {
      console.error('Error fetching requirements:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const url = editingRequirement
        ? `http://localhost:5000/api/requirements/${editingRequirement.id}`
        : 'http://localhost:5000/api/requirements';
      
      const method = editingRequirement ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          adminId: uid,
        }),
      });

      const data = await response.json();
      if (data.success) {
        fetchRequirements();
        resetForm();
        setShowAddForm(false);
        setShowEditForm(false);
        toast.success(editingRequirement ? 'Requirement updated successfully!' : 'Requirement created successfully!');
      } else {
        toast.error(data.message || 'Failed to save requirement');
      }
    } catch (error) {
      // console.error('Error saving requirement:', error);
      toast.error('Failed to save requirement');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setDeleteId(id);
    setShowConfirmModal(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/requirements/${deleteId}`, {
        method: 'DELETE',
        headers: {
          'admin-id': uid,
        },
      });

      const data = await response.json();
      if (data.success) {
        fetchRequirements();
        toast.success('Requirement deleted successfully!');
      } else {
        toast.error(data.message || 'Failed to delete requirement');
      }
    } catch (error) {
      console.error('Error deleting requirement:', error);
      toast.error('Failed to delete requirement');
    } finally {
      setShowConfirmModal(false);
      setDeleteId(null);
    }
  };

  const handleEdit = (requirement) => {
    setEditingRequirement(requirement);
    setFormData({
      itemName: requirement.itemName,
      quantity: requirement.quantity,
      description: requirement.description || '',
      productLink: requirement.productLink || '',
      priority: requirement.priority,
    });
    setShowEditForm(true);
  };

  const resetForm = () => {
    setFormData({
      itemName: '',
      quantity: '',
      description: '',
      productLink: '',
      priority: 'medium',
    });
    setEditingRequirement(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const getPriorityBadge = (priority) => {
    const colors = {
      low: 'success',
      medium: 'warning',
      high: 'danger',
    };
    return `badge bg-${colors[priority] || 'secondary'}`;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="container-fluid p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
         <h2 className="text-primary" style={{ fontWeight: 800 }}>Requirements Management</h2>
        <button
          className="btn btn-primary"
          onClick={() => setShowAddForm(true)}
          disabled={loading}
        >
          <FaPlus className="me-2" />
          Add Requirement
        </button>
      </div>

      {(showAddForm || showEditForm) && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {editingRequirement ? 'Edit Requirement' : 'Add New Requirement'}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => {
                    setShowAddForm(false);
                    setShowEditForm(false);
                    resetForm();
                  }}
                ></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Item Name *</label>
                      <input
                        type="text"
                        className="form-control"
                        name="itemName"
                        value={formData.itemName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Quantity Needed *</label>
                      <input
                        type="text"
                        className="form-control"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleInputChange}
                        placeholder="e.g., 20 units, 5 boxes"
                        required
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                      className="form-control"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows="3"
                      placeholder="Brief description or notes about the requirement"
                    ></textarea>
                  </div>
                  <div className="row">
                    <div className="col-md-8 mb-3">
                      <label className="form-label">Product Link (Amazon/External)</label>
                      <input
                        type="url"
                        className="form-control"
                        name="productLink"
                        value={formData.productLink}
                        onChange={handleInputChange}
                        placeholder="https://amazon.com/product-link"
                      />
                    </div>
                    <div className="col-md-4 mb-3">
                      <label className="form-label">Priority</label>
                      <select
                        className="form-select"
                        name="priority"
                        value={formData.priority}
                        onChange={handleInputChange}
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => {
                      setShowAddForm(false);
                      setShowEditForm(false);
                      resetForm();
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? 'Saving...' : (editingRequirement ? 'Update' : 'Create')}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Delete Modal */}
      {showConfirmModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Deletion</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowConfirmModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete this requirement?</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowConfirmModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={confirmDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Requirements Table */}
      <div className="card">
        <div className="card-body">
          {loading && !showAddForm && !showEditForm ? (
            <div className="text-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : requirements.length === 0 ? (
            <div className="text-center py-5">
              <h5 className="text-muted">No requirements found</h5>
              <p className="text-muted">Click "Add Requirement" to create the first requirement.</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover">
                <thead className="table-light">
                  <tr>
                    <th>Item Name</th>
                    <th>Quantity</th>
                    <th>Priority</th>
                    <th>Date Posted</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {requirements.map((req) => (
                    <tr key={req.id}>
                      <td>
                        <strong>{req.itemName}</strong>
                        {req.description && (
                          <div className="text-muted small">{req.description}</div>
                        )}
                      </td>
                      <td>{req.quantity}</td>
                      <td>
                        <span className={getPriorityBadge(req.priority)}>
                          {req.priority.toUpperCase()}
                        </span>
                      </td>
                      <td>{formatDate(req.createdAt)}</td>
                      <td>
                        <span className={`badge ${req.status === 'active' ? 'bg-success' : 'bg-secondary'}`}>
                          {req.status.toUpperCase()}
                        </span>
                      </td>
                      <td>
                        <div className="btn-group btn-group-sm">
                          <button
                            className="btn btn-outline-primary"
                            onClick={() => handleEdit(req)}
                            title="Edit"
                          >
                            <FaEdit />
                          </button>
                          {req.productLink && (
                            <button
                              className="btn btn-outline-success"
                              onClick={() => window.open(req.productLink, '_blank')}
                              title="View Product Link"
                            >
                              <FaExternalLinkAlt />
                            </button>
                          )}
                          <button
                            className="btn btn-outline-danger"
                            onClick={() => handleDelete(req.id)}
                            title="Delete"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminRequirements;
