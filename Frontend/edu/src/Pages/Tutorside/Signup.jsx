import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AlertCircle, Loader2, Eye, EyeOff } from 'lucide-react';
import { signupTutor } from '../../redux/store/actions/tutorActions';

function SignUp() {
  const dispatch = useDispatch();
  const { loading, error: reduxError } = useSelector((state) => state.tutor);

  const initialFormState = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    teaching_experience: '',
    degree: '',
    certificate: null
  };

  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({
    success: false,
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    
    // Handle file inputs separately
    if (type === 'file') {
      setFormData(prev => ({
        ...prev,
        [name]: files[0]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }

    // Clear the error for this field
    setErrors(prev => ({
      ...prev,
      [name]: ''
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.teaching_experience) {
      newErrors.teaching_experience = 'Teaching experience is required';
    } else {
      const expYears = parseFloat(formData.teaching_experience);
      if (isNaN(expYears) || expYears < 1) {
        newErrors.teaching_experience = 'Experience must be at least 1 year';
      }
    }

    if (!formData.degree) {
      newErrors.degree = 'Degree selection is required';
    }

    if (!formData.certificate) {
      newErrors.certificate = 'Educational certificate is required';
    } else {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
      if (!allowedTypes.includes(formData.certificate.type)) {
        newErrors.certificate = 'Please upload a valid certificate (PDF or image file)';
      } else if (formData.certificate.size > 5 * 1024 * 1024) {
        newErrors.certificate = 'File size should not exceed 5MB';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const formSubmissionData = new FormData();
    Object.keys(formData).forEach(key => {
      if (formData[key] !== null && key !== 'confirmPassword') {
        formSubmissionData.append(key, formData[key]);
      }
    });

    try {
      const response = await dispatch(signupTutor(formSubmissionData));
      setSubmitStatus({
        success: true,
        message: 'Your signup request has been received. You will be notified once admin reviews your application.'
      });
      setFormData(initialFormState);
    } catch (error) {
      console.log('Error:', error); // For debugging
      setSubmitStatus({
        success: false,
        message: error.response?.data?.error || error.response?.data?.message || 'An error occurred during signup. Please try again.'
      });
    }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-400 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl w-full bg-white p-8 rounded-xl shadow-lg grid lg:grid-cols-2 gap-8">
        <div className="flex flex-col justify-center">
          <h2 className="text-center text-3xl font-extrabold text-gray-800 mb-8">
            Create your Tutor Account
          </h2>

          {submitStatus.message && (
          <div className={`mb-6 p-4 rounded-md ${
          submitStatus.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
          }`}>
          {submitStatus.message}
          </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Field */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border ${
                  errors.username ? 'border-red-500' : 'border-gray-300'
                } rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm`}
                placeholder="Choose a username"
                required
              />
              {errors.username && (
                <p className="mt-1 text-sm text-red-500 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.username}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                } rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm`}
                placeholder="you@example.com"
                required
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border ${
                    errors.password ? 'border-red-500' : 'border-gray-300'
                  } rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm pr-10`}
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-500 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.password}
                </p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border ${
                    errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                  } rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm pr-10`}
                  placeholder="Confirm your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-2 top-2 text-gray-500 hover:text-gray-700"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-500 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Teaching Experience Field */}
            <div>
              <label htmlFor="teaching_experience" className="block text-sm font-medium text-gray-700 mb-1">
                Teaching Experience (Years)
              </label>
              <input
                type="number"
                id="teaching_experience"
                name="teaching_experience"
                min="1"
                value={formData.teaching_experience}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border ${
                  errors.teaching_experience ? 'border-red-500' : 'border-gray-300'
                } rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm`}
                placeholder="Minimum 1 year"
              />
              {errors.teaching_experience && (
                <p className="mt-1 text-sm text-red-500 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.teaching_experience}
                </p>
              )}
            </div>

            {/* Degree Select */}
            <div>
              <label htmlFor="degree" className="block text-sm font-medium text-gray-700 mb-1">
                Degree
              </label>
              <select
                id="degree"
                name="degree"
                value={formData.degree}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border ${
                  errors.degree ? 'border-red-500' : 'border-gray-300'
                } rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm`}
              >
                <option value="">Select Degree</option>
                <option value="bed">B.Ed</option>
                <option value="msc">M.Sc</option>
                <option value="ma">M.A</option>
                <option value="other">Other</option>
              </select>
              {errors.degree && (
                <p className="mt-1 text-sm text-red-500 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.degree}
                </p>
              )}
            </div>

            {/* Certificate Upload */}
            <div>
              <label htmlFor="certificate" className="block text-sm font-medium text-gray-700 mb-1">
                Educational Certificate
              </label>
              <input
                id="certificate"
                name="certificate"
                type="file"
                accept="image/*,.pdf"
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
              />
              {errors.certificate && (
                <p className="mt-1 text-sm text-red-500 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.certificate}
                </p>
              )}
              <p className="mt-1 text-sm text-gray-500">
                Accepted formats: PDF, JPG, PNG (max 5MB)
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-all duration-300 disabled:opacity-75 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
                  Submitting...
                </>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          {/* Social Login Section */}
          <div className="mt-8">
            <div className="relative flex items-center">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="mx-4 text-sm text-gray-500">Or continue with</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>


            
            <div className="mt-6 grid grid-cols-3 gap-3">
              {['Facebook', 'Twitter', 'GitHub'].map((provider) => (
                <button
                  key={provider}
                  type="button"
                  className="inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition"
                >
                  <span className="sr-only">Sign up with {provider}</span>
                  <img src={`/api/placeholder/20/20`} alt={provider} className="w-5 h-5" />
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="relative hidden lg:block">
          <img
            src="/tutor.jpg"
            alt="A person using a laptop"
            className="absolute inset-0 w-full h-full object-cover rounded-lg"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-teal-700 to-transparent mix-blend-multiply"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-white text-2xl font-bold text-center px-6">
              Join our community and start your journey today!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;