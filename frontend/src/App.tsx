import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Auth from './components/Auth';
import TaskManager from './components/TaskManager';
import AuthProvider from './components/AuthProvider';
import ProtectedRoute from './components/ProtectedRoutes';

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/dashboard" element={<ProtectedRoute><TaskManager /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>

  );
};

export default App;
