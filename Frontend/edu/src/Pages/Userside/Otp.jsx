import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Card, Form, Button, Container, Row, Col } from 'react-bootstrap';
import { verifyOTP } from '../../redux/store/actions/authActions';
import 'bootstrap/dist/css/bootstrap.min.css';

const OTPPage = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);
  const email = useSelector((state) => state.auth.user?.email);

  const handleChange = (element, index) => {
    if (isNaN(element.target.value)) return;

    setOtp([...otp.map((d, idx) => (idx === index ? element.target.value : d))]);

    // Focus next input
    if (element.target.nextSibling && element.target.value !== '') {
      element.target.nextSibling.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpString = otp.join('');
    try {
      await dispatch(verifyOTP(email, otpString));
      navigate('/');
    } catch (err) {
      console.error('OTP verification failed:', err);
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <Card className="w-100" style={{ maxWidth: '400px' }}>
        <Card.Body className="p-5">
          <h2 className="text-center mb-4" style={{ fontFamily: 'Arial, sans-serif', fontWeight: 700, color: '#333' }}>
            Enter OTP
          </h2>
          <p className="text-center text-muted mb-5" style={{ fontFamily: 'Georgia, serif' }}>
            We've sent a code to your email address
          </p>
          {error && (
            <p className="text-center text-danger mb-4" style={{ fontFamily: 'Arial, sans-serif' }}>
              {error}
            </p>
          )}
          <Form onSubmit={handleSubmit}>
            <Row className="justify-content-center mb-5">
              {otp.map((data, index) => (
                <Col key={index} xs={3}>
                  <Form.Control
                    type="text"
                    maxLength={1}
                    className="text-center"
                    style={{
                      width: '60px',
                      height: '60px',
                      fontSize: '24px',
                      borderColor: '#B0FC35',
                      borderWidth: '2px',
                    }}
                    value={data}
                    onChange={(e) => handleChange(e, index)}
                  />
                </Col>
              ))}
            </Row>
            <Button
              type="submit"
              className="w-100 py-3"
              style={{
                backgroundColor: '#B0FC35',
                borderColor: '#B0FC35',
                color: 'white',
                fontWeight: 600,
                transition: 'background-color 0.3s',
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = '#9AE02D')}
              onMouseOut={(e) => (e.target.style.backgroundColor = '#B0FC35')}
              disabled={loading}
            >
              {loading ? 'Verifying...' : 'Verify OTP'}
            </Button>
          </Form>
          <p className="text-center mt-4" style={{ fontFamily: 'Georgia, serif', fontSize: '14px' }}>
            Didn't receive the code?{' '}
            <a
              href="#"
              style={{ color: '#B0FC35', textDecoration: 'none', fontWeight: 600 }}
              onClick={() => console.log('Resend OTP functionality here')}
            >
              Resend OTP
            </a>
          </p>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default OTPPage;
