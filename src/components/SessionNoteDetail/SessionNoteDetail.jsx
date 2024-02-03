import './SessionNoteDetail.css'

export default function SessionNoteDetail({sessionNote, campaignNote, setCampaignNote, campaignNoteTitle, setCampaignNoteTitle, campaignNoteDate, setCampaignNoteDate, editCampaignNote}) {

    return(
        <>
            <div className="session-note">
                <h1>{sessionNote.title} &nbsp; - &nbsp; {sessionNote.date}</h1>
                <p>{sessionNote.content}</p>
            </div>
            <form autoComplete="off" onSubmit={editCampaignNote} className="session-note-form">
                <div className="label-input">
                    <label style={{color: 'black'}}>Edit Session Note:</label>
                    <input type="text" name='title' onChange={(evt) => setCampaignNoteTitle(evt.target.value)} value={campaignNoteTitle} placeholder="Title" required />
                    <input type="date" name='date' onChange={(evt) => setCampaignNoteDate(evt.target.value)} value={campaignNoteDate} required />
                    <textarea name='name' onChange={(evt) => setCampaignNote(evt.target.value)} value={campaignNote} placeholder="Lorem ipsum dolor sit amet..." required />
                </div>
                <button type="submit">Edit Note</button>
            </form>
        </>
    )
}