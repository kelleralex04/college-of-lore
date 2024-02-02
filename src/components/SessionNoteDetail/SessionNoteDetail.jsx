export default function SessionNoteDetail({sessionNote}) {

    return(
        <>
            <h1>{sessionNote.title}</h1>
            <p>{sessionNote.content}</p>
        </>
    )
}