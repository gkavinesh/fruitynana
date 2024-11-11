import SignUp from '../../components/Authentication/SignUp'; // Adjust the import path based on your folder structure

const SignUpPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md">
        <SignUp />
      </div>
    </div>
  );
};

export default SignUpPage;
