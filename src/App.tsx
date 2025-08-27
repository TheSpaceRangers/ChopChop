import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';

import MobileLayout from '@/components/layout/MobileLayout';
import HomePage from '@/components/pages/HomePage';
import ListsPage from '@/components/pages/ListsPage';
import ProfilePage from '@/components/pages/ProfilePage';

const App = (): React.ReactElement => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MobileLayout />}>
          <Route index element={<HomePage />} />
          <Route path="lists" element={<ListsPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
