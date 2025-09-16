import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiHome, FiArrowLeft } from 'react-icons/fi';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-9xl font-bold text-indigo-600">404</h1>
        <h2 className="text-3xl font-bold text-gray-800 mt-4">Page Not Found</h2>
        <p className="text-gray-600 mt-2 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="bg-indigo-600 text-white px-6 py-3 rounded-md font-medium flex items-center justify-center"
          >
            <FiHome className="mr-2" />
            Go Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="border border-indigo-600 text-indigo-600 px-6 py-3 rounded-md font-medium flex items-center justify-center"
          >
            <FiArrowLeft className="mr-2" />
            Go Back
          </button>
        </div>
      </motion.div>
    </div>
  );
}