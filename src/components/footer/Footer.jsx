'use client'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const Footer = () => {
  const router = useRouter();
  const [user, setUser] = useState(null)

  useEffect(() => {
    const storedUser = localStorage.getItem('ifcaresSummer');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const logout = () => {
    // Clear the user cookie
    document.cookie =
      'ifcaresSummer=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    localStorage.removeItem('ifcaresSummer');
    router.push('/auth/login');
  };
  return (
    <footer className="fixed md:relative bottom-0 left-0 z-20 w-full p-4 bg-gradient-to-r from-indigo-700 via-indigo-600 to-indigo-700 border-gray-200 shadow flex items-center justify-between md:p-6">
      {user ? (<span className="text-sm text-white sm:text-center">
        {user.name + ' ' + user.lastname}
      </span>) : <span></span>}
      
      <span className="flex items-center justify-center text-sm font-medium text-white group">
        <button onClick={logout} className="flex items-center">
          <div className="flex items-center gap-1 hover:-translate-y-1 transform transition duration-200 ">
            Logout
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
              />
            </svg>
          </div>
        </button>
      </span>
    </footer>
  );
};

export default Footer;
