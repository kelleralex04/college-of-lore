import { Link } from "react-router-dom"
import './CampaignLink.css'

export default function CampaignLink({campaign}) {
    return (
        <li className="campaign-link">
            <Link to={`/campaign/${campaign._id}`}>{campaign.name}</Link>
        </li>
    )
}