import { Link } from "react-router-dom"

export default function SessionNoteLink({campaign, note}) {
    return (
        <li>
            <Link to={`/SessionNote/${campaign}/${note.title}`}>{note.title}</Link>
        </li>
    )
}