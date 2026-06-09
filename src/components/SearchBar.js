import React, { useState, useEffect, useRef } from 'react';
import { FaHistory, FaTimes, FaSearch } from 'react-icons/fa';

function SearchBar({ setQuery }) {
    const [input, setInput] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [showRecentSearches, setShowRecentSearches] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [recentSearches, setRecentSearches] = useState(() => {
        const saved = localStorage.getItem('wallify_recent_searches');
        return saved ? JSON.parse(saved) : [];
    });
    const searchContainerRef = useRef(null);

    useEffect(() => {
        localStorage.setItem('wallify_recent_searches', JSON.stringify(recentSearches));
    }, [recentSearches]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
                setIsFocused(false);
                setShowRecentSearches(false);
                setSelectedIndex(-1);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const getSuggestions = () => {
        if (!input.trim()) return [];
        const searchTerm = input.toLowerCase();
        return recentSearches.filter(search =>
            search.toLowerCase().includes(searchTerm)
        );
    };

    const highlightMatch = (text) => {
        if (!input.trim()) return text;
        const searchTerm = input.toLowerCase();
        const parts = text.split(new RegExp(`(${searchTerm})`, 'gi'));
        return parts.map((part, i) =>
            part.toLowerCase() === searchTerm ?
                <span key={i} className="highlight">{part}</span> :
                part
        );
    };

    const handleKeyDown = (e) => {
        const suggestions = getSuggestions();
        const items = input.trim() ? suggestions : recentSearches;

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setSelectedIndex(prev =>
                    prev < items.length - 1 ? prev + 1 : prev
                );
                break;
            case 'ArrowUp':
                e.preventDefault();
                setSelectedIndex(prev =>
                    prev > 0 ? prev - 1 : -1
                );
                break;
            case 'Enter':
                e.preventDefault();
                if (selectedIndex >= 0 && items[selectedIndex]) {
                    handleSuggestionClick(items[selectedIndex]);
                } else if (input.trim()) {
                    handleSubmit(e);
                }
                break;
            case 'Escape':
                setShowRecentSearches(false);
                setSelectedIndex(-1);
                break;
            default:
                setSelectedIndex(-1);
        }
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        setInput(value);
        setSelectedIndex(-1);
        // Only show dropdown if we have content to show
        const hasSuggestions = value.trim() && getSuggestions().length > 0;
        const hasRecentSearches = !value.trim() && recentSearches.length > 0;
        setShowRecentSearches(isFocused && (hasSuggestions || hasRecentSearches));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.trim()) {
            const searchTerm = input.trim();
            setQuery(searchTerm);
            // Add to recent searches if not already present
            if (!recentSearches.includes(searchTerm)) {
                setRecentSearches(prev => [searchTerm, ...prev].slice(0, 5));
            }
            // Don't clear input or focus after search
            setIsFocused(true);
            // Update suggestions visibility
            const hasSuggestions = searchTerm && getSuggestions().length > 0;
            const hasRecentSearches = !searchTerm && recentSearches.length > 0;
            setShowRecentSearches(hasSuggestions || hasRecentSearches);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setInput(suggestion);
        setQuery(suggestion);
        // Keep the dropdown visible after selecting a suggestion
        setIsFocused(true);
        const hasSuggestions = suggestion.trim() && getSuggestions().length > 0;
        const hasRecentSearches = !suggestion.trim() && recentSearches.length > 0;
        setShowRecentSearches(hasSuggestions || hasRecentSearches);
        setSelectedIndex(-1);
    };

    const clearRecentSearches = (e) => {
        e.stopPropagation();
        setRecentSearches([]);
        localStorage.removeItem('wallify_recent_searches');
        setShowRecentSearches(false);
        setSelectedIndex(-1);
    };

    const handleInputFocus = () => {
        setIsFocused(true);
        // Only show if we have content to show
        const hasSuggestions = input.trim() && getSuggestions().length > 0;
        const hasRecentSearches = !input.trim() && recentSearches.length > 0;
        setShowRecentSearches(hasSuggestions || hasRecentSearches);
    };

    const suggestions = getSuggestions();
    const hasContentToShow = (input.trim() && suggestions.length > 0) ||
        (!input.trim() && recentSearches.length > 0);

    return (
        <div className="sp-search-container" ref={searchContainerRef}>
            <form onSubmit={handleSubmit} className="sp-search-bar">
                <input
                    type="text"
                    placeholder="Search stunning wallpapers..."
                    value={input}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    onKeyDown={handleKeyDown}
                    className="sp-search-input"
                />
                <button type="submit" className="sp-search-button">Search</button>
            </form>
            {showRecentSearches && hasContentToShow && (
                <div className="sp-recent-searches">
                    {input.trim() && suggestions.length > 0 ? (
                        <>
                            <div className="sp-recent-searches-header">
                                <div className="sp-recent-searches-title">
                                    <FaSearch />
                                    <span>Suggestions</span>
                                </div>
                                <button
                                    className="sp-clear-recent-searches"
                                    onClick={() => setShowRecentSearches(false)}
                                    title="Close suggestions"
                                >
                                    <FaTimes />
                                </button>
                            </div>
                            <div className="sp-recent-searches-list">
                                {suggestions.map((suggestion, index) => (
                                    <button
                                        key={index}
                                        className={`sp-recent-search-item ${selectedIndex === index ? 'selected' : ''}`}
                                        onClick={() => handleSuggestionClick(suggestion)}
                                    >
                                        {highlightMatch(suggestion)}
                                    </button>
                                ))}
                            </div>
                        </>
                    ) : !input.trim() && recentSearches.length > 0 ? (
                        <>
                            <div className="sp-recent-searches-header">
                                <div className="sp-recent-searches-title">
                                    <FaHistory />
                                    <span>Recent Searches</span>
                                </div>
                                <button
                                    className="sp-clear-recent-searches"
                                    onClick={clearRecentSearches}
                                    title="Clear recent searches"
                                >
                                    <FaTimes />
                                </button>
                            </div>
                            <div className="sp-recent-searches-list">
                                {recentSearches.map((search, index) => (
                                    <button
                                        key={index}
                                        className={`sp-recent-search-item ${selectedIndex === index ? 'selected' : ''}`}
                                        onClick={() => handleSuggestionClick(search)}
                                    >
                                        {search}
                                    </button>
                                ))}
                            </div>
                        </>
                    ) : null}
                </div>
            )}
        </div>
    );
}

export default SearchBar;
