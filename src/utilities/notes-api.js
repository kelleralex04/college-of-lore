import sendRequest from './send-request';

const BASE_URL = '/api/notes';

export function addCampaignNote(campaign, campaignNoteTitle, campaignNoteDate, campaignNote) {
    return sendRequest(`${BASE_URL}/${campaign}/note/${campaignNoteTitle}/${campaignNoteDate}/${campaignNote}`, 'POST');
}