import React, { useState } from 'react'
import '../Styles/Userform.css'
import axios from 'axios'


export default function Userform() {
    const [formData, setFormData] = useState({
        name: "",
        socialMediaHandle: "",
        images: [],
    });

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

        const data = new FormData();
        data.append("name", formData.name);
        data.append("socialMediaHandle", formData.socialMediaHandle);

        // Append each image file
        Array.from(formData.images).forEach((image) => data.append("images", image));

        try {
            const response = await axios.post("http://localhost:3000/userForm", data, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            alert("Form submitted successfully");
            console.log("Response:", response.data);
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("Error submitting form");
        }
    };
    return (
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
    );
}
