import React, { useState, useEffect, createContext, useContext } from 'react';

export const RouterContext = createContext();

export const Router = ({ children }) => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePathChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePathChange);

    return () => {
      window.removeEventListener('popstate', handlePathChange);
    };
  }, []);

  const navigate = (to) => {
    window.history.pushState({}, '', to);
    setCurrentPath(to);
  };

  const contextValue = {
    currentPath,
    navigate,
  };

  return <RouterContext.Provider value={contextValue}>{children}</RouterContext.Provider>;
};

export const Route = ({ path, component: Component }) => {
  const { currentPath } = useContext(RouterContext);

  if (currentPath === path) {
    return <Component />;
  } else {
    return null;
  }
};
