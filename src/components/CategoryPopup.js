import React, { useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { FaTimes } from 'react-icons/fa';

const categories = [
    'Nature', 'Animals', 'Architecture', 'Food & Drink', 'People',
    'Technology', 'Travel', 'Art', 'Sports', 'Abstract', 'Space',
    'Minimal', 'Dark', 'City', 'Ocean', 'Mountains', 'Flowers',
    'Sunset', 'Night', 'Forest', 'Desert', 'Beach', 'Winter',
    'Autumn', 'Summer', 'Spring', 'Gaming', 'Music', 'Fashion', 'Cars'
];

function CategoryPopup({ onSelectCategory, onClose }) {
    const popupRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    return ReactDOM.createPortal(
        <div className="category-popup-overlay">
            <div className="category-popup" ref={popupRef}>
                <div className="category-popup-header">
                    <h3>Categories</h3>
                    <button className="close-category-popup" onClick={onClose}>
                        <FaTimes />
                    </button>
                </div>
                <div className="category-list">
                    {categories.map((category) => (
                        <button
                            key={category}
                            className="category-item"
                            onClick={() => onSelectCategory(category)}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>
        </div>,
        document.body
    );
}

export default CategoryPopup;