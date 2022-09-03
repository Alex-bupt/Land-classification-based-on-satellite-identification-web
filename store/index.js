import Vue from "vue";
import Vuex from "vuex";
// 引入js文件
Vue.use(Vuex);

const actions = {
    updateUnfinished(context, value) {
        console.log("1111")
        context.commit("UPDATEUNFINISHED", value);
    },
    updateFinished(context, value) {
        context.commit("UPDATEFINISHED", value);
    },
    updateAll(context, value) {
        context.commit("UPDATEALL", value);
    },
    updateIsExpire(context, value) {
        context.commit("UPDATEISEXPIRE", value);
    },
    updateFans(context, value) {
        context.commit("UPDATEFANS", value);
    },
    updateCount(context, value) {
        context.commit("UPDATECOUNT", value);
    },
    updateFollow(context, value) {
        context.commit("UPDATEFOLLOW", value);
    },
    updateBlogs(context, value) {
        context.commit("UPDATEBLOGS", value);
    }
}

const mutations = {
    UPDATEUNFINISHED(state, value) {
        state.unfinished = value;
    },
    UPDATEFINISHED(state, value) {
        state.finished = value;
    },
    UPDATEALL(state, value) {
        state.all = value;
    },
    UPDATEISEXPIRE(state, value) {
        state.isExpire = value;
    },
    UPDATEFANS(state, value) {
        state.fans = value;
    },
    UPDATECOUNT(state, value) {
        state.count = value;
    },
    UPDATEFOLLOW(state, value) {
        state.follow = value;
    },
    UPDATEBLOGS(state, value) {
        state.blogs = value;
    }
}

const getters = {
    unfinished(state) {
        return state.unfinished
    },
    finished(state) {
        return state.finished
    },
    all(state) {
        return state.all
    },
    isExpire(state) {
        return state.isExpire
    }
}

const state = {
    unfinished: 0,
    finished: 0,
    all: 0,
    isExpire: 0,
    fans: 0,
    count: 0,
    follow: 0,
    blogs: []
}

export default new Vuex.Store({
    actions,
    mutations,
    state,
    getters
});