<template>
  <ContentBase>
    <div class="row justify-content-md-center">
      <div class="col-3">
        <!-- 默认提交以后不刷新表单，只执行register函数 -->
        <form @submit.prevent="register">
          <div class="mb-3">
            <!-- label中的for属性规定了label与哪个表单元素绑定。
            for属性的值和表单元素的id值一样，即可完成该label标签与该表单元素的绑定 -->
            <label for="username" class="form-label">用户名</label>
            <!-- v-model使得输入的内容和username绑定 -->
            <input v-model="username" type="text" class="form-control" id="username">
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">密码</label>
            <input v-model="password" type="password" class="form-control" id="password">
          </div>
          <div class="mb-3">
            <label for="password_confirm" class="form-label">确认密码</label>
            <input v-model="password_confirm" type="password" class="form-control" id="password_confirm">
          </div>
          <div class="error-message">{{ error_message }}</div>
          <button type="submit" class="btn btn-primary">登录</button>
        </form>
      </div>
    </div>
  </ContentBase>
</template>

<script>
import ContentBase from '../components/ContentBase'
import { ref } from 'vue';
import { useStore } from 'vuex';
import router from '@/router/index';
import $ from 'jquery';

export default {
  name: 'RegisterView',
  components: {
      ContentBase,
  },
//   setup() 函数在组件创建 created() 之前执行。

// setup() 函数接收两个参数 props 和 context。

// 第一个参数 props，它是响应式的，当传入新的 prop 时，它将被更新。

// 第二个参数 context 是一个普通的 JavaScript 对象，它是一个上下文对象，暴露了其它可能在 setup 中有用的值。
  setup() {
    // ES2015(ES6) 新增加了两个重要的 JavaScript 关键字: let 和 const。

    // let 声明的变量只在 let 命令所在的代码块内有效。

    // const 声明一个只读的常量，一旦声明，常量的值就不能改变。
    const store = useStore();
    let username = ref('');
    let password = ref('');
    let password_confirm = ref('');
    let error_message = ref('');
    
    // 注册时调用的函数
    const register = () => {
      error_message.value = "";

      $.ajax({
        url: "https://app165.acapp.acwing.com.cn/myspace/user/",
        type: "POST",
        data: {
          username: username.value,
          password: password.value,
          password_confirm: password_confirm.value,
        },
        // success()函数是ajax()向后台请求成功后自动调用的，
        // 在success(response)函数里面的变量只有一个,且里面不能
        // 调用自定义的变量，response是后台返回来的值。
        success(resp) {
          // 登录成功直接跳转
          if (resp.result === "success") {
            // dispatch：含有异步操作，数据提交至actions，可用于向后台提交数据
            // dispatch是通过vuex 然后向后台请求数据 登陆 进行页面跳转
            // 注册成功直接登录是吧？
            // 调用/store/user.js中action中的login
            store.dispatch("login", 
            // 这是一个对象
            {
              username: username.value,
              password: password.value,
              // 
              success() {
                router.push({name: 'userlist'});
              },
              error() {
                error_message.value = "系统异常，请稍后重试";
              }
            }
            );
          } 
          // 否则报错
          else {
            error_message.value = resp.result;
          }
        }
      })
    };

    return {
      username,
      password,
      password_confirm,
      error_message,
      register,
    }
  }
}
</script>

<style scoped>
button {
  width: 100%;
}

.error-message {
  color: red;
}
</style>