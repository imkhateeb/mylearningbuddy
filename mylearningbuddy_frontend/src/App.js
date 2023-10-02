import { Routes, Route } from 'react-router-dom';
import './App.css';
import './index.css';

import Home from './container/Home';

function App() {
  return (
    <Routes>
      <Route path="/*" element={<Home />} />
    </Routes>
  );
}

export default App;
