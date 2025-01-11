import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { verifyOTP } from '../../redux/store/actions/authActions';

const OTPPage = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);
  const tempEmail = useSelector((state) => state.auth.tempEmail);

  // Redirect if no email in state
  React.useEffect(() => {
    if (!tempEmail) {
      navigate('/signup');
    }
  }, [tempEmail, navigate]);

  const handleChange = (element, index) => {
    if (isNaN(element.target.value)) return;

    setOtp([...otp.map((d, idx) => (idx === index ? element.target.value : d))]);

    // Auto-focus next input
    if (element.target.nextSibling && element.target.value !== '') {
      element.target.nextSibling.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpString = otp.join('');
    
    if (otpString.length !== 6) {
      alert('Please enter complete OTP');
      return;
    }

    try {
      await dispatch(verifyOTP(tempEmail, otpString));
      navigate('/');
    } catch (err) {
      console.error('OTP verification failed:', err);
    }
  };

  if (!tempEmail) {
    return null; // or a loading spinner
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Enter OTP
        </h2>
        <p className="text-center text-gray-600 mb-8">
          We've sent a code to {tempEmail}
        </p>
        
        {error && (
          <p className="text-red-500 text-center mb-4">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <div className="flex justify-center gap-2 mb-8">
            {otp.map((data, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                className="w-12 h-12 text-center text-xl font-semibold border-2 border-lime-400 rounded focus:outline-none focus:border-lime-500"
                value={data}
                onChange={(e) => handleChange(e, index)}
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-lime-400 hover:bg-lime-500 text-white font-semibold rounded transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Verifying...' : 'Verify OTP'}
          </button>
        </form>

        <p className="text-center mt-6 text-sm text-gray-600">
          Didn't receive the code?{' '}
          <button
            onClick={() => console.log('Resend OTP functionality here')}
            className="text-lime-500 font-semibold hover:text-lime-600"
          >
            Resend OTP
          </button>
        </p>
      </div>
    </div>
  );
};

export default OTPPage;