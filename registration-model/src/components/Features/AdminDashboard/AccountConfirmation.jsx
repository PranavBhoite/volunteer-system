import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Table, Button, Row, Col, Form, Modal, Spinner, Card, Badge, Nav, Tab } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AccountConfirmation = () => {
  const [pendingAccounts, setPendingAccounts] = useState([]);
  const [confirmedAccounts, setConfirmedAccounts] = useState([]);
  const [declinedAccounts, setDeclinedAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("decline"); // "decline", "approve", "revoke"
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [activeTab, setActiveTab] = useState("pending");
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    // Fetch pending, confirmed, and declined accounts from the backend
    fetchPendingAccounts();
    fetchConfirmedAccounts();
    fetchDeclinedAccounts();
  }, [refreshTrigger]);

  const fetchPendingAccounts = async () => {
    try {
      setLoading(true);
      // console.log("Fetching pending accounts...");
      const response = await axios.get("http://localhost:5000/api/admin/pending-accounts");
      // console.log("Pending accounts response:", response.data);
      setPendingAccounts(response.data);
      setLoading(false);
    } catch (error) {
      // console.error("Error fetching pending accounts:", error);
      toast.error("Failed to fetch pending accounts.");
      setLoading(false);
    }
  };

  const fetchConfirmedAccounts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/admin/confirmed-accounts");
      // console.log("Confirmed accounts response:", response.data);
      setConfirmedAccounts(response.data);
    } catch (error) {
      // console.error("Error fetching confirmed accounts:", error);
      toast.error("Failed to fetch confirmed accounts.");
    }
  };

  const fetchDeclinedAccounts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/admin/declined-accounts");
      // console.log("Declined accounts response:", response.data);
      setDeclinedAccounts(response.data);
    } catch (error) {
      // console.error("Error fetching declined accounts:", error);
      toast.error("Failed to fetch declined accounts.");
    }
  };

  const handleApproval = async (userId) => {
    try {
      await axios.post(`http://localhost:5000/api/admin/account-action`, {
        userId,
        action: "approved",
      });
      toast.success("Account approved successfully!");
      // Trigger a refresh of all account lists
      setRefreshTrigger(prev => prev + 1);
    } catch (error) {
      // console.error("Error approving account:", error);
      toast.error("Failed to approve account.");
    }
  };

  const openDeclineModal = (account) => {
    setSelectedAccount(account);
    setFeedbackMessage("");
    setModalType("decline");
    setShowModal(true);
  };

  const openRevokeApprovalModal = (account) => {
    setSelectedAccount(account);
    setFeedbackMessage("");
    setModalType("revoke");
    setShowModal(true);
  };

  const openApproveDeclinedModal = (account) => {
    setSelectedAccount(account);
    setModalType("approve");
    setShowModal(true);
  };

  const handleModalAction = async () => {
    if (!selectedAccount) return;

    try {
      let action;
      let successMessage;
      
      switch (modalType) {
        case "decline":
          action = "disapproved";
          successMessage = "Account declined successfully!";
          break;
        case "revoke":
          action = "disapproved";
          successMessage = "Approval revoked successfully!";
          break;
        case "approve":
          action = "approved";
          successMessage = "Account approved successfully!";
          break;
        default:
          return;
      }

      await axios.post(`http://localhost:5000/api/admin/account-action`, {
        userId: selectedAccount.id,
        action: action,
        feedback: modalType === "decline" || modalType === "revoke" ? feedbackMessage : "",
      });
      
      toast.success(successMessage);
      setShowModal(false);
      // Trigger a refresh of all account lists
      setRefreshTrigger(prev => prev + 1);
    } catch (error) {
      // console.error("Error updating account status:", error);
      toast.error("Failed to update account status.");
    }
  };

  return (
    <Container fluid className="p-4">
      <ToastContainer />
      
      <Row className="mb-4">
        <Col>
          <h2 className="fw-bold text-primary">Account Management</h2>
          <p className="text-muted">Review and manage volunteer account statuses</p>
        </Col>
        <Col xs="auto">
          <Button 
            variant="outline-primary" 
            onClick={() => setRefreshTrigger(prev => prev + 1)}
            className="d-flex align-items-center"
          >
            <i className="bi bi-arrow-clockwise me-2"></i> Refresh
          </Button>
        </Col>
      </Row>

      <Card className="shadow-sm border-0 mb-4">
        <Card.Header className="bg-white py-2">
          <Nav variant="tabs" className="nav-tabs-custom" activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
            <Nav.Item>
              <Nav.Link eventKey="pending" className="px-3 py-2">
                Pending
                {pendingAccounts.length > 0 && (
                  <Badge bg="warning" className="ms-2 rounded-pill">{pendingAccounts.length}</Badge>
                )}
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="approved" className="px-3 py-2">
                Approved
                {confirmedAccounts.length > 0 && (
                  <Badge bg="success" className="ms-2 rounded-pill">{confirmedAccounts.length}</Badge>
                )}
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="declined" className="px-3 py-2">
                Declined
                {declinedAccounts.length > 0 && (
                  <Badge bg="danger" className="ms-2 rounded-pill">{declinedAccounts.length}</Badge>
                )}
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Card.Header>
        <Card.Body className="p-0">
          <Tab.Content>
            {/* Pending Accounts Tab */}
            <Tab.Pane eventKey="pending" active={activeTab === "pending"}>
              {loading ? (
                <div className="text-center my-5 py-5">
                  <Spinner animation="border" role="status" variant="primary">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                  <p className="mt-3">Loading pending accounts...</p>
                </div>
              ) : pendingAccounts.length === 0 ? (
                <div className="text-center my-5 py-5">
                  <div className="mb-3">
                    <i className="bi bi-check-circle text-success" style={{ fontSize: "3rem" }}></i>
                  </div>
                  <h4>No pending account requests</h4>
                  <p className="text-muted">All account requests have been processed</p>
                </div>
              ) : (
                <div className="table-responsive">
                  <Table hover className="mb-0 align-middle">
                    <thead className="bg-light">
                      <tr>
                        <th className="border-0 ps-4">Name</th>
                        <th className="border-0">Email</th>
                        <th className="border-0">Registration Date</th>
                        <th className="border-0 text-end pe-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pendingAccounts.map((account) => (
                        <tr key={account.id}>
                          <td className="ps-4">
                            <div className="d-flex align-items-center">
                              <div className="avatar-circle bg-primary text-white me-3">
                                {account.name.charAt(0).toUpperCase()}
                              </div>
                              <div>{account.name}</div>
                            </div>
                          </td>
                          <td>{account.email}</td>
                          <td>{account.createdAt ? new Date(account.createdAt).toLocaleDateString() : "N/A"}</td>
                          <td className="text-end pe-4">
                            <div className="d-flex justify-content-end gap-2">
                              <Button
                                variant="success"
                                size="sm"
                                className="rounded-pill px-2 py-1"
                                onClick={() => handleApproval(account.id)}
                              >
                                <i className="bi bi-check-circle me-1"></i> Approve
                              </Button>
                              <Button
                                variant="danger"
                                size="sm"
                                className="rounded-pill px-2 py-1"
                                onClick={() => openDeclineModal(account)}
                              >
                                <i className="bi bi-x-circle me-1"></i> Decline
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              )}
            </Tab.Pane>

            {/* Approved Accounts Tab */}
            <Tab.Pane eventKey="approved" active={activeTab === "approved"}>
              {confirmedAccounts.length === 0 ? (
                <div className="text-center my-5 py-5">
                  <div className="mb-3">
                    <i className="bi bi-info-circle text-info" style={{ fontSize: "3rem" }}></i>
                  </div>
                  <h4>No approved accounts</h4>
                  <p className="text-muted">No accounts have been approved yet</p>
                </div>
              ) : (
                <div className="table-responsive">
                  <Table hover className="mb-0 align-middle">
                    <thead className="bg-light">
                      <tr>
                        <th className="border-0 ps-4">Name</th>
                        <th className="border-0">Email</th>
                        <th className="border-0">Status</th>
                        <th className="border-0 text-end pe-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {confirmedAccounts.map((account) => (
                        <tr key={account.id}>
                          <td className="ps-4">
                            <div className="d-flex align-items-center">
                              <div className="avatar-circle bg-success text-white me-3">
                                {account.name.charAt(0).toUpperCase()}
                              </div>
                              <div>{account.name}</div>
                            </div>
                          </td>
                          <td>{account.email}</td>
                          <td>
                            <Badge bg="success" className="rounded-pill px-3 py-2">Approved</Badge>
                          </td>
                          <td className="text-end pe-4">
                            <Button
                              variant="warning"
                              size="sm"
                              className="rounded-pill px-2 py-1"
                              onClick={() => openRevokeApprovalModal(account)}
                            >
                              <i className="bi bi-arrow-counterclockwise me-1"></i> Revoke
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              )}
            </Tab.Pane>

            {/* Declined Accounts Tab */}
            <Tab.Pane eventKey="declined" active={activeTab === "declined"}>
              {declinedAccounts.length === 0 ? (
                <div className="text-center my-5 py-5">
                  <div className="mb-3">
                    <i className="bi bi-info-circle text-info" style={{ fontSize: "3rem" }}></i>
                  </div>
                  <h4>No declined accounts</h4>
                  <p className="text-muted">No accounts have been declined yet</p>
                </div>
              ) : (
                <div className="table-responsive">
                  <Table hover className="mb-0 align-middle">
                    <thead className="bg-light">
                      <tr>
                        <th className="border-0 ps-4">Name</th>
                        <th className="border-0">Email</th>
                        <th className="border-0">Feedback</th>
                        <th className="border-0 text-end pe-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {declinedAccounts.map((account) => (
                        <tr key={account.id}>
                          <td className="ps-4">
                            <div className="d-flex align-items-center">
                              <div className="avatar-circle bg-danger text-white me-3">
                                {account.name.charAt(0).toUpperCase()}
                              </div>
                              <div>{account.name}</div>
                            </div>
                          </td>
                          <td>{account.email}</td>
                          <td>{account.feedback || "No feedback provided"}</td>
                          <td className="text-end pe-4">
                            <Button
                              variant="success"
                              size="sm"
                              className="rounded-pill px-2 py-1"
                              onClick={() => openApproveDeclinedModal(account)}
                            >
                              <i className="bi bi-check-circle me-1"></i> Approve
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              )}
            </Tab.Pane>
          </Tab.Content>
        </Card.Body>
      </Card>

      {/* Action Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title>
            {modalType === "decline" && "Decline Account"}
            {modalType === "revoke" && "Revoke Approval"}
            {modalType === "approve" && "Approve Account"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="pt-0">
          {selectedAccount && (
            <>
              <p>
                {modalType === "decline" && "Are you sure you want to decline the account for:"}
                {modalType === "revoke" && "Are you sure you want to revoke approval for:"}
                {modalType === "approve" && "Are you sure you want to approve the account for:"}
              </p>
              
              <Card className="border mb-4 bg-light">
                <Card.Body className="py-3">
                  <div className="d-flex align-items-center">
                    <div className={`avatar-circle ${modalType === "approve" ? "bg-success" : "bg-danger"} text-white me-3`}>
                      {selectedAccount.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h6 className="mb-0">{selectedAccount.name}</h6>
                      <small className="text-muted">{selectedAccount.email}</small>
                    </div>
                  </div>
                </Card.Body>
              </Card>
              
              {(modalType === "decline" || modalType === "revoke") && (
                <Form.Group className="mb-3">
                  <Form.Label>
                    <strong>Feedback Message {modalType === "decline" ? "(Optional)" : ""}</strong>
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={feedbackMessage}
                    onChange={(e) => setFeedbackMessage(e.target.value)}
                    placeholder={
                      modalType === "decline" 
                        ? "Provide feedback to the user about why their account was declined" 
                        : "Provide feedback about why approval is being revoked"
                    }
                  />
                  <Form.Text className="text-muted">
                    This message will be displayed to the user when they attempt to log in.
                  </Form.Text>
                </Form.Group>
              )}
            </>
          )}
        </Modal.Body>
        <Modal.Footer className="border-0 pt-0">
          <Button variant="outline-secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button 
            variant={modalType === "approve" ? "success" : "danger"} 
            onClick={handleModalAction}
          >
            {modalType === "decline" && "Decline Account"}
            {modalType === "revoke" && "Revoke Approval"}
            {modalType === "approve" && "Approve Account"}
          </Button>
        </Modal.Footer>
      </Modal>
      
      {/* Custom CSS for avatar circles and responsive design */}
      <style jsx>{`
        .avatar-circle {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 0.85rem;
        }
        .nav-tabs-custom .nav-link {
          color: #495057;
          font-weight: 500;
          border: none;
          border-bottom: 2px solid transparent;
          font-size: 0.95rem;
        }
        .nav-tabs-custom .nav-link.active {
          color: #007bff;
          border-bottom: 2px solid #007bff;
          background-color: transparent;
        }
        /* Responsive adjustments */
        @media (max-width: 992px) {
          .table-responsive {
            font-size: 0.85rem;
          }
          .btn {
            font-size: 0.8rem;
            padding: 0.2rem 0.5rem;
          }
        }
      `}</style>
    </Container>
  );
};

export default AccountConfirmation;
