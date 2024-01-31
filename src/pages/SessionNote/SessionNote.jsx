import { useParams } from "react-router-dom"
import { useEffect } from "react";

export default function SessionNote({sessionNote, getCurSessionNote}) {
    let { noteId } = useParams();

    useEffect(function() {
        getCurSessionNote(noteId);
    }, []);

    return(
        <h1>{sessionNote.title}</h1>
    )
}