import React, { ButtonHTMLAttributes } from 'react';

import './styles';

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const PrimaryButton = ({ children, ...props }: PrimaryButtonProps) => {
  return (
    <>
      <button className='primary-buttom' {...props}>
        {children}
      </button>
    </>
  );
};

export default PrimaryButton;
