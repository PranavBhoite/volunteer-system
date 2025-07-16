import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FaExternalLinkAlt,
  FaShoppingCart,
  FaCalendarAlt,
  FaInfoCircle,
} from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

const VolunteerRequirements = () => {
  const { uid } = useParams();
  const [requirements, setRequirements] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showQuantityModal, setShowQuantityModal] = useState(false);
  const [selectedRequirement, setSelectedRequirement] = useState(null);
  const [intendedQuantity, setIntendedQuantity] = useState('');

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

  const handleOrderClick = async (requirement) => {
    if (!requirement.productLink) {
      toast.error('No product link available for this item.');
      return;
    }

    setSelectedRequirement(requirement);
    setShowQuantityModal(true);
  };

  const confirmOrder = async () => {
    try {

      await fetch(`http://localhost:5000/api/requirements/${selectedRequirement.id}/click`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          intendedQuantity: intendedQuantity || 'Not specified',
          userId: uid,
        }),
      });

      window.open(selectedRequirement.productLink, '_blank');

      setShowQuantityModal(false);
      setSelectedRequirement(null);
      setIntendedQuantity('');
    } catch (error) {
      console.error('Error logging click:', error);
      // Still open the link even if logging fails
      window.open(selectedRequirement.productLink, '_blank');
      setShowQuantityModal(false);
      setSelectedRequirement(null);
      setIntendedQuantity('');
    }
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

  if (loading) {
    return (
      <div className="container-fluid p-4">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading requirements...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid p-4">
      <div className="mb-4">
      <h2 className="text-primary" style={{ fontWeight: 800 }}>Current Requirements</h2>
       <p className="text-muted">
            <strong>📦 Delivery Address:</strong> Pune, Maharashtra<br />
            <em>Please make sure to send your order to this address!</em>
          </p>
      </div>


      {/* Quantity Selection Modal */}
      {showQuantityModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Order Confirmation</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => {
                    setShowQuantityModal(false);
                    setSelectedRequirement(null);
                    setIntendedQuantity('');
                  }}
                ></button>
              </div>
              <div className="modal-body">
                <p><strong>Item:</strong> {selectedRequirement?.itemName}</p>
                <p><strong>Needed:</strong> {selectedRequirement?.quantity}</p>
                <div className="mb-3">
                  <label className="form-label">
                    How much are you planning to purchase? (Optional)
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={intendedQuantity}
                    onChange={(e) => setIntendedQuantity(e.target.value)}
                    placeholder="e.g., 5 units, 2 boxes"
                  />
                  <div className="form-text">
                    This helps us track fulfillment progress.
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    setShowQuantityModal(false);
                    setSelectedRequirement(null);
                    setIntendedQuantity('');
                  }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={confirmOrder}
                >
                  <FaExternalLinkAlt className="me-2" />
                  Proceed to Order
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {requirements.length === 0 ? (
        <div className="text-center py-5">
          <FaInfoCircle size={64} className="text-muted mb-3" />
          <h5 className="text-muted">No active requirements</h5>
          <p className="text-muted">Check back later for new items that need your help!</p>
        </div>
      ) : (
        <div className="row">
          {requirements.map((req) => (
            <div key={req.id} className="col-lg-6 col-xl-4 mb-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <h5 className="card-title text-primary">{req.itemName}</h5>
                    <span className={getPriorityBadge(req.priority)}>
                      {req.priority.toUpperCase()}
                    </span>
                  </div>

                  <div className="mb-3">
                    <p className="mb-1">
                      <strong>Quantity Needed:</strong> {req.quantity}
                    </p>
                    {req.remainingQuantity && req.remainingQuantity !== req.quantity && (
                      <p className="mb-1 text-muted">
                        <strong>Remaining:</strong> {req.remainingQuantity}
                      </p>
                    )}
                    <p className="mb-1 text-muted">
                      <FaCalendarAlt className="me-1" />
                      Posted: {formatDate(req.createdAt)}
                    </p>
                  </div>

                  {req.description && (
                    <div className="mb-3">
                      <p className="text-muted small">{req.description}</p>
                    </div>
                  )}

                  <div className="d-grid">
                    {req.productLink ? (
                      <button
                        className="btn btn-success"
                        onClick={() => handleOrderClick(req)}
                      >
                        <FaShoppingCart className="me-2" />
                        Order This Item
                      </button>
                    ) : (
                      <button className="btn btn-secondary" disabled>
                        <FaInfoCircle className="me-2" />
                        No Link Available
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {requirements.length > 0 && (
        <div className="mt-4">
          <div className="alert alert-info">
            <FaInfoCircle className="me-2" />
            <strong>How it works:</strong> Click "Order This Item" to be redirected to the product page.
            Your purchase helps fulfill our organization's needs. Thank you for your support!
          </div>
        </div>
      )}
    </div>
  );
};

export default VolunteerRequirements;
