<template>
    <!-- 这个也是bootstrap写的 -->
    <div class="card">
        <div class="card-body">
            <div class="row">
                <div class="col-3">
                    <!-- 自适应大小 -->
                    <img class="img-fluid" src="https://cdn.acwing.com/media/user/profile/photo/1_lg_844c66b332.jpg" alt="">
                </div>
                <div class="col-9">
                    <div class="username">{{ fullName }}</div>
                    <div class="fans">粉丝：{{ user.followerCount }}</div>
                    <!-- v-if,  @是v-on的简写，用于绑定事件-->
                    <button @click="follow" v-if="!user.is_followed" type="button" 
                    class="btn btn-secondary btn-sm">+关注</button>
                    <button @click="unfollow" v-if="user.is_followed" type="button" 
                    class="btn btn-secondary btn-sm">取消关注</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { computed } from 'vue';

export default {
    name: "UserProfileInfo",
    // 接受父组件传递过来的消息
    props: {
        user: {
            type: Object,
            required: true,
        },
    },
    // 
    setup(props, context) {
        let fullName = computed(
            // 传一个匿名函数
            () => props.user.lastName + ' ' + props.user.firstName
            );

        const follow = () => {
            // 触发父组件绑定的函数
            context.emit('follow123');
        };

        const unfollow = () => {
            context.emit("unfollow1234");
        }

        // 只有返回才可以用，不返回不能用
        return {
            fullName,
            follow,
            unfollow,
        }
    }
}
</script>


<style scoped>
/* 变成原型 */
img {
    border-radius: 50%;
}

.username {
    font-weight: bold;
}

.fans {
    font-size: 12px;
    color: gray;
}

button {
    padding: 2px 4px;
    font-size: 12px;
}

</style>