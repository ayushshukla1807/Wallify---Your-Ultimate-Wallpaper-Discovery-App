import React, { useRef, useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import "./Signup.css"; // Reuse the same CSS as Signup

function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            await signInWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value);
            navigate("/profile");
        } catch (err) {
            setError("Invalid email or password.");
        }
    };

    return (
        <div className="signup-outer">
            <div className="signup-container">
                <div className="signup-left">
                    <div className="signup-logo">WALLIFY</div>
                    <div className="signup-image-bg">
                        <div className="signup-image-overlay">
                            <h3>Welcome Back!<br />Log in to continue your journey</h3>
                        </div>
                    </div>
                    <button className="back-btn" onClick={() => navigate("/")}>
                        Back to website →
                    </button>
                </div>
                <div className="signup-right">
                    <h2>Log in to your account</h2>
                    <p className="signup-login-link">
                        Don't have an account? <Link to="/signup">Sign up</Link>
                    </p>
                    {error && <p className="signup-error">{error}</p>}
                    <form className="signup-form" onSubmit={handleSubmit}>
                        <input type="email" ref={emailRef} placeholder="Email" required />
                        <input type="password" ref={passwordRef} placeholder="Enter your password" required />
                        <button type="submit" className="signup-btn">
                            Log In
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
