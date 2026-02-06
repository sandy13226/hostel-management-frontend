import React, { useState, useEffect } from 'react';
import { roomAPI, hostelAPI } from '../services/api';

function RoomList() {
  const [rooms, setRooms] = useState([]);
  const [hostels, setHostels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);
  const [formData, setFormData] = useState({
    hostel: { id: '' },
    roomNumber: '',
    capacity: 1,
    floor: '',
    roomType: 'Single'
  });

  useEffect(() => {
    fetchRooms();
    fetchHostels();
  }, []);

  const fetchRooms = async () => {
    try {
      const response = await roomAPI.getAll();
      setRooms(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching rooms:', error);
      setLoading(false);
    }
  };

  const fetchHostels = async () => {
    try {
      const response = await hostelAPI.getAll();
      setHostels(response.data);
    } catch (error) {
      console.error('Error fetching hostels:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingRoom) {
        await roomAPI.update(editingRoom.id, formData);
        alert('Room updated successfully!');
      } else {
        await roomAPI.create(formData);
        alert('Room created successfully!');
      }
      resetForm();
      fetchRooms();
    } catch (error) {
      alert('Error: ' + (error.response?.data || error.message));
    }
  };

  const handleEdit = (room) => {
    setEditingRoom(room);
    setFormData({
      hostel: { id: room.hostel.id },
      roomNumber: room.roomNumber,
      capacity: room.capacity,
      floor: room.floor,
      roomType: room.roomType
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this room?')) {
      try {
        await roomAPI.delete(id);
        alert('Room deleted successfully!');
        fetchRooms();
      } catch (error) {
        alert('Error deleting room: ' + error.message);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      hostel: { id: '' },
      roomNumber: '',
      capacity: 1,
      floor: '',
      roomType: 'Single'
    });
    setEditingRoom(null);
    setShowForm(false);
  };

  if (loading) {
    return <div className="loading">Loading rooms...</div>;
  }

  return (
    <div>
      <div className="card">
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem'}}>
          <h2>Rooms</h2>
          <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Cancel' : 'Add New Room'}
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} style={{marginBottom: '2rem'}}>
            <div className="form-group">
              <label>Hostel *</label>
              <select
                required
                value={formData.hostel.id}
                onChange={(e) => setFormData({...formData, hostel: { id: e.target.value }})}
              >
                <option value="">Select Hostel</option>
                {hostels.map((hostel) => (
                  <option key={hostel.id} value={hostel.id}>{hostel.name}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Room Number *</label>
              <input
                type="text"
                required
                value={formData.roomNumber}
                onChange={(e) => setFormData({...formData, roomNumber: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label>Capacity *</label>
              <input
                type="number"
                required
                min="1"
                value={formData.capacity}
                onChange={(e) => setFormData({...formData, capacity: parseInt(e.target.value)})}
              />
            </div>
            <div className="form-group">
              <label>Floor</label>
              <input
                type="text"
                value={formData.floor}
                onChange={(e) => setFormData({...formData, floor: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label>Room Type</label>
              <select
                value={formData.roomType}
                onChange={(e) => setFormData({...formData, roomType: e.target.value})}
              >
                <option value="Single">Single</option>
                <option value="Double">Double</option>
                <option value="Triple">Triple</option>
                <option value="Quad">Quad</option>
              </select>
            </div>
            <button type="submit" className="btn btn-success">
              {editingRoom ? 'Update Room' : 'Create Room'}
            </button>
            <button type="button" className="btn btn-secondary" onClick={resetForm}>
              Cancel
            </button>
          </form>
        )}

        <table className="table">
          <thead>
            <tr>
              <th>Hostel</th>
              <th>Room Number</th>
              <th>Floor</th>
              <th>Type</th>
              <th>Capacity</th>
              <th>Occupied</th>
              <th>Available</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room) => (
              <tr key={room.id}>
                <td>{room.hostel.name}</td>
                <td>{room.roomNumber}</td>
                <td>{room.floor || 'N/A'}</td>
                <td>{room.roomType}</td>
                <td>{room.capacity}</td>
                <td>{room.occupiedBeds}</td>
                <td>{room.availableBeds}</td>
                <td>
                  <span style={{
                    padding: '0.25rem 0.5rem',
                    borderRadius: '4px',
                    backgroundColor: room.availableBeds > 0 ? '#d4edda' : '#f8d7da',
                    color: room.availableBeds > 0 ? '#155724' : '#721c24'
                  }}>
                    {room.availableBeds > 0 ? 'Available' : 'Full'}
                  </span>
                </td>
                <td>
                  <button className="btn btn-primary" onClick={() => handleEdit(room)}>Edit</button>
                  <button className="btn btn-danger" onClick={() => handleDelete(room.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RoomList;
