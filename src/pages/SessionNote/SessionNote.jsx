import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import './SessionNote.css'

export default function SessionNote({sessionNote, getCurSessionNote}) {
    let { noteId } = useParams();

    useEffect(function() {
        getCurSessionNote(noteId);
    }, []);

    return(
        <div className="session-note">
            <h1>{sessionNote.title} &nbsp; - &nbsp; {sessionNote.date}</h1>
            <p>{sessionNote.content}</p>
        </div>
    )
}