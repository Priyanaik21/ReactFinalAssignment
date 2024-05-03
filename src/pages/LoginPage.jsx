import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ setIsAuthenticated }) => {
  const [errorMessages, setErrorMessages] = useState({});
  const navigate = useNavigate();

  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  const handleSubmit = (event) => {
    event.preventDefault();

    const username = event.target.uname.value;
    const password = event.target.pass.value;

    if (!username.trim()) {
      setErrorMessages({ name: 'uname', message: 'Username is required' });
      return;
    }
    if (!password.trim()) {
      setErrorMessages({ name: 'pass', message: 'Password is required' });
      return;
    }
    if (password.trim().length <= 6) {
      setErrorMessages({
        name: 'pass',
        message: 'Password must be longer than 6 characters',
      });
      return;
    }
    setIsAuthenticated(true);
    alert('Login Successful');
    navigate('/dashboard');
    setErrorMessages({});
  };

  return (
    <Row className="justify-content-center">
      <Col xs={10} sm={8} md={6} lg={4}>
        <div className="form" style={{ paddingTop: '40px' }}>
          <center>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="uname">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" name="uname" />
                {renderErrorMessage('uname')}
              </Form.Group>
              <Form.Group controlId="pass">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name="pass" />
                {renderErrorMessage('pass')}
              </Form.Group>
              <br />
              <Button variant="primary" type="submit">
                Login
              </Button>
            </Form>
          </center>
        </div>
      </Col>
    </Row>
  );
};

export default LoginPage;
