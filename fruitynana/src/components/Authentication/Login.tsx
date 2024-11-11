"use client"

import { signIn } from 'next-auth/react';
import Link from 'next/link';

const Login = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-center mb-4">
          <img src="/path-to-your-logo.png" alt="Logo" className="w-12 h-12" />
        </div>
        <h1 className="text-2xl font-bold text-center mb-2">fruitynana</h1>
        <p className="text-center text-gray-600 mb-6">Welcome!</p>

        <form className="space-y-4">
          <div>
            <label htmlFor="email" className="sr-only">
              Email or Username
            </label>
            <input
              type="text"
              id="email"
              placeholder="Email or Username"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-yellow-400 text-white font-semibold rounded hover:bg-yellow-500 transition"
          >
            Sign In
          </button>
        </form>

        <div className="flex items-center justify-center my-4">
          <div className="border-t border-gray-300 w-full"></div>
          <span className="px-4 text-gray-600">or</span>
          <div className="border-t border-gray-300 w-full"></div>
        </div>

        <button
          onClick={() => signIn('google')}
          className="flex items-center justify-center w-full py-2 border border-gray-300 rounded hover:bg-gray-100 transition"
        >
          <img
            src="/path-to-google-icon.png"
            alt="Google"
            className="w-5 h-5 mr-2"
          />
          Sign in with Google
        </button>

        <p className="text-center text-gray-600 mt-4">
          Sign Up?{' '}
          <Link href="/sign-up" className="text-blue-500 hover:underline">
            Click here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
