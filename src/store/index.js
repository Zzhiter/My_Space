import { createStore } from 'vuex'
import ModuleUser from './user';

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    // 用一个单独的对象，去维护User
    user: ModuleUser,
  }
});