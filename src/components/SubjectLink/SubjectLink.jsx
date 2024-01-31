import { Link } from "react-router-dom"

export default function SubjectLink({subject, curCampaign, curCategory}) {
    return (
        <li>
            <Link to={`/${curCampaign}/${curCategory}/${subject.name}`}>{subject.name}</Link>
        </li>
    )
}