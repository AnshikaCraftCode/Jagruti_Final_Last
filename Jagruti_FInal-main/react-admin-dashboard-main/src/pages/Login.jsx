import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Card, Form, Button, Alert, Spinner } from "react-bootstrap";
import { FaLock, FaEnvelope, FaHeart, FaEye, FaEyeSlash } from "react-icons/fa";
import Logo from "../assets/images/logo.jpeg";
import "../assets/css/Dashboard.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Invalid credentials");
      }

      // Save Auth Token & User info
      localStorage.setItem("adminToken", data.token);
      localStorage.setItem("adminUser", JSON.stringify(data.user));

      // Navigate to Dashboard
      navigate("/");
    } catch (err) {
      setError(err.message || "Unable to connect to server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #031436 0%, #0d2962 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <Container style={{ maxWidth: "440px" }}>
        <Card
          className="border-0 shadow-lg"
          style={{
            borderRadius: "20px",
            overflow: "hidden",
            background: "#ffffff",
          }}
        >
          {/* Header */}
          <div
            className="text-center p-4 text-white"
            style={{
              background: "linear-gradient(135deg, #031436 0%, #1e3a8a 100%)",
              borderBottom: "3px solid #E53935",
            }}
          >
            <div
              className="mx-auto mb-3 d-flex align-items-center justify-content-center"
              style={{
                width: "75px",
                height: "75px",
                borderRadius: "50%",
                background: "#fff",
                padding: "4px",
                boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
              }}
            >
              <img
                src={Logo}
                alt="Jagruti Foundation Logo"
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  objectFit: "contain",
                }}
              />
            </div>
            <h4 className="fw-bold mb-1" style={{ fontSize: "22px" }}>
              Jagruti Foundation
            </h4>
            <span
              className="badge px-3 py-1 text-uppercase"
              style={{
                background: "rgba(229, 57, 53, 0.2)",
                color: "#ff6b6b",
                fontSize: "10px",
                letterSpacing: "1px",
                border: "1px solid rgba(229, 57, 53, 0.4)",
              }}
            >
              Admin Dashboard Login
            </span>
          </div>

          {/* Form Body */}
          <Card.Body className="p-4">
            {error && (
              <Alert
                variant="danger"
                className="py-2 px-3 small border-0 shadow-sm"
                style={{ borderRadius: "10px" }}
              >
                {error}
              </Alert>
            )}

            <Form onSubmit={handleLogin}>
              {/* Email */}
              <Form.Group className="mb-3">
                <Form.Label className="small fw-semibold text-secondary">
                  Admin Email Address
                </Form.Label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-end-0 text-muted">
                    <FaEnvelope />
                  </span>
                  <Form.Control
                    type="email"
                    placeholder="e.g. admin@jagruti.org"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{
                      borderLeft: "none",
                      boxShadow: "none",
                      fontSize: "14px",
                      padding: "11px",
                    }}
                  />
                </div>
              </Form.Group>

              {/* Password */}
              <Form.Group className="mb-4">
                <Form.Label className="small fw-semibold text-secondary">
                  Password
                </Form.Label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-end-0 text-muted">
                    <FaLock />
                  </span>
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{
                      borderLeft: "none",
                      borderRight: "none",
                      boxShadow: "none",
                      fontSize: "14px",
                      padding: "11px",
                    }}
                  />
                  <button
                    type="button"
                    className="input-group-text bg-light border-start-0 text-muted"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ cursor: "pointer" }}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </Form.Group>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={loading}
                className="w-100 py-2 border-0 fw-bold shadow-sm"
                style={{
                  background: "linear-gradient(135deg, #E53935 0%, #b71c1c 100%)",
                  borderRadius: "10px",
                  fontSize: "15px",
                  transition: "all 0.3s ease",
                }}
              >
                {loading ? (
                  <>
                    <Spinner animation="border" size="sm" className="me-2" />
                    Signing In...
                  </>
                ) : (
                  "Sign In to Dashboard"
                )}
              </Button>
            </Form>

            <div className="text-center mt-4 pt-2 border-top">
              <small className="text-muted" style={{ fontSize: "11px" }}>
                <FaHeart className="text-danger me-1" /> Jagruti NGO Management System
              </small>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default Login;