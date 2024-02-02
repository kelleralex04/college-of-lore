import { Link } from "react-router-dom"

export default function CampaignLink({campaign}) {
    return (
        <li>
            <Link to={`/campaign/${campaign._id}`}>{campaign.name}</Link>
        </li>
    )
}