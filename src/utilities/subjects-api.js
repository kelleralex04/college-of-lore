import sendRequest from './send-request';

const BASE_URL = '/api/subjects';

export function addSubject(curCampaign, curCategory, newSubject) {
    return sendRequest(`${BASE_URL}/${curCampaign}/${curCategory}/${newSubject}`, 'POST');
}