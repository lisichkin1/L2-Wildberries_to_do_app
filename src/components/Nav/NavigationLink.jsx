// Например, в компоненте NavigationLink.js
import React, { useContext } from 'react';
import { RouterContext } from '../../Router';

const NavigationLink = ({ to, children, styles }) => {
  const { navigate } = useContext(RouterContext);

  const handleClick = (event) => {
    event.preventDefault();
    navigate(to);
  };

  return (
    <a href={to} onClick={handleClick} className={styles}>
      {children}
    </a>
  );
};

export default NavigationLink;
