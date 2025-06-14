import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  // State management
  const [wasteRecords, setWasteRecords] = useState([]);
  const [collectionSchedules, setCollectionSchedules] = useState([]);
  const [activeTab, setActiveTab] = useState('records');
  const [stats, setStats] = useState(null);
  
  // Form states
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    type: 'recyclable',
    amount: '',
    location: '',
    notes: ''
  });
  
  const [scheduleForm, setScheduleForm] = useState({
    scheduleDate: new Date().toISOString().split('T')[0],
    scheduleType: 'recyclable',
    frequency: 'weekly',
    assignedTo: '',
    location: ''
  });

  // Load data from localStorage
  useEffect(() => {
    const savedRecords = localStorage.getItem('wasteRecords');
    const savedSchedules = localStorage.getItem('collectionSchedules');
    
    if (savedRecords) setWasteRecords(JSON.parse(savedRecords));
    if (savedSchedules) setCollectionSchedules(JSON.parse(savedSchedules));
  }, []);

  // Save data and calculate statistics
  useEffect(() => {
    calculateStatistics();
    localStorage.setItem('wasteRecords', JSON.stringify(wasteRecords));
    localStorage.setItem('collectionSchedules', JSON.stringify(collectionSchedules));
  }, [wasteRecords, collectionSchedules]);

  const calculateStatistics = () => {
    const typeCounts = {};
    let totalAmount = 0;
    const locations = new Set();
    const now = new Date();

    // Process records
    wasteRecords.forEach(record => {
      typeCounts[record.type] = (typeCounts[record.type] || 0) + 1;
      totalAmount += parseFloat(record.amount) || 0;
      locations.add(record.location);
    });

    // Process schedules
    const upcoming = collectionSchedules.filter(s => new Date(s.scheduleDate) >= now).length;
    const pending = collectionSchedules.filter(s => s.status === 'pending').length;

    setStats({
      totalRecords: wasteRecords.length,
      typeDistribution: typeCounts,
      totalAmount: totalAmount.toFixed(2),
      uniqueLocations: locations.size,
      totalSchedules: collectionSchedules.length,
      upcomingCollections: upcoming,
      pendingCollections: pending
    });
  };

  // Record handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.amount || !formData.location) return;

    const newRecord = {
      ...formData,
      id: Date.now(),
      amount: parseFloat(formData.amount).toFixed(2)
    };

    setWasteRecords(prev => [...prev, newRecord]);
    setFormData({
      date: new Date().toISOString().split('T')[0],
      type: 'recyclable',
      amount: '',
      location: '',
      notes: ''
    });
  };

  const deleteRecord = (id) => {
    setWasteRecords(prev => prev.filter(record => record.id !== id));
  };

  // Schedule handlers
  const handleScheduleInputChange = (e) => {
    const { name, value } = e.target;
    setScheduleForm(prev => ({ ...prev, [name]: value }));
  };

  const handleScheduleSubmit = (e) => {
    e.preventDefault();
    if (!scheduleForm.location || !scheduleForm.assignedTo) return;

    const newSchedule = {
      ...scheduleForm,
      id: Date.now(),
      status: 'pending'
    };

    setCollectionSchedules(prev => [...prev, newSchedule]);
    setScheduleForm({
      scheduleDate: new Date().toISOString().split('T')[0],
      scheduleType: 'recyclable',
      frequency: 'weekly',
      assignedTo: '',
      location: ''
    });
  };

  const deleteSchedule = (id) => {
    setCollectionSchedules(prev => prev.filter(schedule => schedule.id !== id));
  };

  const markScheduleComplete = (id) => {
    setCollectionSchedules(prev =>
      prev.map(schedule => 
        schedule.id === id ? { ...schedule, status: 'completed' } : schedule
      )
    );
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Waste Management System</h1>
        <div className="tabs">
          <button
            className={`tab-btn ${activeTab === 'records' ? 'active' : ''}`}
            onClick={() => setActiveTab('records')}
          >
            Waste Records
          </button>
          <button
            className={`tab-btn ${activeTab === 'schedules' ? 'active' : ''}`}
            onClick={() => setActiveTab('schedules')}
          >
            Collection Schedules
          </button>
        </div>
      </header>

      <div className="container">
        {activeTab === 'records' ? (
          <>
            <div className="form-section">
              <h2>Add Waste Record</h2>
              <form onSubmit={handleSubmit} className="waste-form">
                <div className="form-group">
                  <label>Date:</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Waste Type:</label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="recyclable">Recyclable</option>
                    <option value="organic">Organic</option>
                    <option value="hazardous">Hazardous</option>
                    <option value="electronic">Electronic</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Amount (kg):</label>
                  <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleInputChange}
                    step="0.01"
                    min="0"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Location:</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Notes:</label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    rows="3"
                  />
                </div>

                <button type="submit" className="submit-btn">Add Record</button>
              </form>
            </div>

            <div className="stats-section">
              <h2>Waste Statistics</h2>
              {stats ? (
                <div className="stats-card">
                  <div className="stat-item">
                    <span className="stat-label">Total Records:</span>
                    <span className="stat-value">{stats.totalRecords}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Total Waste:</span>
                    <span className="stat-value">{stats.totalAmount} kg</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Locations:</span>
                    <span className="stat-value">{stats.uniqueLocations}</span>
                  </div>
                  <div className="type-distribution">
                    <h3>Type Distribution</h3>
                    {Object.entries(stats.typeDistribution).map(([type, count]) => (
                      <div key={type} className="type-item">
                        <span className="type-label">{type}:</span>
                        <span className="type-value">{count} ({Math.round((count / stats.totalRecords) * 100)}%)</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <p>No records available. Add some waste data to see statistics.</p>
              )}
            </div>

            <div className="records-section">
              <h2>Waste Records</h2>
              {wasteRecords.length > 0 ? (
                <div className="records-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Type</th>
                        <th>Amount (kg)</th>
                        <th>Location</th>
                        <th>Notes</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {wasteRecords.map(record => (
                        <tr key={record.id}>
                          <td>{record.date}</td>
                          <td className={`type-${record.type}`}>{record.type}</td>
                          <td>{record.amount}</td>
                          <td>{record.location}</td>
                          <td>{record.notes || '-'}</td>
                          <td>
                            <button 
                              onClick={() => deleteRecord(record.id)}
                              className="delete-btn"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p>No waste records found. Add a new record to get started.</p>
              )}
            </div>
          </>
        ) : (
          <>
            <div className="form-section">
              <h2>Create Collection Schedule</h2>
              <form onSubmit={handleScheduleSubmit} className="schedule-form">
                <div className="form-group">
                  <label>Collection Date:</label>
                  <input
                    type="date"
                    name="scheduleDate"
                    value={scheduleForm.scheduleDate}
                    onChange={handleScheduleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Waste Type:</label>
                  <select
                    name="scheduleType"
                    value={scheduleForm.scheduleType}
                    onChange={handleScheduleInputChange}
                    required
                  >
                    <option value="recyclable">Recyclable</option>
                    <option value="organic">Organic</option>
                    <option value="hazardous">Hazardous</option>
                    <option value="electronic">Electronic</option>
                    <option value="mixed">Mixed</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Frequency:</label>
                  <select
                    name="frequency"
                    value={scheduleForm.frequency}
                    onChange={handleScheduleInputChange}
                    required
                  >
                    <option value="one-time">One-time</option>
                    <option value="weekly">Weekly</option>
                    <option value="bi-weekly">Bi-weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Assigned To:</label>
                  <input
                    type="text"
                    name="assignedTo"
                    value={scheduleForm.assignedTo}
                    onChange={handleScheduleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Location:</label>
                  <input
                    type="text"
                    name="location"
                    value={scheduleForm.location}
                    onChange={handleScheduleInputChange}
                    required
                  />
                </div>

                <button type="submit" className="submit-btn">Create Schedule</button>
              </form>
            </div>

            <div className="stats-section">
              <h2>Schedule Overview</h2>
              {stats && stats.totalSchedules > 0 ? (
                <div className="stats-card">
                  <div className="stat-item">
                    <span className="stat-label">Total Schedules:</span>
                    <span className="stat-value">{stats.totalSchedules}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Pending:</span>
                    <span className="stat-value">{stats.pendingCollections}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Upcoming:</span>
                    <span className="stat-value">{stats.upcomingCollections}</span>
                  </div>
                </div>
              ) : (
                <p>No collection schedules found. Create a new schedule to get started.</p>
              )}
            </div>

            <div className="records-section">
              <h2>Collection Schedules</h2>
              {collectionSchedules.length > 0 ? (
                <div className="records-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Type</th>
                        <th>Frequency</th>
                        <th>Location</th>
                        <th>Assigned To</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {collectionSchedules
                        .sort((a, b) => new Date(a.scheduleDate) - new Date(b.scheduleDate))
                        .map(schedule => (
                          <tr 
                            key={schedule.id}
                            className={
                              new Date(schedule.scheduleDate) < new Date() && 
                              schedule.status === 'pending' ? 'overdue' : ''
                            }
                          >
                            <td>{schedule.scheduleDate}</td>
                            <td className={`type-${schedule.scheduleType}`}>
                              {schedule.scheduleType}
                            </td>
                            <td>{schedule.frequency}</td>
                            <td>{schedule.location}</td>
                            <td>{schedule.assignedTo}</td>
                            <td className={`status-${schedule.status}`}>
                              {schedule.status}
                            </td>
                            <td className="actions">
                              {schedule.status === 'pending' && (
                                <button
                                  onClick={() => markScheduleComplete(schedule.id)}
                                  className="complete-btn"
                                >
                                  Complete
                                </button>
                              )}
                              <button
                                onClick={() => deleteSchedule(schedule.id)}
                                className="delete-btn"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p>No collection schedules found. Create a new schedule to get started.</p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;