import React, { useState } from 'react';
import './App.css';
import emailjs from 'emailjs-com';

// Initialize EmailJS
emailjs.init('95k_Fj2kWAzLVmsKe');

function App() {
  const [answer, setAnswer] = useState(null);
  const [dateDetails, setDateDetails] = useState({
    date: '',
    time: '',
    location: '',
    pickup: 'yes'
  });
  const [shake, setShake] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDateDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleNoClick = () => {
    setShake(true);
    setTimeout(() => {
      setAnswer(false);
      setShake(false);
    }, 1000);
  };

  const handleYesClick = () => setAnswer(true);
  const handleChangeMind = () => setAnswer(null);
  const resetForm = () => {
    setAnswer(null);
    setIsConfirmed(false);
    setDateDetails({
      date: '',
      time: '',
      location: '',
      pickup: 'yes'
    });
  };

  const sendEmail = () => {
    const templateParams = {
      to_name: 'You',
      from_name: 'Ronette',
      date: dateDetails.date,
      time: dateDetails.time,
      location: dateDetails.location,
      pickup: dateDetails.pickup === 'yes' ? 'Yes, pick me up' : 'No, meet there',
      answer: answer ? 'YES' : 'NO (but forced to say yes)'
    };

    emailjs.send('service_vn64t3o', 'template_4xf8449', templateParams)
      .then(() => console.log('Email sent!'))
      .catch(err => console.error('Email error:', err));
  };

  const handleSubmit = () => {
    setShowConfetti(true);
    setIsConfirmed(true);
    sendEmail();
  };

  // Generate time options
  const timeOptions = [];
  for (let hour = 10; hour <= 22; hour++) {
    timeOptions.push(`${hour}:00`);
    if (hour !== 22) timeOptions.push(`${hour}:30`);
  }

  if (isConfirmed) {
    return (
      <div className="container celebration">
        <div className="confetti"></div>
        <h1>Date Confirmed! 💖</h1>
        <div className="confirmation-details">
          <p><span>📅 Date:</span> {dateDetails.date}</p>
          <p><span>🕒 Time:</span> {dateDetails.time}</p>
          <p><span>📍 Location:</span> {dateDetails.location}</p>
          <p><span>🚗 Pickup:</span> {dateDetails.pickup === 'yes' ? 'Yes! I\'ll pick you up!' : 'We\'ll meet there'}</p>
        </div>
        <button className="done-btn" onClick={resetForm}>
          Done
        </button>
      </div>
    );
  }

  if (answer === null) {
    return (
      <div className="container">
        <h1>Hi Ronette, can we go out on our rest day? 💐</h1>
        <p>(Seriously though, click the right button...)</p>
        <div className="buttons">
          <button className="yes-btn" onClick={handleYesClick}>YES</button>
          <button className={`no-btn ${shake ? 'shake' : ''}`} onClick={handleNoClick}>
            NO
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container fade-in">
      {answer ? (
        <>
          <h1>Awesome! Let's plan our date! 💖</h1>
          <button className="change-mind-btn" onClick={handleChangeMind}>
            Change my mind
          </button>
        </>
      ) : (
        <>
          <h1 className="tagalog">Hindi pwede, kailangan mag-date tayo kase pala desisyon ako sa buhay</h1>
          <p className="subtext">(The "No" button was just for decoration)</p>
        </>
      )}

      <form className="date-form">
        <div className="form-group">
          <label>Date:</label>
          <input 
            type="date" 
            name="date" 
            value={dateDetails.date}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Time:</label>
          <select 
            name="time" 
            value={dateDetails.time}
            onChange={handleInputChange}
            required
          >
            <option value="">-- Select Time --</option>
            {timeOptions.map((time, index) => (
              <option key={index} value={time}>{time}</option>
            ))}
          </select>
        </div>
        
        <div className="form-group">
          <label>Location:</label>
          <select 
            name="location" 
            value={dateDetails.location}
            onChange={handleInputChange}
            required
          >
            <option value="">-- Select Location --</option>
            <option value="MOA">MOA (Ice Skating/Archery)</option>
            <option value="Festival Mall">Festival Mall (Wii Jump/Bowling)</option>
            <option value="SM South Mall">SM South Mall (Malapit lang eh HAHA)</option>
          </select>
        </div>

        <div className="form-group radio-group">
          <label>Should I pick you up?</label>
          <div className="radio-options">
            <label>
              <input
                type="radio"
                name="pickup"
                value="yes"
                checked={dateDetails.pickup === 'yes'}
                onChange={handleInputChange}
              />
              Yes! I'll pick you up
            </label>
            <label>
              <input
                type="radio"
                name="pickup"
                value="no"
                checked={dateDetails.pickup === 'no'}
                onChange={handleInputChange}
              />
              No, let's meet there
            </label>
          </div>
        </div>
        
        <button 
          type="button" 
          className="submit-btn heartbeat"
          onClick={handleSubmit}
        >
          {answer ? 'CONFIRM OUR DATE!' : 'I TOLD YOU WE\'RE GOING!'}
        </button>
      </form>
      
      {showConfetti && <div className="confetti"></div>}
    </div>
  );
}

export default App;