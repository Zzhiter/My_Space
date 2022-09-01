import $ from 'jquery';
import jwt_decode from 'jwt-decode';

const ModuleUser = {
  // 这个里边存数据
  state: {
    id: "",
    username: "",
    photo: "",
    followerCount: 0,
    access: "",
    refresh: "",
    is_login: false,
  },
  // 不能直接获取，需要做一些计算的时候，放在这个里边
  getters: {
    //   fullname(state) {
    //       return state.user.firstName + state.user.lastName
    //   }
  },
  // 所有直接的修改操作需要放到mutation里边
  mutations: {
      updateUser(state, user) {
          state.id = user.id;
          state.username = user.username;
          state.photo = user.photo;
          state.followerCount = user.followerCount;


          state.access = user.access;
          state.refresh = user.refresh;
          state.is_login = user.is_login;
      },
      updateAccess(state, access) {
          state.access = access;
      },

      // 修改全局信息都需要在这个user里边改
      logout(state) {
          state.id = "";
          state.username = "";
          state.photo = "";
          state.followerCount = 0;
          state.access = "";
          state.refresh = "";
          state.is_login = false;
      }
  },
  // 需要向服务器请求，从而进行修改的，需要放到actions中
  actions: {
      login(context, data) {
        $.ajax({
            url: "https://app165.acapp.acwing.com.cn/api/token/",
            type: "POST",
            data: {
                username: data.username,
                password: data.password,
            },
            success(resp) {
                const {access, refresh} = resp;
                const access_obj = jwt_decode(access);

                setInterval(() => {
                    // 刷新
                    $.ajax({
                        url: "https://app165.acapp.acwing.com.cn/api/token/refresh/",
                        type: "POST",
                        data: {
                            refresh,
                        },
                        success(resp) {
                            context.commit('updateAccess', resp.access);
                        }
                    });
                }, 4.5 * 60 * 1000);


                // 获取某个用户的信息
                $.ajax({
                    url: "https://app165.acapp.acwing.com.cn/myspace/getinfo/",
                    type: "GET",
                    data: {
                        user_id: access_obj.user_id,
                    },
                    // 背过就行了，认为定义的
                    headers: {
                        'Authorization': "Bearer " + access,
                    },
                    success(resp) {
                        context.commit("updateUser", {
                            ...resp,
                            access: access,
                            refresh: refresh,
                            is_login: true,
                        });
                        data.success();
                    },
                })
            },
            error() {
                data.error();
            }
        });
      },
  },
  // 为了将state进行分割，有可能state会很大
  modules: {
  }
};

export default ModuleUser;