import React from 'react';
import '../global.css';

const Message = ({ text, animate, children }) => (
  <div className="message">
    <h3 className={animate || ''}>{text}</h3>
    {children}
  </div>
);

export default Message;
