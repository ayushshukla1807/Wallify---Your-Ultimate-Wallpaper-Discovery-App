import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import './LandingPage.css';

const TRENDING_CATEGORIES = ['Nature', 'Abstract', 'Minimal', 'Cyberpunk', 'Space'];

function LandingPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [recentSearches, setRecentSearches] = useState([]);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        if (e && e.preventDefault) e.preventDefault();
        
        if (searchQuery.trim()) {
            const searchTerm = searchQuery.trim();
            if (!recentSearches.includes(searchTerm)) {
                setRecentSearches(prev => [searchTerm, ...prev].slice(0, 5));
            }
            navigate('/search', { state: { query: searchTerm, mode: 'search' } });
        } else {
            navigate('/search', { state: { mode: 'random' } });
        }
    };

    const handleCategoryClick = (category) => {
        setSearchQuery(category);
        navigate('/search', { state: { query: category, mode: 'search' } });
    };

    return (
        <div className="hero-container">
            <div className="hero-content">
                <div className="hero-header">
                    <div className="hero-logo-container">
                        <img src={logo} alt="Wallify Logo" className="hero-logo-image" />
                    </div>
                    <h1 className="hero-title">Wallify</h1>
                    <p className="hero-subtitle">Find your perfect aesthetic</p>
                </div>
                
                <form onSubmit={handleSubmit} className="hero-search-form">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search for stunning wallpapers..."
                        className="hero-search-input"
                        autoFocus
                    />
                    <button type="submit" className="hero-search-button">
                        Search
                    </button>
                </form>

                <div className="trending-section">
                    <p className="trending-title">Trending Now</p>
                    <div className="trending-chips">
                        {TRENDING_CATEGORIES.map(category => (
                            <button 
                                key={category} 
                                onClick={() => handleCategoryClick(category)}
                                className="trending-chip"
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            <p className="hero-credit">Powered by Unsplash</p>
        </div>
    );
}

export default LandingPage;