import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '../Styles/Userform.css';  

export default function CreateAdmin() {
    const [formData, setFormData] = useState({
        name: "",
        password: "",
        email: "",
        age: ""
    });
    const [loading, setLoading] = useState(false);  
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); 

        try {
            const response = await fetch("https://3wbackend-eight.vercel.app/adminCreate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const responseData = await response.json();
                localStorage.setItem('adminId', responseData);
                alert(responseData.message);
                navigate('/admin-dashboard');
            } else {
                const responseData = await response.json();
                console.log("Error response:", responseData.message);
                alert(responseData.message);
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("Error submitting form");
        } finally {
            setLoading(false);  
        }
    };

    return (
        <div className="fullform">
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
                    <h1>Admin Submission Form</h1>
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
                        type="text"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                    />
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                    />
                    <label>Age:</label>
                    <input
                        type="number"
                        name="age"
                        placeholder="Age"
                        value={formData.age}
                        onChange={handleInputChange}
                        required
                    />
                    <button type="submit">Create</button>
                    <p>
                        <NavLink to="/adminlogin">Have admin account?</NavLink>
                    </p>
                </form>
            )}
        </div>
    );
}
