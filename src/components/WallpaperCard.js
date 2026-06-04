import React, { useState } from 'react';

function WallpaperCard({ wallpaper, onPreview }) {
    const [isHearted, setIsHearted] = useState(() => {
        const favorites = JSON.parse(localStorage.getItem('wallify_favorites') || '[]');
        return favorites.includes(wallpaper.id);
    });

    // Determine if image is portrait or landscape
    const isPortrait = wallpaper.height > wallpaper.width;

    const toggleHeart = (e) => {
        e.stopPropagation();
        const favorites = JSON.parse(localStorage.getItem('wallify_favorites') || '[]');

        if (isHearted) {
            const newFavorites = favorites.filter(id => id !== wallpaper.id);
            localStorage.setItem('wallify_favorites', JSON.stringify(newFavorites));
        } else {
            favorites.push(wallpaper.id);
            localStorage.setItem('wallify_favorites', JSON.stringify(favorites));
        }

        setIsHearted(!isHearted);
    };

    // Format resolution for display
    const formatResolution = (width, height) => {
        return `${width} × ${height}`;
    };

    return (
        <div className={`wallpaper-card ${isPortrait ? 'portrait' : 'landscape'}`}>
            <img
                src={wallpaper.urls.regular}
                alt={wallpaper.alt_description || 'Wallpaper'}
                loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
            <button
                className="heart-btn"
                onClick={toggleHeart}
                aria-label={isHearted ? 'Remove from favorites' : 'Add to favorites'}
            >
                <svg
                    className={`heart-shape ${isHearted ? 'hearted' : ''}`}
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
            </button>
            <button
                className="preview-btn"
                onClick={() => onPreview(wallpaper)}
            >
                Preview
            </button>
            <div className="resolution-info">
                {formatResolution(wallpaper.width, wallpaper.height)}
            </div>
        </div>
    );
}

export default WallpaperCard;