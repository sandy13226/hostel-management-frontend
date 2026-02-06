import React, { useState, useEffect } from 'react';
import { hostelAPI } from '../services/api';

function HostelList() {
  const [hostels, setHostels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingHostel, setEditingHostel] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    type: 'Boys',
    totalRooms: 0,
    totalCapacity: 0,
    warden: '',
    address: '',
    facilities: ''
  });

  useEffect(() => {
    fetchHostels();
  }, []);

  const fetchHostels = async () => {
    try {
      const response = await hostelAPI.getAll();
      setHostels(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching hostels:', error);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingHostel) {
        await hostelAPI.update(editingHostel.id, formData);
        alert('Hostel updated successfully!');
      } else {
        await hostelAPI.create(formData);
        alert('Hostel created successfully!');
      }
      resetForm();
      fetchHostels();
    } catch (error) {
      alert('Error: ' + (error.response?.data || error.message));
    }
  };

  const handleEdit = (hostel) => {
    setEditingHostel(hostel);
    setFormData(hostel);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this hostel?')) {
      try {
        await hostelAPI.delete(id);
        alert('Hostel deleted successfully!');
        fetchHostels();
      } catch (error) {
        alert('Error deleting hostel: ' + error.message);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      type: 'Boys',
      totalRooms: 0,
      totalCapacity: 0,
      warden: '',
      address: '',
      facilities: ''
    });
    setEditingHostel(null);
    setShowForm(false);
  };

  if (loading) {
    return <div className="loading">Loading hostels...</div>;
  }

  return (
    <div>
      <div className="card">
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem'}}>
          <h2>Hostels</h2>
          <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Cancel' : 'Add New Hostel'}
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} style={{marginBottom: '2rem'}}>
            <div className="form-group">
              <label>Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label>Type *</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({...formData, type: e.target.value})}
              >
                <option value="Boys">Boys</option>
                <option value="Girls">Girls</option>
              </select>
            </div>
            <div className="form-group">
              <label>Total Rooms *</label>
              <input
                type="number"
                required
                value={formData.totalRooms}
                onChange={(e) => setFormData({...formData, totalRooms: parseInt(e.target.value)})}
              />
            </div>
            <div className="form-group">
              <label>Total Capacity *</label>
              <input
                type="number"
                required
                value={formData.totalCapacity}
                onChange={(e) => setFormData({...formData, totalCapacity: parseInt(e.target.value)})}
              />
            </div>
            <div className="form-group">
              <label>Warden</label>
              <input
                type="text"
                value={formData.warden}
                onChange={(e) => setFormData({...formData, warden: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label>Address</label>
              <textarea
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
                rows="2"
              />
            </div>
            <div className="form-group">
              <label>Facilities</label>
              <textarea
                value={formData.facilities}
                onChange={(e) => setFormData({...formData, facilities: e.target.value})}
                rows="2"
              />
            </div>
            <button type="submit" className="btn btn-success">
              {editingHostel ? 'Update Hostel' : 'Create Hostel'}
            </button>
            <button type="button" className="btn btn-secondary" onClick={resetForm}>
              Cancel
            </button>
          </form>
        )}

        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Total Rooms</th>
              <th>Total Capacity</th>
              <th>Occupied</th>
              <th>Available</th>
              <th>Warden</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {hostels.map((hostel) => (
              <tr key={hostel.id}>
                <td>{hostel.name}</td>
                <td>{hostel.type}</td>
                <td>{hostel.totalRooms}</td>
                <td>{hostel.totalCapacity}</td>
                <td>{hostel.occupiedCapacity}</td>
                <td>{hostel.availableCapacity}</td>
                <td>{hostel.warden || 'N/A'}</td>
                <td>
                  <button className="btn btn-primary" onClick={() => handleEdit(hostel)}>Edit</button>
                  <button className="btn btn-danger" onClick={() => handleDelete(hostel.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default HostelList;
