import Cookies from 'js-cookie';

const user = {
    namespaced: true,
    state: {
        user:'',
        userId:''
    },
    mutations: {
        logout (state, vm) {
            Cookies.remove('user');
            Cookies.remove('userId');
            Cookies.remove('password');
            Cookies.remove('access');
            // 恢复默认样式
            let themeLink = document.querySelector('link[name="theme"]');
            themeLink.setAttribute('href', '');
            // 清空打开的页面等数据，但是保存主题数据
            let theme = '';
            if (localStorage.theme) {
                theme = localStorage.theme;
            }
            localStorage.clear();
            if (theme) {
                localStorage.theme = theme;
            }
        },
        login (state, data) {
            state.user = data.user;
            state.userId = data.userId;
            Cookies.set('user', data.user);
            Cookies.set('userId', data.userId);
        }
    }
};

export default user;
