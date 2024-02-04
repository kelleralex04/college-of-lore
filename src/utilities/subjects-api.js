import sendRequest from './send-request';

const BASE_URL = '/api/subjects';

export function addSubject(curCategoryId, newSubject) {
    return sendRequest(`${BASE_URL}/${curCategoryId}/${newSubject}`, 'POST');
}

export function populateSubject(subjectId) {
    return sendRequest(`${BASE_URL}/${subjectId}`);
}