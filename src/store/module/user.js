import Axios from '../../server/axios';
const state = {

  //初始化时用 localStorage.getItem('token') 这样刷新页面就无需重新登录
  token: localStorage.getItem('token') || '',
  // z_custom_id:125,
  // token: '',
  //用户信息
  user: JSON.parse(localStorage.getItem('diruserinfo')) || {},
  activeOrgId:localStorage.getItem('ACTIVE_ORG_ID'),
  redirect:'',
  param:{},

};

const mutations = {

  	//设置token
	SET_TOKEN(state, token) {
		state.token = token;
		localStorage.setItem('token', token);
	},

  //设置当前浏览的机构Id
  SET_ORG_ID(state, id) {
    state.activeOrgId = id;
    localStorage.setItem('ACTIVE_ORG_ID', id);
  },


  //self_share_code
  SET_SELF_SHARE_CODE(state, self_share_code) {
    state.self_share_code = self_share_code;
    localStorage.setItem('self_share_code', self_share_code);
  },



  //SET_SHARE_CODE
  SET_SHARE_CODE(state, share_code) {
    state.share_code = share_code;
    localStorage.setItem('share_code', share_code);
  },

  //设置用户信息
	SET_USER(state, user) {
		state.user = { ...state.user, ...user};
	},

	//退出登录状态
	LOGOUT(state) {
		state.token = '';
		state.user = {};
		localStorage.removeItem('token');
	}

};

const actions = {


	/*
	 * 退出登录
	 */
	clearToken({ state, commit }, data) {
		commit('LOGOUT');
		return true;
	},
  setOrgId({ state, commit }, data) {
    commit('SET_ORG_ID', data);
    return true;
  },

	/*
	 * 设置缓存token
	 * @param mobile required 手机号
	 * @param mcode required 验证码
	 */
	setToken({ state, commit }, data) {
		commit('SET_TOKEN', data.token);
		return true;
	},


  setUser({ state, commit }, data) {
    commit('SET_USER', data);
    return true;
  },
};


const getters = {

  getShareCode: state => {
    return state.share_code;
  },
  getSelfShareCode:state => {
    return state.self_share_code
  },


}

export default {
	state,
	actions,
	mutations,
  getters
}
