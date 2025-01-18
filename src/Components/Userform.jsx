import React, { useState } from 'react';
import '../Styles/Userform.css';
import axios from 'axios';

export default function Userform() {
    const [formData, setFormData] = useState({
        name: "",
        socialMediaHandle: "",
        images: [],
    });
    const [loading, setLoading] = useState(false);

    // Handle text input changes
    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle file input changes
    const handleFileChange = (e) => {
        setFormData({ ...formData, images: e.target.files });
    };

    // Form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const data = new FormData();
        data.append("name", formData.name);
        data.append("socialMediaHandle", formData.socialMediaHandle);

        // Append each image file
        Array.from(formData.images).forEach((image) => data.append("images", image));

        try {
            const response = await axios.post("https://3wbackend-eight.vercel.app/userForm", data, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            alert("Form submitted successfully");
            console.log("Response:", response.data);
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("Error submitting form");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='fullform'>
            {loading ? (
                <div id="container">
                    <div className="divider" aria-hidden="true"></div>
                    <p className="loading-text" aria-label="Loading">
                        <span className="letter" aria-hidden="true">L</span>
                        <span className="letter" aria-hidden="true">o</span>
                        <span className="letter" aria-hidden="true">a</span>
                        <span className="letter" aria-hidden="true">d</span>
                        <span className="letter" aria-hidden="true">i</span>
                        <span className="letter" aria-hidden="true">n</span>
                        <span className="letter" aria-hidden="true">g</span>
                    </p>
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <h1>User Submission Form</h1>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                    />
                    <label>Social Media Handle:</label>
                    <input
                        type="text"
                        name="socialMediaHandle"
                        placeholder="Social Media Handle"
                        value={formData.socialMediaHandle}
                        onChange={handleInputChange}
                        required
                    />
                    <label>Upload Images:</label>
                    <input
                        type="file"
                        name="images"
                        multiple
                        onChange={handleFileChange}
                        required
                    />

                    <button type="submit">Submit</button>
                </form>
            )}
        </div>
    );
}
