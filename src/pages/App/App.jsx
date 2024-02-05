import { useState } from 'react';
import './App.css';
import AuthPage from '../AuthPage/AuthPage';
import NavBar from '../../components/NavBar/NavBar';
import HomePage from '../CampaignHome/CampaignHome'
import CampaignIndex from '../CampaignIndex/CampaignIndex'
import Header from '../../components/Header/Header'
import S3upload from '../S3upload/S3upload'
import { Routes, Route } from 'react-router-dom';
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
  const [showSettings, setShowSettings] = useState(false)
  const [showCategoryDescriptionInput, setShowCategoryDescriptionInput] = useState(false)

  async function getCampaigns() {
    const campaignList = await campaignsAPI.getCampaignList();
    setCampaigns(campaignList)
  }

  return (
    <main className="App">
      { user ?
        <>
          <Header user={user} campaign={campaign} setCategory={setCategory} setCurrentMain={setCurrentMain} />
          <NavBar user={user} setUser={setUser} curCampaign={campaign} curCategory={category} setCurCategory={setCategory} setCurrentMain={setCurrentMain} setCategory={setCategory} 
          setSubject={setSubject} showSettings={showSettings} showCategoryDescriptionInput={showCategoryDescriptionInput} setShowCategoryDescriptionInput={setShowCategoryDescriptionInput} />
          <div className='main-content'>
            <Routes>
              <Route path="/" element={<CampaignIndex setCampaign={setCampaign} campaigns={campaigns} setCampaigns={setCampaigns} getCampaigns={getCampaigns} setCurrentMain={setCurrentMain}
              setShowSettings={setShowSettings} />} />
              <Route path="/campaign/:campaignId" element={<HomePage campaign={campaign} setCampaign={setCampaign} category={category} setCategory={setCategory} currentMain={currentMain} 
              setCurrentMain={setCurrentMain} sessionNote={sessionNote} setSessionNote={setSessionNote} subject={subject} setSubject={setSubject} setShowSettings={setShowSettings}
              showCategoryDescriptionInput={showCategoryDescriptionInput} setShowCategoryDescriptionInput={setShowCategoryDescriptionInput} />} />
              <Route path="/s3upload" element={<S3upload />} />
            </Routes>
          </div>
        </>
        :
        <AuthPage setUser={setUser} />
      }
    </main>
  );
}

