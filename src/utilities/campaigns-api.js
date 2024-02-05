import sendRequest from './send-request';

const BASE_URL = '/api/campaigns';

export function getCampaignList() {
    return sendRequest(`${BASE_URL}/index`);
}

export function getCurCampaign(campaignId) {
    return sendRequest(`${BASE_URL}/${campaignId}`);
}

export function addCampaign(newCampaign) {
    return sendRequest(`${BASE_URL}/${newCampaign}`, 'POST');
}

export function editCampaign(campaignId, campaignName, campaignDescription) {
    return sendRequest(`${BASE_URL}/${campaignId}/name/${campaignName}/description/${campaignDescription}`, 'POST');
}

export function editCampaignTitle(campaignId, campaignName) {
    return sendRequest(`${BASE_URL}/${campaignId}/name/${campaignName}`, 'POST');
}

export function addCampaignNote(campaign, campaignNote) {
    return sendRequest(`${BASE_URL}/${campaign}/note/${campaignNote}`, 'POST');
}

export function deleteCampaign(campaignId) {
    return sendRequest(`${BASE_URL}/${campaignId}`, 'DELETE')
}

export function addImage(campaignId, imageId) {
    return sendRequest(`${BASE_URL}/${campaignId}/image/${imageId}`, 'POST');
}