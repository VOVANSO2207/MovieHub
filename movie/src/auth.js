// auth.js
export const isAuthenticated = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return user !== null;
};

export const isAdmin = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return user && user.role === 'admin';
};

export const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        return user;
    }
    return null;
};

export const logout = () => {
    localStorage.removeItem('user');
};
