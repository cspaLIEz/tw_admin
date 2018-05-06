import axios from '@/libs/axios';

export const apitest = data => axios.post('/article/lists', data);

export const Login = data => axios.post('/user/ulogin', data);

export const SaveProgram = data => axios.post('/program/saveprogram', data);

export const Getrellist = data => axios.post('/release/getrellist', data);

export const organizationList = data => axios.post('/organ/getorganinfolist', data);
export const editorgan = data => axios.post('/organ/editorgan', data);
export const addorgan = data => axios.post('/organ/addorgan', data);
export const delorgan = data => axios.post('/organ/delorgan', data);

export const getroleinfolist = data => axios.post('/role/getroleinfolist', data);
export const addrole = data => axios.post('/role/addrole', data);
export const delrole = data => axios.post('/role/delrole', data);
export const editrole = data => axios.post('/role/editrole', data);

export const getuserinfolist = data => axios.post('user/getuserinfolist', data);
export const adduser = data => axios.post('/user/adduser', data);
export const deluser = data => axios.post('/user/deluser', data);
export const edituser = data => axios.post('/user/edituser', data);
export const setuserrole = data => axios.post('/user/setuserrole', data);

export const getplayschedulestat = data => axios.post('/release/getplayschedulestat', data);

export const getprginfolist = data => axios.post('/program/getprginfolist', data);



//登录
// export const Login = data => axios.post('/api/auth/login', data);
//注册
// export const Register = data => axios.post('/api/auth/register', data);

