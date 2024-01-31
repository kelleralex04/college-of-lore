import sendRequest from './send-request';

const BASE_URL = '/api/campaigns';

export function getCampaignList() {
    return sendRequest(`${BASE_URL}/index`);
}

export function addCampaign(newCampaign) {
    return sendRequest(`${BASE_URL}/${newCampaign}`, 'POST');
}

export function addCampaignDescription(campaign, campaignDescription) {
    return sendRequest(`${BASE_URL}/${campaign}/description/${campaignDescription}`, 'POST');
}

export function addCampaignNote(campaign, campaignNote) {
    return sendRequest(`${BASE_URL}/${campaign}/note/${campaignNote}`, 'POST');
}