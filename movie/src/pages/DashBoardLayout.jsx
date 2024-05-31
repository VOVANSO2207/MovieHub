// src/pages/DashboardLayout.js
import React from 'react';
import Sidebar from './Sidebar';

const DashBoardLayout = ({ children, toggle, Toggle }) => (
  <div className='container-fluid bg-dark min-vh-100' style={{ background: '#161313' }}>
    <div className='row'>
      
      {toggle && (
        <div className='col-4 col-md-2 vh-100 position-fixed' style={{ background: '#1F1B1B' }}>
          <Sidebar />
        </div>
      )}
      {toggle && <div className='col-4 col-md-2'></div>}
      <div className='col'>
        {children}
      </div>
    </div>
  </div>
);

export default DashBoardLayout;
