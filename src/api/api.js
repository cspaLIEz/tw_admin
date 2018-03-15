import axios from '@/libs/axios';

export const apitest = data => axios.post('/article/lists', {params:data});

export const Login = data => axios.post('/user/ulogin', {params:data});

//登录
// export const Login = data => axios.post('/api/auth/login', data);
//注册
// export const Register = data => axios.post('/api/auth/register', data);

