import axios from '@/libs/axios';
// axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
export const Login = data => axios.post('/api/auth/login', data);

export const monitoring = data => axios.get('/api/market/monitoring', data);

export const replenishment = data => axios.post('/api/market/replenish', data);

export const SaveRecommendedItems = data => axios.post('/api/market/SaveRecommendedItems', data);

export const GetRecommendedItems = data => axios.get('/api/Market/GetRecommendedItems', data);

export const processing = data => axios.get('/api/market/processing_replenishment', data);

export const replenishment_status = data => axios.get('/api/market/replenishment_status', data);

export const GetSuitsList = data => axios.get('api/market/get_suits_list', data);

// export const apitest = data => axios.post('/article/lists', data);

//登录
// export const Login = data => axios.post('/api/auth/login', data);
//注册
// export const Register = data => axios.post('/api/auth/register', data);

