import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import './RegisterPage.css';
import '../css/registerPage.css';

const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleRegister = () => {
        if (username === '' || email === '' || password === '' || confirmPassword === '') {
            setError('Vui lòng điền đầy đủ thông tin');
            return;
        }

        if (password !== confirmPassword) {
            setError('Mật khẩu không khớp');
            return;
        }

        if (password.length < 6) {
            setError('Mật khẩu phải có ít nhất 6 ký tự');
            return;
        }

        const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
        const userExists = existingUsers.some(user => user.username === username);

        if (userExists) {
            setError('Tài khoản đã tồn tại');
            return;
        }

        const newUser = { username, email, password, role: 'user' };
        existingUsers.push(newUser);
        localStorage.setItem('users', JSON.stringify(existingUsers));

        navigate('/login');
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="register-container">
            <h2>Đăng ký</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div className="form-group">
                <label>Username</label>
                <input
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label>Email</label>
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label>Password</label>
                <div className="password-input-container">
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="password-toggle-icon"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        onClick={togglePasswordVisibility}
                    >
                        {showPassword ? (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M15.875 9.876a2 2 0 114.25 1.248M12 18.876c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 104.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                            />
                        ) : (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                            />
                        )}
                    </svg>
                </div>
            </div>
            <div className="form-group">
                <label>Confirm Password</label>
                <div className="password-input-container">
                <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="password-toggle-icon"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        onClick={togglePasswordVisibility}
                    >
                        {showPassword ? (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M15.875 9.876a2 2 0 114.25 1.248M12 18.876c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 104.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                            />
                        ) : (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                            />
                        )}
                    </svg>
            </div>
            </div>
            <button onClick={handleRegister} className="register-button">Sign up</button>
        </div>
    );
};

export default RegisterPage;
