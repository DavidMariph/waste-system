import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import './WasteForm.css'; // Create this CSS file

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

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    setSuccess(false);

    try {
      // Format the date to ISO string before sending
      const payload = {
        ...formData,
        date: formData.date.toISOString()
      };

      const response = await axios.post('http://localhost:5000/api/records', payload);
      
      setSuccess(true);
      console.log('Record saved:', response.data);
      
      // Reset form after successful submission
      setFormData({
        date: new Date(),
        collectionPoint: {
          name: '',
          location: { coordinates: [0, 0] }
        },
        wasteType: 'organic',
        weight: '',
        notes: ''
      });
      
    } catch (err) {
      console.error('Error saving record:', err);
      setError(err.response?.data?.error || 'Failed to save record');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLocationChange = (e) => {
    const { value } = e.target;
    setFormData(prev => ({
      ...prev,
      collectionPoint: {
        ...prev.collectionPoint,
        name: value
      }
    }));
  };

  return (
    <div className="waste-form-container">
      <h2>Daily Waste Collection</h2>
      
      {success && (
        <div className="alert alert-success">
          Record saved successfully!
        </div>
      )}
      
      {error && (
        <div className="alert alert-error">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Date</label>
          <DatePicker
            selected={formData.date}
            onChange={(date) => setFormData({ ...formData, date })}
            dateFormat="yyyy-MM-dd"
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>Location Name</label>
          <input
            type="text"
            value={formData.collectionPoint.name}
            onChange={handleLocationChange}
            required
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>Waste Type</label>
          <select
            name="wasteType"
            value={formData.wasteType}
            onChange={handleChange}
            required
            className="form-control"
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
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>Notes</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows="3"
            className="form-control"
          />
        </div>

        <button 
          type="submit" 
          className="submit-btn"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Saving...' : 'Save Record'}
        </button>
      </form>
    </div>
  );
};

export default WasteForm;