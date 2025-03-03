import React from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


const Nav: React.FC = () => {
    const location = useLocation();

    return (
        <nav className='text-[#9198A1] flex justify-center p-6 mb-5 bg-[#1b1e23] '>
            <ul className='flex space-x-10'>
            <li>
                <Link 
                to="/" 
                className={location.pathname === '/' ? 'text-blue-500' : ''}
                >
                Home
                </Link>
            </li>
            <li>
                <Link 
                to="/all-summaries" 
                className={location.pathname === '/all-summaries' ? 'text-blue-500' : ''}
                >
                Your Summaries
                </Link>
            </li>
            </ul>
        </nav>
    );
};

export default Nav;