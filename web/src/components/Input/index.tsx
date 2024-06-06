import React from 'react';

import './styles.css';

interface InputProps {
  id: string;
  label: string;
}

const Input: React.FC<InputProps> = ({ id, label }) => {
  return (
    <div className='input-block'>
      <label htmlFor={id}>{label}</label>
      <input id={id} />
    </div>
  );
};

export default Input;
