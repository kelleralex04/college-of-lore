import { useState } from 'react';
import './App.css';
import AuthPage from '../AuthPage/AuthPage';
import NavBar from '../../components/NavBar/NavBar';
import HomePage from '../CampaignHome/CampaignHome'
import CampaignIndex from '../CampaignIndex/CampaignIndex'
import Header from '../../components/Header/Header'
import { Routes, Route, Navigate } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import * as campaignsAPI from '../../utilities/campaigns-api';

export default function App() {
  const [currentMain, setCurrentMain] = useState('CampaignDetail')
  const [user, setUser] = useState(getUser())
  const [campaign, setCampaign] = useState({})
  const [campaigns, setCampaigns] = useState([])
  const [sessionNote, setSessionNote] = useState({})
  const [category, setCategory] = useState({})
  const [subject, setSubject] = useState({})

  async function getCampaigns() {
    const campaignList = await campaignsAPI.getCampaignList();
    setCampaigns(campaignList)
  }

  return (
    <main className="App">
      { user ?
        <>
          <Header user={user} campaign={campaign} setCategory={setCategory} setCurrentMain={setCurrentMain} />
          <NavBar user={user} setUser={setUser} curCampaign={campaign} curCategory={category} setCurrentMain={setCurrentMain} setCategory={setCategory} setSubject={setSubject} />
          <div className='main-content'>
            <Routes>
              <Route path="/" element={<CampaignIndex setCampaign={setCampaign} campaigns={campaigns} setCampaigns={setCampaigns} getCampaigns={getCampaigns} />} />
              <Route path="/campaign/:campaignId" element={<HomePage campaign={campaign} setCampaign={setCampaign} category={category} setCategory={setCategory} 
                currentMain={currentMain} setCurrentMain={setCurrentMain} sessionNote={sessionNote} setSessionNote={setSessionNote} subject={subject} setSubject={setSubject} />} />
            </Routes>
          </div>
        </>
        :
        <AuthPage setUser={setUser} />
      }
    </main>
  );
}

