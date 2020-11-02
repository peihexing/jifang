let baseUrl = 'http://39.105.48.131/smart/monitor/v1.0';
// http://39.105.48.131:8080/smart/monitor/v1.0/device/description
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

export const getDeviceDescription = params=> { return request.get(`${baseUrl}/device/description`, { params: params }); };


export const getSignalInfo = params=> { return request.get(`${baseUrl}/signal/info`, { params: params }); };

export const getExceptInfo = params=> { return request.get(`${baseUrl}/device/except/info`, { params: params }); };

export const getExceptLog = params=> { return request.get(`${baseUrl}/device/except/log`, { params: params }); };


export const exceptDeal = params => { return request.post(`${baseUrl}/device/except/deal`, qs.stringify(params)); };

export const holdinfo = params => { return request.post(`${baseUrl}/device/holdinfo`, qs.stringify(params)); };

export const metreAdd = params => { return request.post(`${baseUrl}/metre/add`, qs.stringify(params)); };


export const getInfoDetail = params=> { return request.get(`${baseUrl}/device/info/detail`, { params: params }); };

export const getCountInfo = params=> { return request.get(`${baseUrl}/count/info`, { params: params }); };

export const login = params=> { return request.get(`${baseUrl}/login/passwd/`, { params: params }); };


export const registered = params => { return request.post(`${baseUrl}/login/registered/`, qs.stringify(params)); };




