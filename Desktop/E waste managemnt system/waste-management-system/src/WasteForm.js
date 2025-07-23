import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const WasteForm = () => {
  const [formData, setFormData] = useState({
    date: new Date(),
    collectionPoint: {
      name: '',
      location: { coordinates: [0, 0] }
    },
    wasteType: 'organic',
    weight: '',
    notes: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/records', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      alert('Record saved successfully!');
      console.log(data);
    } catch (err) {
      console.error('Error:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="waste-form">
      <h2>Daily Waste Collection</h2>
      
      <div className="form-group">
        <label>Date</label>
        <DatePicker
          selected={formData.date}
          onChange={(date) => setFormData({ ...formData, date })}
          dateFormat="yyyy-MM-dd"
        />
      </div>

      <div className="form-group">
        <label>Location Name</label>
        <input
          type="text"
          name="collectionPoint.name"
          value={formData.collectionPoint.name}
          onChange={(e) => setFormData({
            ...formData,
            collectionPoint: {
              ...formData.collectionPoint,
              name: e.target.value
            }
          })}
          required
        />
      </div>

      <div className="form-group">
        <label>Waste Type</label>
        <select
          name="wasteType"
          value={formData.wasteType}
          onChange={handleChange}
          required
        >
          <option value="organic">Organic</option>
          <option value="recyclable">Recyclable</option>
          <option value="hazardous">Hazardous</option>
          <option value="electronic">Electronic</option>
        </select>
      </div>

      <div className="form-group">
        <label>Weight (kg)</label>
        <input
          type="number"
          name="weight"
          value={formData.weight}
          onChange={handleChange}
          step="0.1"
          min="0"
          required
        />
      </div>

      <button type="submit" className="submit-btn">
        Save Record
      </button>
    </form>
  );
};

export default WasteForm;