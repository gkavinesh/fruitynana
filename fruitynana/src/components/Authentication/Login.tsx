"use client";

import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import banana from '../../../public/banana.png';
import google from '../../../public/google.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationType, setNotificationType] = useState('success'); // success or error
  const router = useRouter();

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      setError(result.error);
      setNotificationType('error');
      setNotificationMessage('Sign-in failed. Please check your credentials.');
      setNotificationVisible(true);
      setTimeout(() => {
        setNotificationVisible(false);
      }, 3000);
    } else {
      setNotificationType('success');
      setNotificationMessage('Sign-in successful! Redirecting...');
      setNotificationVisible(true);
      setTimeout(() => {
        setNotificationVisible(false);
        router.push('/welcome');
      }, 3000);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-white">
      {notificationVisible && (
        <div
          className={`fixed top-4 right-4 shadow-lg rounded-lg p-4 border ${
            notificationType === 'success' ? 'bg-green-100 border-green-500' : 'bg-red-100 border-red-500'
          } transition-transform transform ${
            notificationVisible ? 'translate-y-0' : '-translate-y-full'
          }`}
          style={{ transition: 'transform 0.5s ease-in-out', marginTop: '16px' }}
        >
          <div className="flex items-start gap-4">
            <span className={notificationType === 'success' ? 'text-green-600' : 'text-red-600'}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                {notificationType === 'success' ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                )}
              </svg>
            </span>

            <div className="flex-1">
              <strong className="block font-medium text-gray-900">
                {notificationType === 'success' ? 'Success' : 'Error'}
              </strong>
              <p className="mt-1 text-sm text-gray-700">{notificationMessage}</p>
            </div>

            <button
              onClick={() => setNotificationVisible(false)}
              className="text-gray-500 transition hover:text-gray-600"
            >
              <span className="sr-only">Dismiss popup</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      <div className="p-10 bg-transparent rounded-lg shadow-lg border border-black w-full max-w-md">
        <div className="flex justify-center mb-4 mt-2 gap-4">
          <img src={banana.src} alt="Logo" className="w-12 h-12" />
        </div>
        <h1 className="text-2xl font-bold text-center mb-2 mt-2 text-black">fruitynana</h1>
        <br />
        <br />
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="sr-only text-black">
              Email or Username
            </label>
            <input
              type="text"
              id="email"
              placeholder="Email or Username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border text-black border-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only text-black">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border text-black border-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-yellow-400 text-white font-semibold rounded hover:bg-yellow-500 transition"
          >
            Sign In
          </button>
        </form>

        {error && <div className="text-center text-red-500 mt-4">{error}</div>}

        <div className="flex items-center justify-center my-4">
          <div className="border-t border-gray-300 w-full"></div>
          <span className="px-4 text-gray-600">or</span>
          <div className="border-t border-gray-300 w-full"></div>
        </div>

        <button
          onClick={() => signIn('google')}
          className="flex items-center justify-center w-full py-2 border text-black border-gray-400 rounded-xl hover:bg-gray-100 transition hover:scale-105"
        >
          <img src={google.src} alt="Google" className="w-5 h-5 mr-2" />
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


