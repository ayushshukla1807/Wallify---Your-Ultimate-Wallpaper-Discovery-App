import React, { useState, useEffect } from 'react';
import Masonry from 'react-masonry-css';
import WallpaperCard from './WallpaperCard';

function WallpaperGrid({ wallpapers, lastWallpaperRef }) {
    const [modalWallpaper, setModalWallpaper] = useState(null);

    // Optimize breakpoints for better layout
    const breakpointColumns = {
        default: 3,    // 3 columns for larger screens
        1100: 3,       // 3 columns for medium-large screens
        800: 2,        // 2 columns for medium screens
        500: 1         // 1 column for mobile screens
    };

    const handlePreview = (wallpaper) => setModalWallpaper(wallpaper);
    const handleClose = () => setModalWallpaper(null);

    // Add Escape key listener for modal
    useEffect(() => {
        if (!modalWallpaper) return;

        const handleEsc = (e) => {
            if (e.key === "Escape") {
                setModalWallpaper(null);
            }
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [modalWallpaper]);

    // Download handler
    const handleDownload = async (url, filename = 'wallpaper.jpg') => {
        try {
            const response = await fetch(url, { mode: 'cors' });
            const blob = await response.blob();
            const blobUrl = window.URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(blobUrl);
        } catch (err) {
            alert('Failed to download image.');
        }
    };

    if (!wallpapers.length) {
        return <p>No wallpapers found.</p>;
    }

    return (
        <>
            <div className="masonry-wrapper">
                <Masonry
                    breakpointCols={breakpointColumns}
                    className="masonry-grid"
                    columnClassName="masonry-grid_column"
                >
                    {wallpapers.map((wallpaper, index) => (
                        <div
                            key={wallpaper.id}
                            ref={index === wallpapers.length - 1 ? lastWallpaperRef : null}
                            className="masonry-grid_item"
                        >
                            <WallpaperCard
                                wallpaper={wallpaper}
                                onPreview={handlePreview}
                            />
                        </div>
                    ))}
                </Masonry>
            </div>

            {modalWallpaper && (
                <div className="preview-modal-backdrop" onClick={handleClose}>
                    <div className="preview-modal" onClick={e => e.stopPropagation()}>
                        <img
                            src={modalWallpaper.urls.full}
                            alt={modalWallpaper.alt_description || 'Wallpaper'}
                            className="preview-modal-img"
                        />
                        <button
                            className="preview-modal-download"
                            onClick={() => handleDownload(modalWallpaper.urls.full, `wallify-${modalWallpaper.id}.jpg`)}
                        >
                            Download
                        </button>
                        <button className="close-modal-btn" onClick={handleClose}>
                            Close
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

export default WallpaperGrid;