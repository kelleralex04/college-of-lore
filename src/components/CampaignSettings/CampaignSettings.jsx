import { useState } from "react"
import { useNavigate } from "react-router-dom";
import * as campaignsAPI from '../../utilities/campaigns-api';

export default function CampaignSettings({campaign}) {
    const [showWarning, setShowWarning] = useState(false)
    const navigate = useNavigate();

    async function deleteCampaign() {
        await campaignsAPI.deleteCampaign(campaign._id);
        navigate('/')
    };

    return (
        <div className='campaign-settings'>
            <h1>Campaign Settings</h1>
            {showWarning ?
                <div>
                    <p>Are you sure? This will delete your entire campaign including any folders and files contained within it.</p>
                    <button onClick={() => deleteCampaign()}>DELETE</button>
                    <button onClick={() => setShowWarning(false)}>Cancel</button>
                </div>
                :
                <button onClick={() => setShowWarning(true)}>Delete Campaign</button>
            }
        </div>
    )
}