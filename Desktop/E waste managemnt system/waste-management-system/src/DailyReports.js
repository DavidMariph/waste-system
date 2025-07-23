import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DailyReport = () => {
  const [date, setDate] = useState(new Date());
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const dateStr = date.toISOString().split('T')[0];
        const response = await fetch(`http://localhost:5000/api/records/daily/${dateStr}`);
        const data = await response.json();
        setRecords(data);
      } catch (err) {
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [date]);

  const totalWeight = records.reduce((sum, record) => sum + record.weight, 0);

  return (
    <div className="report-container">
      <h2>Daily Waste Report</h2>
      <DatePicker
        selected={date}
        onChange={setDate}
        dateFormat="yyyy-MM-dd"
      />

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="summary">
            <h3>Total Collected: {totalWeight.toFixed(2)} kg</h3>
          </div>
          
          <table className="records-table">
            <thead>
              <tr>
                <th>Time</th>
                <th>Location</th>
                <th>Type</th>
                <th>Weight (kg)</th>
              </tr>
            </thead>
            <tbody>
              {records.map(record => (
                <tr key={record._id}>
                  <td>{new Date(record.date).toLocaleTimeString()}</td>
                  <td>{record.collectionPoint.name}</td>
                  <td>{record.wasteType}</td>
                  <td>{record.weight}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default DailyReport;