import React, { ButtonHTMLAttributes } from 'react';

import './styles.css';

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const PrimaryButton = ({ children, ...props }: PrimaryButtonProps) => {
  return (
    <>
      <button className='primary-button' {...props}>
        {children}
      </button>
    </>
  );
};

export default PrimaryButton;
