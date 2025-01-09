import React, { useState } from 'react';

function SignIn() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);

    // Simulating an API call
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-500 to-blue-600 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl w-full bg-white p-8 rounded-xl shadow-lg grid lg:grid-cols-2 gap-8">
        {/* Form Section */}
        <div className="flex flex-col justify-center">
          <h2 className="text-center text-3xl font-extrabold text-gray-800">SignIn as a Tutor</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <a href="signup" className="font-medium text-teal-600 hover:text-teal-500">
            <br />Signup
            </a>

          </p>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                  placeholder="Enter your password"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-all duration-300 ${
                  isLoading && 'opacity-75 cursor-not-allowed'
                }`}
              >
                {isLoading ? 'Signing up...' : 'Sign In'}
              </button>
            </div>
          </form>
          <div className="mt-8">
            <div className="relative flex items-center">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="mx-4 text-sm text-gray-500">Or continue with</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>
            <div className="mt-6 grid grid-cols-3 gap-3">
              {['Facebook', 'Twitter', 'GitHub'].map((provider) => (
                <a
                  key={provider}
                  href="#"
                  className="inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition"
                >
                  <span className="sr-only">Sign In with {provider}</span>
                  <img src={`/${provider.toLowerCase()}.svg`} alt={provider} className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
        {/* Image Section */}
        <div className="relative hidden lg:block">
          <img
            src="\tutor.jpg?height=600&width=400"
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

export default SignIn;
