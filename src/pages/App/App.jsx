import { useState } from 'react';
import './App.css';
import AuthPage from '../AuthPage/AuthPage';
import NavBar from '../../components/NavBar/NavBar';
import CampaignIndex from '../CampaignIndex/CampaignIndex';
import CampaignHome from '../CampaignHome/CampaignHome';
import Header from '../../components/Header/Header'
import { Routes, Route, Navigate } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';

export default function App() {
  const [user, setUser] = useState(getUser())

  return (
    <main className="App">
      { user ?
        <>
          <Header user={user} />
          <NavBar user={user} setUser={setUser} />
          <div className='main-content'>
            <Routes>
              <Route path="/campaigns" element={<CampaignIndex />} />
              <Route path="/:id" element={<CampaignHome />} />
              <Route path="/*" element={<Navigate to="/campaigns" />} />
            </Routes>
          </div>
        </>
        :
        <AuthPage setUser={setUser} />
      }
    </main>
  );
}

