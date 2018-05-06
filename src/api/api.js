import axios from '@/libs/axios';

export const apitest = data => axios.post('/article/lists', data);

export const Login = data => axios.post('/user/ulogin', data);

export const SaveProgram = data => axios.post('/program/saveprogram', data);

export const Getrellist = data => axios.post('/release/getreleaselist', data);

export const organizationList = data => axios.post('/organ/getorganinfolist', data);
export const editorgan = data => axios.post('/organ/editorgan', data);
export const addorgan = data => axios.post('/organ/addorgan', data);
export const delorgan = data => axios.post('/organ/delorgan', data);

export const getplayschedulestat = data => axios.post('/release/getplayschedulestat', data);

export const Getprginfolist = data => axios.post('/program/getprginfolist', data);
export const Getdeviceinfolist = data => axios.post('/device/getdeviceinfolist', data);

export const Getdevstatusinfolist = data => axios.post('/device/getdevstatusinfolist', data);

export const Getdevplayinfolist = data => axios.post('/device/getdevplayinfolist', data);





//登录
// export const Login = data => axios.post('/api/auth/login', data);
//注册
// export const Register = data => axios.post('/api/auth/register', data);

