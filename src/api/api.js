import axios from '@/libs/axios';

export const apitest = data => axios.post('/article/lists', data);

export const Login = data => axios.post('/user/ulogin', data);

export const SaveProgram = data => axios.post('/program/saveprogram', data);

export const Getrellist = data => axios.post('/release/getreleaselist', data);

// 机构管理模块
export const organizationList = data => axios.post('/organ/getorganinfolist', data);
export const editorgan = data => axios.post('/organ/editorgan', data);
export const addorgan = data => axios.post('/organ/addorgan', data);
export const delorgan = data => axios.post('/organ/delorgan', data);

// 角色管理模块
export const getroleinfolist = data => axios.post('/role/getroleinfolist', data);
export const addrole = data => axios.post('/role/addrole', data);
export const delrole = data => axios.post('/role/delrole', data);
export const editrole = data => axios.post('/role/editrole', data);

// 用户管理模块
export const getuserinfolist = data => axios.post('user/getuserinfolist', data);
export const adduser = data => axios.post('/user/adduser', data);
export const deluser = data => axios.post('/user/deluser', data);
export const edituser = data => axios.post('/user/edituser', data);
export const setuserrole = data => axios.post('/user/setuserrole', data);

// 日志模块
export const getloginfolist = data => axios.post('/log/getloginfolist', data);
export const getmsglist = data => axios.post('/log/getmsglist', data);
export const getdevgroupinfolist = data => axios.post('/device/getdevgroupinfolist', data);


export const getplayschedulestat = data => axios.post('/release/getplayschedulestat', data);

export const Getprginfolist = data => axios.post('/program/getprginfolist', data);
export const Getdeviceinfolist = data => axios.post('/device/getdeviceinfolist', data);

export const Getdevstatusinfolist = data => axios.post('/device/getdevstatusinfolist', data);

export const Getdevplayinfolist = data => axios.post('/device/getdevplayinfolist', data);





//登录
// export const Login = data => axios.post('/api/auth/login', data);
//注册
// export const Register = data => axios.post('/api/auth/register', data);

