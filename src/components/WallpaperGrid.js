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

    // Copy Link handler
    const handleCopyLink = async (url) => {
        try {
            await navigator.clipboard.writeText(url);
            alert('Link copied to clipboard!');
        } catch (err) {
            alert('Failed to copy link.');
        }
    };

    if (!wallpapers.length) {
        return <p>No wallpapers found.</p>;
    }

    return (
        <>
            <div className="sp-masonry-wrapper">
                <Masonry
                    breakpointCols={breakpointColumns}
                    className="sp-masonry-grid"
                    columnClassName="sp-masonry-grid_column"
                >
                    {wallpapers.map((wallpaper, index) => (
                        <div
                            key={wallpaper.id}
                            ref={index === wallpapers.length - 1 ? lastWallpaperRef : null}
                            className="sp-masonry-grid_item"
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
                <div className="sp-preview-modal-backdrop" onClick={handleClose}>
                    <div className="sp-preview-modal" onClick={e => e.stopPropagation()}>
                        <img
                            src={modalWallpaper.urls.full}
                            alt={modalWallpaper.alt_description || 'Wallpaper'}
                            className="sp-preview-modal-img"
                        />
                        <div className="sp-preview-modal-actions">
                            <button
                                className="sp-preview-modal-download"
                                onClick={() => handleDownload(modalWallpaper.urls.full, `wallify-${modalWallpaper.id}.jpg`)}
                            >
                                Download
                            </button>
                            <button
                                className="sp-preview-modal-copy"
                                onClick={() => handleCopyLink(modalWallpaper.urls.full)}
                            >
                                Copy Link
                            </button>
                        </div>
                        <button className="sp-close-modal-btn" onClick={handleClose}>
                            Close
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

export default WallpaperGrid;