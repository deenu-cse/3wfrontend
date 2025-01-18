import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

export default function Adminlog() {
    const [formData, setFormData] = useState({
        name: "",
        password: "",
    });

    const navigate = useNavigate()

    // Handle text input changes
    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Use POST method instead of GET
            const response = await fetch("http://localhost:3000/adminLog", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const responseData = await response.json();
                console.log(responseData);
                localStorage.setItem('adminId', responseData)
                alert("Admin logged in successfully");
                navigate('/admin-dashboard')
            } else {
                alert("Error logging in");
                console.error("Error response:", response.statusText);
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("Error logging in");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Admin Login</h1>
            <label>Username:</label>
            <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleInputChange}
                required
            />
            <label>Password:</label>
            <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                required
            />
            <button type="submit">Login</button>
            <p>Not admin? <NavLink to={'/createAdmin'}>Create admin account</NavLink></p>
        </form>
    );
}
