import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';

function LandingPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [recentSearches, setRecentSearches] = useState([]);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
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

    return (
        <div className="landing-container">
            <div className="landing-content">
                <div className="landing-logo">
                    <img src={logo} alt="Wallify Logo" className="landing-logo-image" />
                    <h1 className="landing-title">Wallify</h1>
                </div>
                <form onSubmit={handleSubmit} className="landing-search-form">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search for wallpapers..."
                        className="landing-search-input"
                        autoFocus
                    />
                    <button type="submit" className="landing-search-button">
                        Search Wallpapers
                    </button>
                </form>
                <p className="landing-credit">Powered by Unsplash</p>
            </div>
        </div>
    );
}

export default LandingPage;