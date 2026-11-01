import { Link, useLocation } from "react-router-dom";

export default function ErrorPage() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const error = params.get("error");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Oops! Something went wrong.</h1>
        {error && <p className="text-gray-700 mb-6">{error}</p>}
        <div className="flex justify-center space-x-4">
          <Link
            to="/login"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Go to Login
          </Link>
          <Link
            to="/"
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
          >
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
