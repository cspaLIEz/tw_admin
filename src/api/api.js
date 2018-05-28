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

export const GetSuitsList = data => axios.get('/api/market/get_suits_list', data);

export const UpdateSuits = data => axios.post('/api/market/update_suits', data);
export const AddSuits = data => axios.post('/api/market/add_suits', data);
// api/market/add_suits
export const DeleteSuits = data => axios.post('/api/market/delete_suits', data);
// api/market/delete_suits
// export const apitest = data => axios.post('/article/lists', data);

//读取支付宝开关状态
export const alipay_switch = data => axios.get('/api/global/alipay_switch', data);
//切换支付宝开关状态
export const toggle_alipay = data => axios.post('/api/global/toggle_alipay', data);

//读取微信支付开关
export const tenpay_switch = data => axios.get('/api/global/tenpay_switch', data);
//切换微信支付开关
export const toggle_tenpay = data => axios.post('/api/global/toggle_tenpay', data);

// api/global/tenpay_switch

//读取公告
export const announcement = data => axios.get('/api/global/announcement', data);

//更新公告
export const update_announcement = data => axios.post('/api/global/update_announcement', data);

//切换公告开关
export const toggle_announcement = data => axios.post('/api/global/toggle_announcement', data);
//读取全局弹窗
export const dialog = data => axios.get('/api/global/dialog', data);

//更新全局弹窗
export const save_dialog = data => axios.post('/api/global/save_dialog', data);

//切换全局弹窗开关
export const toggle_dialog = data => axios.post('/api/global/toggle_dialog', data);

//登录
// export const Login = data => axios.post('/api/auth/login', data);
//注册
// export const Register = data => axios.post('/api/auth/register', data);

