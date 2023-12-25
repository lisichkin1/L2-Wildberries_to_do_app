import React from 'react';
import { Router, Route } from './Router';
import Home from './pages/Home';
import About from './pages/Today';
import Categories from './pages/Categories';
import Complited from './pages/Complited';
const App = () => {
  return (
    <Router>
      <Route path="/" component={Home} />
      <Route path="/today" component={About} />
      <Route path="/categories" component={Categories} />
      <Route path="/complited" component={Complited} />
    </Router>
  );
};
export default App;
