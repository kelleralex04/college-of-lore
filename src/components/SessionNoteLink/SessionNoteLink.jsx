import { Link } from "react-router-dom"

export default function SessionNoteLink({campaign, note}) {
    return (
        <tr>
            <td>
                <Link to={`/SessionNote/${campaign}/${note.title}`}>{note.title}</Link>
            </td>
            <td>{note.date}</td>
        </tr>
    )
}