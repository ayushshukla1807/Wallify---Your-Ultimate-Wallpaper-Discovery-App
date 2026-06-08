import React, { useEffect, useState } from 'react';
import WallpaperGrid from './WallpaperGrid';
import { UNSPLASH_ACCESS_KEY } from '../config';

function FavoritesPage() {
    const [favoriteWallpapers, setFavoriteWallpapers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchFavorites = async () => {
            const wallpaperIds = JSON.parse(localStorage.getItem('wallify_favorites') || '[]');
            if (wallpaperIds.length === 0) {
                setFavoriteWallpapers([]);
                setLoading(false);
                return;
            }

            try {
                const results = await Promise.all(
                    wallpaperIds.map(id =>
                        fetch(`https://api.unsplash.com/photos/${id}?client_id=${UNSPLASH_ACCESS_KEY}`)
                            .then(res => {
                                if (!res.ok) throw new Error('Failed to fetch wallpaper');
                                return res.json();
                            })
                    )
                );
                setFavoriteWallpapers(results);
                setError('');
            } catch (err) {
                setError('Failed to load favorites. Please try again later.');
                setFavoriteWallpapers([]);
            } finally {
                setLoading(false);
            }
        };

        fetchFavorites();
    }, []);

    return (
        <div className="sp-search-page">
            <h1 className="sp-search-title">Your Favorite Wallpapers</h1>
            {loading ? (
                <div className="sp-loading-spinner">
                    <div className="spinner"></div>
                </div>
            ) : error ? (
                <div className="sp-error">{error}</div>
            ) : favoriteWallpapers.length === 0 ? (
                <div className="sp-no-results">
                    <span role="img" aria-label="empty heart">💔</span>
                    <p>
                        No favorites yet.<br />
                        Click the <span style={{color: '#ff4b5c'}}>heart</span> on any wallpaper to save it here!
                    </p>
                </div>
            ) : (
                <WallpaperGrid wallpapers={favoriteWallpapers} />
            )}
        </div>
    );
}

export default FavoritesPage;
