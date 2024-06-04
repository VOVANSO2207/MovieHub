import React, { useState, useEffect } from 'react';
import '../css/style.css';

function User() {
    const [users, setUsers] = useState([]);
    const [isAddingUser, setIsAddingUser] = useState(false);
    const [isEditingUser, setIsEditingUser] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    const [editUsername, setEditUsername] = useState('');
    const [editEmail, setEditEmail] = useState('');
    const [editPassword, setEditPassword] = useState('');
    const [newUsername, setNewUsername] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');

    useEffect(() => {
        const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
        setUsers(storedUsers);
    }, []);

    const handleDeleteUser = (index) => {
        const updatedUsers = [...users];
        updatedUsers.splice(index, 1);
        localStorage.setItem('users', JSON.stringify(updatedUsers));
        setUsers(updatedUsers);
    };

    const handleOpenAddUserModal = () => {
        setIsAddingUser(true);
    };

    const handleCloseAddUserModal = () => {
        setIsAddingUser(false);
    };

    const handleAddUser = () => {
        const newUser = { username: newUsername, email: newEmail, password: newPassword };
        const updatedUsers = [...users, newUser];
        localStorage.setItem('users', JSON.stringify(updatedUsers));
        setUsers(updatedUsers);
        setNewUsername('');
        setNewEmail('');
        setNewPassword('');
        setIsAddingUser(false);
    };

    const handleOpenEditUserModal = (index) => {
        setIsEditingUser(true);
        setEditIndex(index);
        const user = users[index];
        setEditUsername(user.username);
        setEditEmail(user.email);
        setEditPassword(user.password);
    };

    const handleCloseEditUserModal = () => {
        setIsEditingUser(false);
    };

    const handleEditUser = () => {
        const updatedUsers = [...users];
        updatedUsers[editIndex] = { username: editUsername, email: editEmail, password: editPassword };
        localStorage.setItem('users', JSON.stringify(updatedUsers));
        setUsers(updatedUsers);
        setIsEditingUser(false);
    };

    return (
        <div className='px-3'>
            <h1 className='text-white'> User List</h1>
            <table className="table caption-top bg-white rounded mt-5">
                <thead>
                    <tr className="table-category" style={{ background: 'red' }}>
                        <th scope="col">#</th>
                        <th scope="col">User</th>
                        <th scope="col">Mail</th>
                        <th scope="col">Password</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.password}</td>
                            <td>
                                <button className="btn btn-warning" onClick={() => handleOpenEditUserModal(index)}>Edit</button>
                                <button className="btn btn-danger" onClick={() => handleDeleteUser(index)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
                <button className="btn btn-success" onClick={handleOpenAddUserModal}>Add User</button>
            </div>
            {isAddingUser && (
                <div className="modal3" style={{ display: 'block' }}>
                    <div className="modal-content2">
                        <span className="close" onClick={handleCloseAddUserModal}>&times;</span>
                        <h2>Add User</h2>
                        <div>
                            <label>Username:</label>
                            <input type="text" value={newUsername} onChange={(e) => setNewUsername(e.target.value)} />
                        </div>
                        <div>
                            <label>Email:</label>
                            <input type="email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
                        </div>
                        <div>
                            <label>Password:</label>
                            <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                        </div>
                        <button className="btn btn-primary" onClick={handleAddUser}>Add</button>
                    </div>
                </div>
            )}
            {isEditingUser && (
                <div className="modal3" style={{ display: 'block' }}>
                    <div className="modal-content3">
                        <span className="close" onClick={handleCloseEditUserModal}>&times;</span>
                        <h2>Edit User</h2>
                        <div>
                            <label>Username:</label>
                            <input type="text" value={editUsername} onChange={(e) => setEditUsername(e.target.value)} />
                        </div>
                        <div>
                            <label>Email:</label>
                            <input type="email" value={editEmail} onChange={(e) => setEditEmail(e.target.value)} />
                        </div>
                        <div>
                            <label>Password:</label>
                            <input type="password" value={editPassword} onChange={(e) => setEditPassword(e.target.value)} />
                        </div>
                        <button className="btn btn-primary" onClick={handleEditUser}>Save</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default User;
