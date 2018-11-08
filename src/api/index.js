import sendAjax from './ajax';

const url = 'http://lcoalhost:8000';

export const reqRegister = data => sendAjax(url+'/register', data, 'POST');
export const reqLogin = data => sendAjax(url+'/login', data, 'POST');
export const updateUser = data =>sendAjax(url+'/updateUser', data, 'POST');
export const getUser = () =>sendAjax(url+'/getUserInfo');
export const getUserList = (data) =>sendAjax(url+'/getUserListInfo',data);
export const getChatList= () =>sendAjax(url+'/getChatList');
export const updateReadMessage = (data) =>sendAjax(url+'/updateReadMessage',data);