import React from 'react';

import Sidebar from '../components/Navigations/Sidebar';
import MainPage from './MainPage';
import { Notebooks, QuickNotes, Chapter, Chapters } from './contents';
import Login from './Login';
import Signup from './Signup';
import ForgotPassword from './ForgotPassword';

import { Route, Routes } from 'react-router-dom';


export default function Home() {
  return (
    <div className='flex'>
      <div
      className='max-md:hidden bg-gradient-to-r from-blue-300 to-blue-50'
      ><Sidebar /></div>
      <div className='bg-gradient-to-r from-blue-300 to-blue-50 rounded-l-3xl max-md:rounded-none'>
        <Routes>
          <Route path='/*' element={<MainPage />} />

          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />

          <Route path='/:username/notebooks' element={<Notebooks />} />
          <Route path='/:username/quick-notes' element={<QuickNotes />} />
          <Route path='/:username/chapters/:notebookId' element={<Chapters />} />
          <Route path='/:username/chapter/:notebookId/:chapterId' element={<Chapter />} />
        </Routes>
      </div>
    </div>
  )
}
