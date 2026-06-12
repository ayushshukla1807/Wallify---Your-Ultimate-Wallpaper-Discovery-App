import React from 'react';
import { Link } from 'react-router-dom';
import { FaEnvelope } from 'react-icons/fa';

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h3>Wallify</h3>
                    <p>Find the perfect wallpaper for your device</p>
                </div>

                <div className="footer-section">
                    <h4>Quick Links</h4>
                    <ul className="footer-links">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/search">Explore</Link></li>
                        <li><Link to="/favorites">Favorites</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h4>Legal</h4>
                    <ul className="footer-links">
                        <li><Link to="/terms">Terms & Conditions</Link></li>
                        <li><Link to="/privacy">Privacy Policy</Link></li>
                        <li><Link to="/cookies">Cookie Policy</Link></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h4>Contact</h4>
                    <ul className="footer-links">
                        <li>
                            <a href="mailto:support@wallify.com" className="contact-link">
                                <FaEnvelope /> support@wallify.com
                            </a>
                        </li>
                    </ul>
                    <div className="powered-by">
                        <h4>Powered by</h4>
                        <a
                            href="https://unsplash.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="footer-link"
                        >
                            Unsplash
                        </a>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p className="copyright">© {new Date().getFullYear()} Wallify. All rights reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;
