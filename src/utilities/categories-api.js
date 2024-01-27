import sendRequest from './send-request';

const BASE_URL = '/api/categories';

export function addCategory(newCategory, campaign) {
    return sendRequest(`${BASE_URL}/${newCategory}/${campaign}`, 'POST');
}

export function getCategoryList(campaign) {
    return sendRequest(`${BASE_URL}/${campaign}`);
}