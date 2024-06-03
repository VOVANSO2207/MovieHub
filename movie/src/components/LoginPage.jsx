import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../auth.js';
import '../css/loginPage.css';
const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        if (email === '' || password === '') {
            setError('Vui lòng điền đầy đủ thông tin');
            return;
        }

        const user = login(email, password);

        if (user) {
            if (user.role === 'admin3') {
                 navigate('/');
            } else {
                navigate('/dashboard');
            }
        } else {
            setError('Thông tin đăng nhập không chính xác');
        }
    };

    return (
        <div className="login-main">
                  <div className="login-container">
            <h2>Đăng nhập</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
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
                <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button onClick={handleLogin} className="login-button">Login</button>
            <p>Bạn chưa có tài khoản? <Link to="/register">Đăng ký</Link></p>
            <div className="circle"></div>
          
        </div>
        </div>
      
    );
};

export default LoginPage;
