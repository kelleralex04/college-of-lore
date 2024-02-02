import './Header.css'

export default function NavBar({ user, campaign, setCategory, setCurrentMain }) {

    function openCampaign() {
        setCategory({})
        setCurrentMain('CampaignDetail')
    }

    return (
        <div className='header'>
            <div className='leftDiv'>
                <img src="https://i.imgur.com/fnUXPMw.png" alt='' />
                <p>College of Lore</p>
            </div>
            <p className='link' style={{'margin-right': '5%'}} onClick={() => openCampaign()}>{campaign.name}</p>
            <p>{user.name}</p>
        </div>
    )
}