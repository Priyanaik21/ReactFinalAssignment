import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const LogoutPage = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
    setIsAuthenticated(false);
  };

  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col md={6}>
          <div className="text-center">
            <h2>Logout Page</h2>
            <p>Are you sure you want to log out?</p>
            <Button variant="danger" onClick={handleLogout}>Logout</Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default LogoutPage;
