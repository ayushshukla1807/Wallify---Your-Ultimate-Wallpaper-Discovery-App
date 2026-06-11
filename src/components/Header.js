import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import { FaThLarge } from 'react-icons/fa';
import CategoryPopup from './CategoryPopup';

function Header() {
    const navigate = useNavigate();
    const [showCategories, setShowCategories] = useState(false);
    const handleExploreClick = (e) => {
        e.preventDefault();
        navigate('/', { replace: true });
        setTimeout(() => {
            navigate('/search', {
                state: {
                    mode: 'random',
                    timestamp: Date.now()
                }
            });
        }, 0);
    };

    const handleCategorySelect = (category) => {
        navigate('/search', {
            state: {
                query: category,
                mode: 'search',
                fromCategory: true
            },
            replace: true
        });
        setShowCategories(false);
    };

    return (
        <header className="header">
            <div className="header-content">
                <Link to="/" className="header-logo">
                    <img src={logo} alt="Wallify Logo" className="logo-image" />
                    <span className="logo-text">Wallify</span>
                </Link>
                <nav className="header-nav">
                    <Link to="/" className="nav-link">Home</Link>
                    <button onClick={handleExploreClick} className="nav-link">Explore</button>
                    <button
                        className="nav-link category-btn"
                        onClick={() => setShowCategories(true)}
                    >
                        <FaThLarge />
                        <span>Categories</span>
                    </button>
                    <Link to="/favorites" className="nav-link">Favorites</Link>
                    <Link to="/contact" className="nav-link">Contact</Link>
                </nav>
            </div>
            {showCategories && (
                <CategoryPopup
                    onSelectCategory={handleCategorySelect}
                    onClose={() => setShowCategories(false)}
                />
            )}
        </header>
    );
}

export default Header;
