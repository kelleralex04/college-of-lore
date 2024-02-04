import sendRequest from './send-request';

const BASE_URL = '/api/categories';

export function addCategory(newCategory, campaign) {
    return sendRequest(`${BASE_URL}/${newCategory}/${campaign}`, 'POST');
}

export function editCategory(categoryId, categoryName, categoryDescription) {
    return sendRequest(`${BASE_URL}/${categoryId}/name/${categoryName}/description/${categoryDescription}`, 'POST');
}

export function editCategoryTitle(categoryId, categoryName) {
    return sendRequest(`${BASE_URL}/${categoryId}/name/${categoryName}`, 'POST');
}

export function populateCategory(categoryId) {
    return sendRequest(`${BASE_URL}/${categoryId}`)
}

export function deleteCategory(campaignId, categoryId) {
    return sendRequest(`${BASE_URL}/${campaignId}/${categoryId}`, 'DELETE');
}
