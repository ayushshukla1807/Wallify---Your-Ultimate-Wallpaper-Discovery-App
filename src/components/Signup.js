import React, { useRef, useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import "./Signup.css"; // Import the CSS file

function Signup() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const [error, setError] = useState("");
    const [agree, setAgree] = useState(false);
    const navigate = useNavigate();
    const [showTerms, setShowTerms] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        if (!agree) {
            setError("You must agree to the Terms & Conditions.");
            return;
        }
        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                emailRef.current.value,
                passwordRef.current.value
            );
            await updateProfile(userCredential.user, {
                displayName: `${firstNameRef.current.value} ${lastNameRef.current.value}`,
            });
            navigate("/profile");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="signup-outer">
            <div className="signup-container">
                <div className="signup-left">
                    <div className="signup-logo">WALLIFY</div>
                    <div className="signup-image-bg">
                        {/* You can use an <img> or background-image here */}
                        <div className="signup-image-overlay">
                            <h3>Capturing Moments,<br />Creating Memories</h3>
                        </div>
                    </div>
                    <button className="back-btn" onClick={() => navigate("/")}>
                        Back to website →
                    </button>
                </div>
                <div className="signup-right">
                    <h2>Create an account</h2>
                    <p className="signup-login-link">
                        Already have an account? <Link to="/login">Log in</Link>
                    </p>
                    {error && <p className="signup-error">{error}</p>}
                    <form className="signup-form" onSubmit={handleSubmit}>
                        <div className="signup-names">
                            <input
                                type="text"
                                ref={firstNameRef}
                                placeholder="First name"
                                required
                            />
                            <input
                                type="text"
                                ref={lastNameRef}
                                placeholder="Last name"
                                required
                            />
                        </div>
                        <input
                            type="email"
                            ref={emailRef}
                            placeholder="Email"
                            required
                        />
                        <input
                            type="password"
                            ref={passwordRef}
                            placeholder="Enter your password"
                            required
                        />
                        <div className="signup-checkbox-row">
                            <input
                                type="checkbox"
                                id="agree"
                                checked={agree}
                                onChange={() => setAgree(!agree)}
                                required
                            />
                            <label htmlFor="agree">
                                I agree to the{" "}
                                <button
                                    type="button"
                                    className="terms-link"
                                    onClick={() => setShowTerms(true)}
                                >
                                    Terms & Conditions
                                </button>
                            </label>
                        </div>
                        <button type="submit" className="signup-btn">
                            Create account
                        </button>
                    </form>
                    {showTerms && (
                        <div className="terms-modal-backdrop" onClick={() => setShowTerms(false)}>
                            <div
                                className="terms-modal"
                                onClick={e => e.stopPropagation()}
                            >
                                <h2>Terms & Conditions</h2>
                                <div className="terms-content">
                                    <p>By using this website, you agree to the following terms:</p>
                                    <ol>
                                        <li>
                                            <strong>Usage:</strong> All wallpapers are for personal use only and may not be redistributed, resold, or used for commercial purposes without permission.
                                        </li>
                                        <li>
                                            <strong>Attribution:</strong> Wallpapers may be sourced from third-party providers (e.g., Unsplash). Proper attribution must be maintained where applicable.
                                        </li>
                                        <li>
                                            <strong>Liability:</strong> We are not liable for any misuse of content or any damage resulting from the use of this website.
                                        </li>
                                        <li>
                                            <strong>Copyright:</strong> All images belong to their respective owners. If you believe your content has been used improperly, contact us for removal.
                                        </li>
                                        <li>
                                            <strong>Privacy:</strong> We do not collect personal data without consent. Some anonymous usage data may be collected for analytics purposes.
                                        </li>
                                    </ol>
                                    <p>These terms may be updated at any time. Continued use of the site constitutes acceptance of the current terms.</p>
                                </div>
                                <button className="close-modal-btn" onClick={() => setShowTerms(false)}>
                                    Close
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Signup;
