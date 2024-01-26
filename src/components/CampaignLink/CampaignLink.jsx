import { Link } from "react-router-dom"

export default function CampaignDetails({campaign}) {
    return (
        <li>
            <Link to={`/${campaign}`}>{campaign}</Link>
        </li>
    )
}