<template>
  <ContentBase>
      <div class="row">
        <div class="col-3">
          <!-- : 是vbind的简写，用于父组件向子组件传递消息 -->
          <!-- 当点击完follow以后，子组件需要向父组件传递信息，这个时候需要触发父组件绑定的函数，
          
          为父组件绑定事件：@follow(这个follow是任意的)， “follow”是函数名 -->
          <UserProfileInfo @follow123="follow" @unfollow1234="unfollow" :user="user" />
          <UserProfileWrite @post_a_post="post_a_post" />
        </div>
        <div class="col-9">
          <UserProfilePosts :posts="posts" />
        </div>
      </div>
  </ContentBase>
</template>

<script>
import ContentBase from '../components/ContentBase'
import UserProfileInfo from '../components/UserProfileInfo';
import UserProfilePosts from '../components/UserProfilePosts';
import UserProfileWrite from '../components/UserProfileWrite';
import { reactive } from 'vue';

export default {
  name: 'UserList',
  components: {
      ContentBase,
      UserProfileInfo,
      UserProfilePosts,
      UserProfileWrite
  },
  // 全称是这样： setup: () =>
  // 用于记录全局的信息
  setup() {
    const user = reactive({
      id: 1,
      username: "yanxuecan",
      lastName: "Yan",
      firstName: "Xuecan",
      followerCount: 0,
      is_followed: false,
    });

    const posts = reactive({
      count: 3,
      posts: [
        {
          id: 1,
          userId: 1,
          content: "今天上了web课真开心",
        },
        {
          id: 2,
          userId: 1,
          content: "今天上了算法课，更开心了",
        },
        {
          id: 3,
          userId: 1,
          content: "今天上了acwing ，开心极了",
        },
      ]
    });

    const follow = () => {
      if (user.is_followed) return;
      user.is_followed = true;
      user.followerCount ++ ;
    };

    const unfollow = () => {
      if (!user.is_followed) return;
      user.is_followed = false;
      user.followerCount -- ;
    };

    const post_a_post = (content) => {
      posts.count ++ ;
      posts.posts.unshift({
        id: posts.count,
        userId: 1,
        content: content,
      })
    };

    return {
      // key和value一样的话，可以简写成一个值
      user,
      follow,
      unfollow,
      posts,
      post_a_post
    }
  }
}
</script>

<style scoped>
</style>