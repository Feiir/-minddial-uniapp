import { wxLogin, getUserInfo } from '@/network/api'
import logo from '@/static/svg/logo.svg'
const auth = {
  state: {
    token: '',
    userInfo: {},
  },
  getters: {
    isVip(state) {
      const nowTime = new Date().getTime() / 1000
      return nowTime < state.userInfo.vipExpireTime
    },
    avatar(state) {
      return state.userInfo.avatar || logo
    },
  },
  mutations: {
    setToken(state, token) {
      uni.setStorageSync('token', token)
      state.token = token
    },
    setUserInfo(state, userInfo) {
      uni.setStorageSync('userInfo', userInfo)
      state.userInfo = userInfo
    },
    logout(state) {
      uni.removeStorageSync('token')
      uni.removeStorageSync('userInfo')
      state.token = ''
      state.userInfo = {}
    },
  },
  actions: {
    async wxLogin({ commit, dispatch }, data) {
      // const res = await wxLogin(data)
      // console.log(res)
      commit(
        'setToken',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODg3MTM3MzIsInVzZXJfaWQiOjk5OTl9.0xY_N-QnO4qpWdigpKcJBuDb_t3crTYLEWd7c2TFu5Y',
      )
      await dispatch('getUserInfo')
    },
    async getUserInfo({ commit }) {
      const res = await getUserInfo()
      commit('setUserInfo', res)
    },
  },
}
export default auth
