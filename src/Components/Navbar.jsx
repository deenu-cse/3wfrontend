import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Styles/Navbar.css';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-logo">
                    <Link to="/" className="logo">3wTechno</Link>
                </div>
                <div className={`navbar-links`}>
                    <ul>
                        <li><Link to="/adminlogin" className="navbar-link">Admin</Link></li>
                        <li><Link to="/admin-dashboard" className="navbar-link">Dashboard</Link></li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
