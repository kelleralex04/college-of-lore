import sendRequest from './send-request';

const BASE_URL = '/api/categories';

export function addCategory(newCategory, campaign) {
    return sendRequest(`${BASE_URL}/${newCategory}/${campaign}`, 'POST');
}

export function addCategoryDescription(categoryId, categoryDescription) {
    return sendRequest(`${BASE_URL}/${categoryId}/description/${categoryDescription}`, 'POST');
}

export function populateCategory(categoryId) {
    return sendRequest(`${BASE_URL}/${categoryId}`)
}

export function deleteCategory(campaignId, categoryId) {
    return sendRequest(`${BASE_URL}/${campaignId}/${categoryId}`, 'DELETE');
}
