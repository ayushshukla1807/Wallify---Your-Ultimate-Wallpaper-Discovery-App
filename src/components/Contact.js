import React, { useState } from 'react';
import './Contact.css';

function Contact() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        companyName: '',
        email: '',
        phoneNumber: '',
        message: '',
        acceptTerms: false
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here
        console.log(formData);
        // Reset form
        setFormData({
            firstName: '',
            lastName: '',
            companyName: '',
            email: '',
            phoneNumber: '',
            message: '',
            acceptTerms: false
        });
        alert('Message sent successfully!');
    };

    return (
        <div className="contact-container">
            <div className="contact-content">
                <div className="contact-info">
                    <h2>Get in touch</h2>

                    <div className="contact-section">
                        <h3>Visit us</h3>
                        <p>Come say hello at our office HQ.</p>
                        <p>Your Space, Reveal Orchid, Pune</p>
                    </div>

                    <div className="contact-section">
                        <h3>Chat to us</h3>
                        <p>Our friendly team is here to help.</p>
                        <p><a href="mailto:hello@wallify.com">hello@wallify.com</a></p>
                    </div>

                    <div className="contact-section">
                        <h3>Call us</h3>
                        <p>Mon-Fri from 8am to 5pm</p>
                        <p><a href="tel:+995555555555">(+91) 98765XXXXX</a></p>
                    </div>

                    {/* <div className="contact-section">
                        <h3>Social media</h3>
                        <div className="social-links">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                                <FaFacebook />
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                                <FaLinkedin />
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                                <FaInstagram />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                                <FaTwitter />
                            </a>
                        </div>
                    </div> */}
                </div>

                <form className="contact-form" onSubmit={handleSubmit}>
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="firstName">First Name</label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                                placeholder="First Name"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastName">Last Name</label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                                placeholder="Last Name"
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="companyName">Company Name</label>
                        <input
                            type="text"
                            id="companyName"
                            name="companyName"
                            value={formData.companyName}
                            onChange={handleChange}
                            required
                            placeholder="Company Name"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="Email"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="phoneNumber">Phone Number</label>
                        <div className="phone-input">
                            <select className="country-code">
                                <option value="+91">IN +91</option>
                                <option value="+1">US +1</option>
                                <option value="+995">GE +995</option>
                                <option value="+44">GB +44</option>
                            </select>
                            <input
                                type="tel"
                                id="phoneNumber"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                required
                                placeholder="(+91) 98765XXXXX"
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="message">Message</label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            placeholder="Tell us what you need help with"
                            rows="4"
                        />
                    </div>

                    <div className="form-group checkbox-group">
                        <input
                            type="checkbox"
                            id="acceptTerms"
                            name="acceptTerms"
                            checked={formData.acceptTerms}
                            onChange={handleChange}
                            required
                        />
                        <label htmlFor="acceptTerms">
                            I'd like to receive more information about company, I understand and agree to the{' '}
                            <a href="/privacy">Privacy Policy</a>
                        </label>
                    </div>

                    <button type="submit" className="submit-btn">Send Message</button>
                </form>
            </div>
        </div>
    );
}

export default Contact; 