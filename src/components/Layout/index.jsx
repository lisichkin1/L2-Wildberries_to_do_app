import React from 'react';
import Nav from '../Nav';
import styles from './Layout.module.css';
function Layout({ children }) {
  return (
    <div className={styles.container}>
      <Nav />
      <div className={styles.children}>{children}</div>
    </div>
  );
}

export default Layout;
