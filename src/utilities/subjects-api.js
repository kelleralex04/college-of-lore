import sendRequest from './send-request';

const BASE_URL = '/api/subjects';

export function addSubject(curCategoryId, newSubject) {
    return sendRequest(`${BASE_URL}/${curCategoryId}/${newSubject}`, 'POST');
}

export function populateSubject(subjectId) {
    return sendRequest(`${BASE_URL}/${subjectId}`);
}

export function deleteSubject(categoryId, subjectId) {
    return sendRequest(`${BASE_URL}/${categoryId}/${subjectId}`, 'DELETE');
}

export function editSubject(subjectId, subjectName, subjectDescription) {
    return sendRequest(`${BASE_URL}/${subjectId}/name/${subjectName}/description/${subjectDescription}`, 'POST');
}

export function editSubjectTitle(subjectId, subjectName) {
    return sendRequest(`${BASE_URL}/${subjectId}/name/${subjectName}`, 'POST');
}