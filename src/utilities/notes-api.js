import sendRequest from './send-request';

const BASE_URL = '/api/notes';

export function addCampaignNote(campaign, campaignNoteTitle, campaignNoteDate, campaignNote) {
    return sendRequest(`${BASE_URL}/campaign/${campaign}/note/${campaignNoteTitle}/${campaignNoteDate}/${campaignNote}`, 'POST');
}

export function editCampaignNote(sessionNoteId, campaignNoteTitle, campaignNoteDate, campaignNote) {
    return sendRequest(`${BASE_URL}/campaign/${sessionNoteId}/${campaignNoteTitle}/${campaignNoteDate}/${campaignNote}`, 'POST');
}

export function addSubjectNote(subject, subjectNoteTitle, subjectNoteDate, subjectNote) {
    return sendRequest(`${BASE_URL}/subject/${subject}/note/${subjectNoteTitle}/${subjectNoteDate}/${subjectNote}`, 'POST');
}

export function editSubjectNote(subjectNoteId, subjectNoteTitle, subjectNoteDate, subjectNote) {
    return sendRequest(`${BASE_URL}/subject/${subjectNoteId}/${subjectNoteTitle}/${subjectNoteDate}/${subjectNote}`, 'POST');
}