import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase/firebaseconfig';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  // Check if the user is logged in
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user); // if user exists, set isLoggedIn to true
    });
    return () => unsubscribe();
  }, []);

  function LogOut() {
    signOut(auth)
      .then(() => {
        console.log('Sign-out successful.');
      })
      .catch((error) => {
        console.error('Sign-out error:', error);
      });
  }

  return (
    <div className="navbar bg-primary text-white">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          {/* Conditionally render the dropdown links */}
          {isLoggedIn && (
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 text-black rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="home">Home</Link>
              </li>
              <li>
                <Link to="dashboard">Dashboard</Link>
              </li>
              <li>
                <Link to="profile">Profile</Link>
              </li>
            </ul>
          )}
        </div>
        <a className="btn btn-ghost text-xl">Blogging App</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        {/* Conditionally render the navigation links */}
        {isLoggedIn && (
          <ul className="menu menu-horizontal px-1 text-[1rem]">
            <li>
              <Link to="home">Home</Link>
            </li>
            <li>
              <Link to="dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="profile">Profile</Link>
            </li>
          </ul>
        )}
      </div>
      <div className="navbar-end">
        {isLoggedIn ? (
          <button onClick={LogOut} className="text-white">
            Log Out
          </button>
        ) : location.pathname === '/register' ? (
          <Link to="/login" className="m-3 text-white">
            Login
          </Link>
        ) : location.pathname === '/login' ? (
          <Link to="/register" className="m-3 text-white">
            Signup
          </Link>
        ) : (
          <Link to="/register" className="m-3 text-white">
            Signup
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;