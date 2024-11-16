import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import banana from '../../../public/banana.png';
import google from '../../../public/google.png';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [notificationVisible, setNotificationVisible] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    if (!username || !email || !password) {
      setError('All fields are necessary.');
      return;
    }

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: username,
          email,
          password,
        }),
      });

      if (res.ok) {
        setNotificationVisible(true); // Show notification
        setTimeout(() => {
          setNotificationVisible(false); // Hide after a delay
          router.push('/welcome');
        }, 3000); // 3 seconds delay
      } else {
        console.error('User registration failed.');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-white">
      {notificationVisible && (
        <div
          className={`fixed top-0 right-4 bg-yellow-200 shadow-lg rounded-lg p-4 border border-gray-200 transition-transform transform ${notificationVisible ? 'translate-y-0' : '-translate-y-full'
            }`}
          style={{ transition: 'transform 0.5s ease-in-out', marginTop: '16px' }} // Adjust the transition timing as needed
        >
          <div className="flex items-start gap-4">
            <span className="text-green-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </span>

            <div className="flex-1">
              <strong className="block font-medium text-gray-900">Registration Successful</strong>
              <p className="mt-1 text-sm text-gray-700">You will be redirected shortly.</p>
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
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border text-black border-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border text-black border-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border text-black border-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-yellow-400 text-white font-semibold rounded hover:scale-100 hover:bg-yellow-500 transition"
          >
            Sign Up
          </button>
        </form>

        {error && (
          <div className="text-center text-red-500 mt-4">
            {error}
          </div>
        )}

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
          Sign up with Google
        </button>

        <p className="text-center text-gray-600 mt-4">
          Already Have an account?{' '}
          <Link href="/login" className="text-blue-500 hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;









