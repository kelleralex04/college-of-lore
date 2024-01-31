import { useState, useEffect } from 'react';
import './App.css';
import AuthPage from '../AuthPage/AuthPage';
import NavBar from '../../components/NavBar/NavBar';
import CampaignIndex from '../CampaignIndex/CampaignIndex';
import CampaignHome from '../CampaignHome/CampaignHome';
import CategoryHome from '../CategoryHome/CategoryHome';
import SubjectHome from '../SubjectHome/SubjectHome';
import Header from '../../components/Header/Header'
import SessionNote from '../SessionNote/SessionNote';
import { Routes, Route, Navigate } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import * as campaignsAPI from '../../utilities/campaigns-api';

export default function App() {

  const [user, setUser] = useState(getUser())
  const [campaign, setCampaign] = useState({})
  const [campaigns, setCampaigns] = useState([])
  const [sessionNote, setSessionNote] = useState({})
  const [category, setCategory] = useState({})
  const [subject, setsubject] = useState({})

  useEffect(function() {
    async function getCampaigns() {
      const campaignList = await campaignsAPI.getCampaignList();
      setCampaigns(campaignList)
    }
    if (user) {
      getCampaigns();
    }
  }, [user]);

  function getCurCampaign(campaignId) {
    const curCampaign = campaigns.find((c) => c.name === campaignId);
    setCampaign(curCampaign)
  }

  function getCurSessionNote(noteId) {
    const curSessionNote = campaign.sessionNote.find((s) => s.title === noteId)
    setSessionNote(curSessionNote)
  }

  return (
    <main className="App">
      { user ?
        <>
          <Header user={user} campaign={campaign} />
          <NavBar user={user} setUser={setUser} curCampaign={campaign} curCategory={category} />
          <div className='main-content'>
            <Routes>
              <Route path="/campaigns" element={<CampaignIndex setCampaign={setCampaign} campaigns={campaigns} setCampaigns={setCampaigns} />} />
              <Route path="/:campaignId" element={<CampaignHome campaign={campaign} setCampaign={setCampaign} campaigns={campaigns} setCampaigns={setCampaigns} getCurCampaign={getCurCampaign} />} />
              <Route path="/SessionNote/:campaignId/:noteId" element={<SessionNote sessionNote={sessionNote} getCurSessionNote={getCurSessionNote} />} />
              <Route path="/:campaignId/:categoryId" element={<CategoryHome campaign={campaign} category={category} setCategory={setCategory} />} />
              <Route path="/:campaignId/:categoryId/:subjectId" element={<SubjectHome campaign={campaign} category={category} />} />
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

