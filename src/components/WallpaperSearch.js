import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import WallpaperGrid from './WallpaperGrid';
import SearchBar from './SearchBar';
import ArrowDownIcon from './ArrowDownIcon';
import { FaDice } from 'react-icons/fa';
import { UNSPLASH_ACCESS_KEY } from '../config';

function WallpaperSearch() {
    const location = useLocation();
    const [wallpapers, setWallpapers] = useState([]);
    const [query, setQuery] = useState(location.state?.query || '');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [page, setPage] = useState(1);
    const [mode, setMode] = useState(location.state?.mode || 'random');
    const [hasMore, setHasMore] = useState(true);
    const isRandomModeChange = useRef(false);

    // Fetch random wallpapers and append if needed
    const fetchRandomWallpapers = useCallback(async (append = false) => {
        setLoading(true);
        setError('');
        try {
            const response = await fetch(
                `https://api.unsplash.com/photos/random?client_id=${UNSPLASH_ACCESS_KEY}&count=20`
            );
            if (!response.ok) throw new Error('Failed to fetch wallpapers.');
            const data = await response.json();
            const newWallpapers = Array.isArray(data) ? data : [data];
            setWallpapers(prev =>
                append ? [...prev, ...newWallpapers] : newWallpapers
            );
            setHasMore(true); // Always allow loading more randoms
        } catch (err) {
            setError('Failed to fetch wallpapers. Please try again.');
        } finally {
            setLoading(false);
        }
    }, []);

    // Fetch search results and append if needed
    const fetchSearchWallpapers = useCallback(async (searchQuery, nextPage = 1, append = false) => {
        setLoading(true);
        setError('');
        try {
            const response = await fetch(
                `https://api.unsplash.com/search/photos?query=${encodeURIComponent(searchQuery)}&client_id=${UNSPLASH_ACCESS_KEY}&per_page=20&page=${nextPage}`
            );
            if (!response.ok) throw new Error('Failed to fetch wallpapers.');
            const data = await response.json();
            const results = data.results || [];
            setWallpapers(prev =>
                append ? [...prev, ...results] : results
            );
            setHasMore(results.length > 0);
        } catch (err) {
            setError('Failed to fetch wallpapers. Please try again.');
        } finally {
            setLoading(false);
        }
    }, []);

    // Handle location state changes
    useEffect(() => {
        if (location.state?.fromCategory) {
            setQuery(location.state.query);
            setMode('search');
            setPage(1);
            fetchSearchWallpapers(location.state.query, 1, false);
        }
    }, [location.state, fetchSearchWallpapers]);

    // Initial load and mode changes
    useEffect(() => {
        if (mode === 'random' && !isRandomModeChange.current) {
            isRandomModeChange.current = true;
            fetchRandomWallpapers(false);
        } else if (query) {
            isRandomModeChange.current = false;
            fetchSearchWallpapers(query, 1, false);
        }
    }, [mode, query, fetchRandomWallpapers, fetchSearchWallpapers]);

    const handleSearch = (newQuery) => {
        if (newQuery.trim()) {
            setMode('search');
            setQuery(newQuery);
            setPage(1);
        }
    };

    const handleShowRandom = () => {
        isRandomModeChange.current = false;
        setMode('random');
        setQuery('');
        setPage(1);
    };

    // Downward arrow button handler
    const handleAddMore = () => {
        if (mode === 'random') {
            fetchRandomWallpapers(true);
        } else if (mode === 'search' && query) {
            const nextPage = page + 1;
            fetchSearchWallpapers(query, nextPage, true);
            setPage(nextPage);
        }
    };

    return (
        <div className="search-page">
            <h1>Explore Wallpapers</h1>
            <SearchBar setQuery={handleSearch} />
            {mode === 'search' && (
                <button className="explore-random-btn" onClick={handleShowRandom} aria-label="Explore Random Wallpapers">
                    <FaDice size={28} />
                </button>
            )}
            {error && <div className="error">{error}</div>}
            {loading && !wallpapers.length ? (
                <div className="loading-spinner">
                    <div className="spinner"></div>
                </div>
            ) : !loading && !wallpapers.length ? (
                <p>No wallpapers found.</p>
            ) : (
                <>
                    <WallpaperGrid wallpapers={wallpapers} />
                    {loading && <div className="loading-spinner"><div className="spinner"></div></div>}
                </>
            )}
            {hasMore && !loading && (
                <button
                    className="add-more-arrow-btn"
                    onClick={handleAddMore}
                    disabled={loading}
                    aria-label="Show more wallpapers"
                    style={{ background: 'transparent', border: 'none', padding: 0 }}>
                    <ArrowDownIcon size={32} />
                </button>
            )}
        </div>
    );
}

export default WallpaperSearch;
