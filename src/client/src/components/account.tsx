// Placeholder component for the Account page
import React from 'react';
import { User } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Account: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-6 text-white bg-cbg1">

      <User className="h-16 w-16 mb-4 text-ctext opacity-70" />

      <h1 className="text-3xl font-bold mb-2">Account</h1>

      <p className="text-lg text-ctext mb-6 text-center max-w-sm">
        This page is currently <span className='font-bold'>under development</span>. 
        We're brewing up the best features for managing your profile and app settings!
      </p>

      <Link to="/viewcoffees">
        <button 
          className="bg-caction hover:bg-chover text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200"
        >
          Go to Coffee Dashboard
        </button>
      </Link>
    </div>
  );
};

export default Account;