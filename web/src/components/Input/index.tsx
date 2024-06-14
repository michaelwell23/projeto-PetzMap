import React from 'react';

import './styles.css';

interface InputProps {
  id: string;
  label: string;
  value: string;
  htmlForm?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  value,
  htmlForm,
  onChange,
}) => {
  return (
    <div className='input-block'>
      <label htmlFor={id}>{label}</label>
      <input id={id} value={value} form={htmlForm} onChange={onChange} />
    </div>
  );
};

export default Input;
