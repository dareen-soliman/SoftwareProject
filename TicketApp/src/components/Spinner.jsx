import React from 'react';
import './Spinner.css';

const Spinner = ({ size = 'medium', fullScreen = false }) => {
  const spinnerClasses = `spinner ${size} ${fullScreen ? 'fullscreen' : ''}`;
  
  return (
    <div className={spinnerClasses}>
      <div className="spinner-inner"></div>
    </div>
  );
};

export default Spinner; 