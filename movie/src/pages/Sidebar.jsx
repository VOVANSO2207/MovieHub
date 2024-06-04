import React from 'react'
import '../css/style.css'
import { useNavigate } from "react-router-dom"
function Sidebar() {
    const navigate = useNavigate(); // Khai báo biến navigate
    const gotohome = () => {
        navigate('/dashboard'); // Sử dụng biến navigate để điều hướng
    };
    const handleNavigate = () => {
        navigate('/movielist'); // Sử dụng biến navigate để điều hướng
    };
    const handleNavigate1 = () => {
        navigate('/movieadd'); 
    };
    const handleNavigate2 = () => {
        navigate('/category'); 
    };
    const handleNavigate3 = () => {
        navigate('/user'); 
    };
    const handleNavigate4 = () => {
        navigate('/actor'); 
    };
    return (
        <div className=' sidebar p-2 mt-5' id="sidebar">
            <div className='m-2'>
                <i style={{color: 'grey'}}  className='bi bi-bootstrap-fill me-3 fs-4'></i>
                <span className='brand-name fs-4' style={{color: 'grey', fontWeight: 'bold', padding: '5px'}}>TL</span>
            </div>
            <hr className='text-dark'></hr>
            <div className='list-group list-group-flush'>
                <a className='list-group-item py-2' style={{background: '#FF9999', border: '15px' }}>
                    <i className='bi bi-speedometer2'></i>
                    <span onClick ={gotohome} className='fs-7'  style={{color: 'red', fontWeight: 'bold', padding: '5px'}}>Dashboard</span>
                </a>
                <a className='list-group-item py-2'>
                    <i style={{color: 'grey'}} className='bi bi-house fs-4 me-3'></i>
                    <button onClick={handleNavigate} className='fs-8' style={{ border: 'none', background: 'transparent',color: 'grey', fontWeight: 'bold', padding: '5px' }}>Movie List</button>
                </a>

                <a className='list-group-item py-2'>
                    <i style={{color: 'grey'}} className='bi bi-table fs-4 me-3'></i>
                    <button onClick={handleNavigate1} className='fs-8' style={{ border: 'none', background: 'transparent',color: 'grey', fontWeight: 'bold', padding: '5px' }}>Add Movie</button>
                </a>
                <a className='list-group-item py-2'>
                    <i style={{color: 'grey'}} className='bi bi-house fs-4 me-3'></i>
                    <button onClick={handleNavigate2} className='fs-8' style={{ border: 'none', background: 'transparent',color: 'grey', fontWeight: 'bold', padding: '5px' }}>Category</button>
                </a>
                <a className='list-group-item py-2'>
                    <i style={{color: 'grey'}} className='bi bi-house fs-4 me-3'></i>
                    <button onClick={handleNavigate3} className='fs-8' style={{ border: 'none', background: 'transparent',color: 'grey', fontWeight: 'bold', padding: '5px' }}>User</button>
                </a>
                <a className='list-group-item py-2'>
                    <i style={{color: 'grey'}} className='bi bi-house fs-4 me-3'></i>
                    <button onClick={handleNavigate4} className='fs-8' style={{ border: 'none', background: 'transparent',color: 'grey', fontWeight: 'bold', padding: '5px' }}>Actors</button>
                </a>
                <a className='list-group-item py-2'>
                    <i style={{color: 'grey'}} className='bi bi-house fs-4 me-3'></i>
                    <span className='fs-9' style={{color: 'grey', fontWeight: 'bold', padding: '5px'}}>Change</span>
                </a>


            </div>
        </div>
    )
}
export default Sidebar;
