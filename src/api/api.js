import axios from '@/libs/axios';

export const apitest = data => axios.post('/article/lists', data);

export const Login = data => axios.post('/user/ulogin', data);

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
export const getmenulist = data => axios.post('/menu/getmenulist', data);

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

//节目列表
export const Getprginfolist = data => axios.post('/program/getprginfolist', data);
//删除节目
export const delprg = data => axios.post('/program/delprg', data);
//新建节目初始化接口
export const getinitpara = data => axios.post('/program/getinitpara', data);
//保存节目
export const SaveProgram = data => axios.post('/program/saveprogram', data);
//节目编辑接口
export const editprg = data => axios.post('/program/editprg', data);
//节目复制接口
export const copyprginfo = data => axios.post('/program/copyprginfo', data);
//节目提交模块
export const submitprg = data => axios.post('/program/submitprg', data);

//节目审批列表
export const getprgappinfolist = data => axios.post('/program/getprgappinfolist', data);

//插播消息列表
export const getmsginfolist = data => axios.post('/message/getmsginfolist', data);
//插入消息
export const insertmsg = data => axios.post('/message/insertmsg', data);
//清空消息
export const deletemsg = data => axios.post('/message/deletemsg', data);
//消息详情
export const msginfo = data => axios.post('/message/msginfo', data);


export const Getdeviceinfolist = data => axios.post('/device/getdeviceinfolist', data);

export const Getdevstatusinfolist = data => axios.post('/device/getdevstatusinfolist', data);

export const Getdevplayinfolist = data => axios.post('/device/getdevplayinfolist', data);

export const Getmateriallist = data => axios.post('/material/getmateriallist', data);

export const Gettempinfolist = data => axios.post('/template/gettempinfolist', data);

export const Getreldetail = data => axios.post('/release/getreldetail', data);

//终端注册接口
export const Regdevice = data => axios.post('/device/regdevice', data);
//终端删除列表
export const Deldevice = data => axios.post('/device/deldevice', data);
//终端运行属性保存接口

export const Savedevruninfo = data => axios.post('/device/savedevruninfo', data);
//登录
// export const Login = data => axios.post('/api/auth/login', data);
//注册
// export const Register = data => axios.post('/api/auth/register', data);

