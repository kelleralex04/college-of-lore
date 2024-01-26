import sendRequest from './send-request';

const BASE_URL = '/api/campaigns';

export function getCampaignList() {
    return sendRequest(`${BASE_URL}/index`);
}

export function addCampaign(newCampaign) {
    return sendRequest(`${BASE_URL}/${newCampaign}`, 'POST');
}

export function getCurCampaign(curCampaign) {
    return sendRequest(`${BASE_URL}/${curCampaign}`);
}