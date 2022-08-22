import VueRouter from 'vue-router'
import Blog from "@/components/pages/Blog";
import TodoList from "@/components/pages/TodoList";
import Start from "@/components/pages/Start";
import Home from "@/components/pages/Home";
import Vue from "vue";

Vue.use(VueRouter)

export default new VueRouter({
    routes: [
        {
            path:"/",
            redirect:"/home"
        },
        {
            name: "Home",
            path: "/home",
            component: Home
        },
        {
            name:"Start",
            path: "/start",
            component: Start,
            redirect: '/start/blog',
            children: [{
                path: "blog",
                component: Blog,
            },
                {
                    path:"todolist" ,
                    component: TodoList
                }]
        }]
})