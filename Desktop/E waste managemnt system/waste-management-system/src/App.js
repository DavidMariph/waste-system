import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [wasteRecords, setWasteRecords] = useState([]);
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    type: 'recyclable',
    amount: '',
    location: '',
    notes: ''
  });
  const [stats, setStats] = useState(null);

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedRecords = localStorage.getItem('wasteRecords');
    if (savedRecords) {
      setWasteRecords(JSON.parse(savedRecords));
    }
  }, []);

  // Calculate statistics whenever records change
  useEffect(() => {
    calculateStatistics();
    localStorage.setItem('wasteRecords', JSON.stringify(wasteRecords));
  }, [wasteRecords]);

  const calculateStatistics = () => {
    if (wasteRecords.length === 0) {
      setStats(null);
      return;
    }

    const typeCounts = {};
    let totalAmount = 0;
    const locations = new Set();

    wasteRecords.forEach(record => {
      typeCounts[record.type] = (typeCounts[record.type] || 0) + 1;
      totalAmount += parseFloat(record.amount) || 0;
      locations.add(record.location);
    });

    setStats({
      totalRecords: wasteRecords.length,
      typeDistribution: typeCounts,
      totalAmount: totalAmount.toFixed(2),
      uniqueLocations: locations.size
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.amount || !formData.location) return;

    const newRecord = {
      ...formData,
      id: Date.now(),
      amount: parseFloat(formData.amount).toFixed(2)
    };

    setWasteRecords([...wasteRecords, newRecord]);
    setFormData({
      date: new Date().toISOString().split('T')[0],
      type: 'recyclable',
      amount: '',
      location: '',
      notes: ''
    });
  };

  const deleteRecord = (id) => {
    setWasteRecords(wasteRecords.filter(record => record.id !== id));
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Waste Management System</h1>
      </header>

      <div className="container">
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
      </div>
    </div>
  );
}

export default App;