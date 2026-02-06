import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Dashboard from './components/Dashboard';
import StudentList from './components/StudentList';
import HostelList from './components/HostelList';
import RoomList from './components/RoomList';
import AllocationList from './components/AllocationList';

function App() {
  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <h1>Hostel Management System</h1>
          <ul className="nav-links">
            <li><Link to="/">Dashboard</Link></li>
            <li><Link to="/students">Students</Link></li>
            <li><Link to="/hostels">Hostels</Link></li>
            <li><Link to="/rooms">Rooms</Link></li>
            <li><Link to="/allocations">Allocations</Link></li>
          </ul>
        </nav>
        
        <div className="container">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/students" element={<StudentList />} />
            <Route path="/hostels" element={<HostelList />} />
            <Route path="/rooms" element={<RoomList />} />
            <Route path="/allocations" element={<AllocationList />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
