// import React from 'react'
// import '../css/button.css';
// function Button({icon,name,bgColor='#ff3700',color='#ffffff'}) {
//     return (
//         <a href="#" className="mainBtn" style={{color:color,background:bgColor}}>
//             {icon} {name}
//         </a>
//     )
// }

// export default Button


import React from 'react';
import '../css/button.css';
import { useNavigate } from 'react-router-dom';

function Button({ icon, name, bgColor = '#ff3700', color = '#ffffff' }) {
    const navigate = useNavigate();

    const handleClick = (e) => {
        e.preventDefault();
        navigate('/login');
    };

    return (
        <a href="#" className="mainBtn" style={{ color: color, background: bgColor }} onClick={handleClick}>
            {icon} {name}
        </a>
    );
}

export default Button;
