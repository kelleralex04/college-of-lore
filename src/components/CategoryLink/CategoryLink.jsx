import { Link } from "react-router-dom"

export default function CampaignDetails({category, curCampaign}) {
    return (
        <li>
            <Link to={`/${curCampaign}/${category.name}`}>{category.name}</Link>
        </li>
    )
}