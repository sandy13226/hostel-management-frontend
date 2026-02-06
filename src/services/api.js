import axios from 'axios';

const API_BASE_URL = 'https://hostel-management-backend-rc9d.onrender.com/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Student APIs
export const studentAPI = {
  getAll: () => api.get('/students'),
  getById: (id) => api.get(`/students/${id}`),
  getByRollNumber: (rollNumber) => api.get(`/students/roll/${rollNumber}`),
  create: (data) => api.post('/students', data),
  update: (id, data) => api.put(`/students/${id}`, data),
  delete: (id) => api.delete(`/students/${id}`),
};

// Hostel APIs
export const hostelAPI = {
  getAll: () => api.get('/hostels'),
  getById: (id) => api.get(`/hostels/${id}`),
  getByType: (type) => api.get(`/hostels/type/${type}`),
  create: (data) => api.post('/hostels', data),
  update: (id, data) => api.put(`/hostels/${id}`, data),
  delete: (id) => api.delete(`/hostels/${id}`),
};

// Room APIs
export const roomAPI = {
  getAll: () => api.get('/rooms'),
  getById: (id) => api.get(`/rooms/${id}`),
  getByHostelId: (hostelId) => api.get(`/rooms/hostel/${hostelId}`),
  getAvailableByHostelId: (hostelId) => api.get(`/rooms/hostel/${hostelId}/available`),
  create: (data) => api.post('/rooms', data),
  update: (id, data) => api.put(`/rooms/${id}`, data),
  delete: (id) => api.delete(`/rooms/${id}`),
};

// Allocation APIs
export const allocationAPI = {
  getAll: () => api.get('/allocations'),
  getById: (id) => api.get(`/allocations/${id}`),
  getByStudentId: (studentId) => api.get(`/allocations/student/${studentId}`),
  getByRoomId: (roomId) => api.get(`/allocations/room/${roomId}`),
  getActive: () => api.get('/allocations/active'),
  allocate: (studentId, roomId) => api.post('/allocations/allocate', { studentId, roomId }),
  checkIn: (id, checkInDate) => api.put(`/allocations/${id}/checkin`, { checkInDate }),
  checkOut: (id, checkOutDate) => api.put(`/allocations/${id}/checkout`, { checkOutDate }),
  delete: (id) => api.delete(`/allocations/${id}`),
};

export default api;
