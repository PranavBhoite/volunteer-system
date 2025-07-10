// import React, { useState } from "react";
// import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
// import axios from "axios";
// import { useNavigate, Link } from "react-router-dom";

// const Login = () => {
//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const [error, setError] = useState("");
//   const [rememberMe, setRememberMe] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//     setError("");
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.email || !formData.password) {
//       setError("Both email and password are required.");
//       return;
//     }

//     try {
//       const res = await axios.post("http://localhost:5000/api/auth/login", formData);
//       alert(res.data.message);

//       // Store user ID locally (using localStorage or sessionStorage based on rememberMe)
//       if (rememberMe) {
//         localStorage.setItem("userId", res.data.userId);
//       } else {
//         sessionStorage.setItem("userId", res.data.userId);
//       }

//       // Navigate to dashboard
//       navigate(`/dashboard/${res.data.userId}`);
//     } catch (err) {
//       setError(err.response?.data?.message || "Login failed");
//     }
//   };

//   return (
//     <div style={{
//       backgroundImage: "url('/images/Login.png')", // Replace with your image path
//       backgroundSize: "cover",
//       backgroundPosition: "center",
//       minHeight: "100vh",
//       display: "flex",
//       alignItems: "center"
//     }}>
//       <Container>
//         <Row>
//           <Col md={6} lg={5}>
//             <div style={{
//               backgroundColor: "rgba(255, 255, 255, 0.85)",
//               padding: "2.5rem",
//               borderRadius: "10px",
//               boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)"
//             }}>
//               <h2 className="mb-4" style={{ color: "#2c3e50", fontWeight: "bold" }}>Account Login</h2>
              
//               {error && <Alert variant="danger" className="text-center">{error}</Alert>}
              
//               <Form onSubmit={handleSubmit}>
//                 <Form.Group className="mb-4">
//                   <Form.Label style={{ fontWeight: "600", color: "#555" }}>Email Address</Form.Label>
//                   <Form.Control
//                     type="email"
//                     placeholder="Enter your email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     style={{ 
//                       padding: "12px",
//                       borderRadius: "6px",
//                       border: "1px solid #ddd",
//                       backgroundColor: "rgba(255, 255, 255, 0.8)"
//                     }}
//                   />
//                 </Form.Group>

//                 <Form.Group className="mb-4">
//                   <Form.Label style={{ fontWeight: "600", color: "#555" }}>Password</Form.Label>
//                   <Form.Control
//                     type="password"
//                     placeholder="Enter your password"
//                     name="password"
//                     value={formData.password}
//                     onChange={handleChange}
//                     style={{ 
//                       padding: "12px",
//                       borderRadius: "6px",
//                       border: "1px solid #ddd",
//                       backgroundColor: "rgba(255, 255, 255, 0.8)"
//                     }}
//                   />
//                 </Form.Group>

//                 {/* <div className="d-flex justify-content-between align-items-center mb-4">
//                   <FormCheck>
//                     <FormCheck.Input 
//                       type="checkbox" 
//                       id="rememberMe"
//                       checked={rememberMe}
//                       onChange={(e) => setRememberMe(e.target.checked)}
//                     />
//                     <FormCheck.Label htmlFor="rememberMe" style={{ color: "#555" }}>Remember Me</FormCheck.Label>
//                   </FormCheck>
//                   <Link to="/forgot-password" style={{ color: "#3498db", textDecoration: "none" }}>Forgot Password?</Link>
//                 </div> */}

//                 <Button 
//                   variant="primary" 
//                   type="submit" 
//                   style={{
//                     width: "100%",
//                     padding: "12px",
//                     borderRadius: "6px",
//                     backgroundColor: "#3498db",
//                     border: "none",
//                     fontWeight: "600",
//                     fontSize: "1rem"
//                   }}
//                 >
//                   Login
//                 </Button>
//               </Form>

//               <p className="mt-4 text-center" style={{ color: "#666" }}>
//                 Don't have an account? <Link to="/Registration" style={{ color: "#3498db", textDecoration: "none" }}>Register</Link>
//               </p>
//             </div>
//           </Col>
//         </Row>
//       </Container>
//     </div>
//   );
// };

// export default Login;


import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, Slide, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      const errorMessage = "Email and password are required fields.";
      console.log("Error: Missing email or password");
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 3000,
        transition: Slide,
      });
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", formData);
      console.log("Login response:", res.data); // Log the response for debugging
      
      // First check if we received an error response with status code 200
      // This could happen if backend sends error with status 200 instead of 400
      if (res.data.error) {
        toast.error(res.data.message || "Login failed", {
          position: "top-right",
          autoClose: 3000,
          transition: Slide,
        });
        return;
      }

      // Now handle specific status cases if provided in the response
      const { userId, message, status } = res.data;
      
      if (status === "pending") {
        toast.info("Your account is pending approval. Please wait for admin confirmation.", {
          position: "top-right",
          autoClose: 5000,
          delay: 1000
        });
        return;
      } else if (status === "disapproved") {
        toast.error("Your account has been disapproved by admin. Please contact support.", {
          position: "top-right",
          autoClose: 5000,
          transition: Slide,
        });
        return;
      } 
      
      // For successful login (both explicit approved status and default case)
      // If status is not provided or is "approved", proceed with login
      const successMessage = message || "Logged in successfully!";
      toast.success(successMessage, {
        position: "top-right",
        autoClose: 3000,
        transition: Slide,
      });
      
      // Store user ID locally (using localStorage or sessionStorage based on rememberMe)
      if (rememberMe) {
        localStorage.setItem("userId", userId);
      } else {
        sessionStorage.setItem("userId", userId);
      }

      // Navigate to dashboard with success message
      navigate(`/dashboard/${userId}`, { state: { toastMessage: successMessage } });
    } catch (err) {
      // console.log("Error from server:", err.response?.data); (debugging toast)
      const errorMessage = err.response?.data?.message || "Login failed";
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 3000,
        transition: Slide,
      });
    }
  };

  return (
    <div style={{
      backgroundImage: "url('/images/Login.png')", // Replace with your image path
      backgroundSize: "cover",
      backgroundPosition: "center",
      minHeight: "100vh",
      display: "flex",
      alignItems: "center"
    }}>
      <Container>
        <Row>
          <Col md={6} lg={5}>
            <div style={{
              backgroundColor: "rgba(255, 255, 255, 0.85)",
              padding: "2.5rem",
              borderRadius: "10px",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)"
            }}>
              <h2 className="mb-4" style={{ color: "#2c3e50", fontWeight: "bold" }}>Account Login</h2>
              
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-4">
                  <Form.Label style={{ fontWeight: "600", color: "#555" }}>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    style={{ 
                      padding: "12px",
                      borderRadius: "6px",
                      border: "1px solid #ddd",
                      backgroundColor: "rgba(255, 255, 255, 0.8)"
                    }}
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label style={{ fontWeight: "600", color: "#555" }}>Password</Form.Label>
                  <div style={{ position: "relative" }}>
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      style={{ 
                        padding: "12px",
                        paddingRight: "45px",
                        borderRadius: "6px",
                        border: "1px solid #ddd",
                        backgroundColor: "rgba(255, 255, 255, 0.8)"
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{
                        position: "absolute",
                        right: "12px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        color: "#666",
                        fontSize: "16px"
                      }}
                    >
                      {showPassword ? "👁️" : "👁️"}
                    </button>
                  </div>
                </Form.Group>

                {/* <div className="d-flex justify-content-between align-items-center mb-4">
                  <FormCheck>
                    <FormCheck.Input 
                      type="checkbox" 
                      id="rememberMe"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <FormCheck.Label htmlFor="rememberMe" style={{ color: "#555" }}>Remember Me</FormCheck.Label>
                  </FormCheck>
                  <Link to="/forgot-password" style={{ color: "#3498db", textDecoration: "none" }}>Forgot Password?</Link>
                </div> */}

                <Button 
                  variant="primary" 
                  type="submit" 
                  style={{
                    width: "100%",
                    padding: "12px",
                    borderRadius: "6px",
                    backgroundColor: "#3498db",
                    border: "none",
                    fontWeight: "600",
                    fontSize: "1rem"
                  }}
                >
                  Login
                </Button>
              </Form>

              <p className="mt-4 text-center" style={{ color: "#666" }}>
                Don't have an account? <Link to="/Registration" style={{ color: "#3498db", textDecoration: "none" }}>Register</Link>
              </p>
            </div>
          </Col>
        </Row>
      </Container>
      <ToastContainer />
    </div>
  );
};

export default Login;