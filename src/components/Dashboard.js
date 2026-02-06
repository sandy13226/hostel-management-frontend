import React, { useState, useEffect } from 'react';
import { studentAPI, hostelAPI, allocationAPI } from '../services/api';

function Dashboard() {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalHostels: 0,
    totalAllocations: 0,
    activeAllocations: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [students, hostels, allocations, active] = await Promise.all([
        studentAPI.getAll(),
        hostelAPI.getAll(),
        allocationAPI.getAll(),
        allocationAPI.getActive()
      ]);

      setStats({
        totalStudents: students.data.length,
        totalHostels: hostels.data.length,
        totalAllocations: allocations.data.length,
        activeAllocations: active.data.length
      });
      setLoading(false);
    } catch (error) {
      console.error('Error fetching stats:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading dashboard...</div>;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <div className="dashboard-grid">
        <div className="stat-card" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>
          <h3>{stats.totalStudents}</h3>
          <p>Total Students</p>
        </div>
        <div className="stat-card" style={{background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'}}>
          <h3>{stats.totalHostels}</h3>
          <p>Total Hostels</p>
        </div>
        <div className="stat-card" style={{background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'}}>
          <h3>{stats.activeAllocations}</h3>
          <p>Active Allocations</p>
        </div>
        <div className="stat-card" style={{background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'}}>
          <h3>{stats.totalAllocations}</h3>
          <p>Total Allocations</p>
        </div>
      </div>
      
      <div className="card">
        <h2>Welcome to Hostel Management System</h2>
        <p>Manage students, hostels, rooms, and allocations efficiently.</p>
        <p>Use the navigation menu above to access different sections.</p>
      </div>
    </div>
  );
}

export default Dashboard;
