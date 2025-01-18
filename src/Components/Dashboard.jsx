import React, { useState, useEffect } from 'react';
import '../Styles/Dashboard.css';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [active, setActive] = useState(true);

    const navigate = useNavigate();

    const adminId = localStorage.getItem('adminId');

    if (!adminId) {
        navigate('/adminlogin');
    }

    // Fetch users from the database
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('https://3wbackend-eight.vercel.app/getUsers'); 
                if (!response.ok) {
                    throw new Error('Failed to fetch users');
                }
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };
        fetchUsers();
    }, []);

    const handleUserClick = (user) => {
        setSelectedUser(user);
    };

    const toggleSidebar = () => {
        setActive(!active);
    };

    return (
        <div className={`dashboard-container ${active ? 'sidebar-active' : 'sidebar-closed'}`}>
            <div className={`sidebar ${active ? '' : 'closed'}`}>
                <div className="flexfirst">
                    <h2>Users</h2>
                    <h2
                        className="close-btn"
                        onClick={toggleSidebar}
                    >
                        {active ? '✘' : '☰'}
                    </h2>
                </div>
                <ul>
                    {users.map((user) => (
                        <li
                            key={user._id}
                            onClick={() => handleUserClick(user)}
                            className={selectedUser?._id === user._id ? 'active' : ''}
                        >
                            <p className="user-name">{user.name}</p>
                            <p className="user-handle">@{user.socialMediaHandle}</p>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="main-content">
                {selectedUser ? (
                    <>
                        <h2>{selectedUser.name}</h2>
                        <p>@{selectedUser.socialMediaHandle}</p>
                        <div className="image-gallery">
                            {selectedUser.images.map((image, index) => (
                                <div key={index} className="image-container">
                                    <img src={image} alt={`User submission ${index + 1}`} />
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="placeholder">
                        <h2>Select a user to view their submissions</h2>
                    </div>
                )}
            </div>
        </div>
    );
}
