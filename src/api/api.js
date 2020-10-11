let baseUrl = 'http://111.229.254.185/questionnaire/v1.0';
import qs from 'qs';
import request from './request'


export const updateRoom =  params => { return request.post(`${baseUrl}/api/updateRoom`, qs.stringify(params)); };

export const addRoom = params => { return request.post(`${baseUrl}/api/addRoom`, qs.stringify(params)); };

export const getRoomInfo = params=> { return request.get(`${baseUrl}/api/roomList`, { params: params }); };

export const deleteRoom = params => { return request.post(`${baseUrl}/api/deleteRoom`, qs.stringify(params)); };

export const addQuestion = params => { 
    return request.post(`${baseUrl}/questionnaire/add`, qs.stringify(params)); 
}

export const commitAnswer = params => {
    return request.post(`${baseUrl}/answer/commit`, qs.stringify(params)); 
}

export const queryQuestionInfo = params => {
    return request.get(`${baseUrl}/questionnaire/infos`, { params: params })
}

export const loginByMsg = params=> { return request.get(`${baseUrl}/user/login`, { params: params }); };

export const loginSend = params => { return request.post(`${baseUrl}/message/send`, qs.stringify(params)); };

export const getMyQuestions = params=> { return request.get(`${baseUrl}/questionnaire/myinfos`, { params: params }); };

export const getUserList = params=> { return request.get(`${baseUrl}/user/infos`, { params: params }); };

export const addUser = params => { return request.post(`${baseUrl}/user/add`, qs.stringify(params)); };

export const deleteUser = params => { return request.post(`${baseUrl}/user/del`, qs.stringify(params)); };

export const analysis = params=> { return request.get(`${baseUrl}/statistic/analysis`, { params: params }); };

export const crossAnalysis = params=> { return request.get(`${baseUrl}/cross/analysis`, { params: params }); };

