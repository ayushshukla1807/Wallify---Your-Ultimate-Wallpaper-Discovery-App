import React from "react";
import "./Terms.css";

function Terms() {
    return (
        <div className="terms-page-container">
            <div className="terms-page-content">
                <h1>Terms & Conditions</h1>
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
            </div>
        </div>
    );
}

export default Terms;
