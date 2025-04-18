import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Auth from './components/Auth';
import TaskManager from './components/TaskManager';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/dashboard" element={<TaskManager />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
