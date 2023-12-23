import React, { useState } from 'react';
import Nav from '../Nav';
import styles from './Layout.module.css';
function Layout({ children }) {
  const [displayMenuMobile, setDisplayMenuMobile] = useState(true);

  return (
    <div className={styles.container}>
      <Nav displayMenuMobile={displayMenuMobile} setDisplayMenuMobile={setDisplayMenuMobile} />
      <div className={styles.children}>{children}</div>
    </div>
  );
}

export default Layout;
