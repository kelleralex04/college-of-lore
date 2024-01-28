import { useState } from 'react';
import './App.css';
import AuthPage from '../AuthPage/AuthPage';
import NavBar from '../../components/NavBar/NavBar';
import CampaignIndex from '../CampaignIndex/CampaignIndex';
import CampaignHome from '../CampaignHome/CampaignHome';
import CategoryHome from '../CategoryHome/CategoryHome';
import Header from '../../components/Header/Header'
import { Routes, Route, Navigate } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';

export default function App() {
  const [user, setUser] = useState(getUser())
  const [campaign, setCampaign] = useState({})
  const [category, setCategory] = useState({})

  return (
    <main className="App">
      { user ?
        <>
          <Header user={user} campaign={campaign} />
          <NavBar user={user} setUser={setUser} curCampaign={campaign} />
          <div className='main-content'>
            <Routes>
              <Route path="/campaigns" element={<CampaignIndex setCampaign={setCampaign} />} />
              <Route path="/:campaignId" element={<CampaignHome campaign={campaign} setCampaign={setCampaign} />} />
              <Route path="/:campaignId/:categoryId" element={<CategoryHome campaign={campaign} category={category} setCategory={setCategory} />} />
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

