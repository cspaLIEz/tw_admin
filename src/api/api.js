import axios from '@/libs/axios';

export const apitest = data => axios.post('/article/lists', data);

export const Login = data => axios.post('/user/ulogin', data);

export const SaveProgram = data => axios.post('/program/saveprogram', data);

export const Getrellist = data => axios.post('/release/getrellist', data);

export const organizationList = data => axios.post('/organ/getorganinfolist', data);

export const getplayschedulestat = data => axios.post('/release/getplayschedulestat', data);

export const getprginfolist = data => axios.post('/program/getprginfolist', data);



//登录
// export const Login = data => axios.post('/api/auth/login', data);
//注册
// export const Register = data => axios.post('/api/auth/register', data);

