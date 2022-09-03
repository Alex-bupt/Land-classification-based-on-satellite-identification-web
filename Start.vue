<template>
  <div>
    <div class="navbar navbar-expand-lg bg-primary navbar-dark fixed-top" style="display: block">
      <div class="container" style="position: relative">
        <a href="#" class="navbar-brand" @click="toList"><i><img class="home-icon" src="../../assets/edit.png"/></i>
          TodoList</a>
        <a href="#" class="navbar-brand" @click="toBlog"><i><img class="home-icon" src="../../assets/blog.png"/></i>
          BLOG</a>
        <h5 class="mb-0 start-slogan">无念方能静,静中气自平</h5>
        <div class="navbar-nav ms-auto">
          <form class="d-flex">
            <input class="form-control me-2" type="text" placeholder="Username" v-model="currentsearchinguser"/>
            <button class="btn btn-warning" type="button" @click="SearchForUser">
              Search
            </button>
          </form>
        </div>
      </div>
    </div>
    <div class="container start-body">
      <div class="myself-box">
        <div class="myself-name">你好，{{ username }}</div>
        <div class="myself-data">
          <div class="list-group">
            <a href="#" class="list-group-item list-group-item-secondary" style="background-color: #f0eff4">个人数据</a>
            <a href="#" class="
                list-group-item list-group-item-warning
                d-flex
                justify-content-between
                align-items-center
              " style="background-color: #ebc999">粉丝<span class="badge bg-warning rounded-pill">{{fans}}</span></a>
            <a href="#" class="
                list-group-item
                d-flex
                justify-content-between
                align-items-center
              " style="background-color: #8ca9d3">关注<span class="badge bg-primary rounded-pill">{{follow }}</span></a>
            <a href="#" class="
                list-group-item list-group-item-danger
                d-flex
                justify-content-between
                align-items-center
              " style="background-color: #f26659">BLOG<span class="badge rounded-pill"
                                                            style="background-color: #ba2c3a">{{ count }}</span></a>
          </div>
        </div>
      </div>
      <div class="start-content">
        <div class="start-items" style="width: 100%">
          <div class="start-timer">
            <h4>北京时间</h4>
            <br/>
            <h4>{{ newTime }}</h4>
            <!--钟表-->
          </div>
          <div class="start-sum">
            <div class="list-group">
              <a href="#" class="list-group-item list-group-item-secondary d-flex
                  justify-content-between
                  align-items-center">List小助手<button class="btn btn-primary" @click="update">update</button></a>
              <a href="#" class="
                  list-group-item list-group-item-warning
                  d-flex
                  justify-content-between
                  align-items-center
                ">未完成事务<span class="badge bg-warning rounded-pill">{{unfinished }}</span></a>
              <a href="#" class="
                  list-group-item list-group-item-success
                  d-flex
                  justify-content-between
                  align-items-center
                ">已完成事务<span class="badge bg-success rounded-pill">{{finished }}</span></a>
              <a href="#" class="
                  list-group-item list-group-item-primary
                  d-flex
                  justify-content-between
                  align-items-center
                ">事务总数<span class="badge bg-primary rounded-pill">{{all}}</span></a>
              <a href="#" class="
                  list-group-item list-group-item-danger
                  d-flex
                  justify-content-between
                  align-items-center
                ">已到达截止时间<span class="badge bg-danger rounded-pill">{{isExpire }}</span></a>
            </div>
          </div>
        </div>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import axios from "axios";

const days = ["天", "一", "二", "三", "四", "五", "六"]; // 星期数组
const icnow = new Date(); // 初始化时间
let interval; // 定义全局定时器，用于清除定时器

export default {
  name: "Start",
  data() {
    return {
      username: "",
      userid: "",
      unfinished: 0,
      finished: 0,
      all: 0,
      isExpire: 0,
      year: icnow.getFullYear(),
      month: icnow.getMonth() + 1,
      date: icnow.getDate(),
      day: days[icnow.getDay() - 1],
      time: icnow.toTimeString().substring(0, 8),
      fans: 1,
      count: 2,
      follow: 3,
      currentsearchinguser: "",
      isFind: false,
      blogs: [],
      httpUrl:''
    };
  },
  beforeCreate() {
    if (location.href.indexOf("#reloaded") == -1) {
      location.href = location.href + "#reloaded";
      location.reload();
    }
  },
  created() {
    interval = setInterval(() => {
      let icnow = new Date();
      this.year = icnow.getFullYear();
      this.month = icnow.getMonth() + 1;
      this.date = icnow.getDate();
      this.day = days[icnow.getDay()];
      this.time = icnow.toTimeString().substring(0, 8);
    }, 1000);
  },
  mounted() {
    this.httpUrl = this.$route.query.httpUrl;
    this.username = sessionStorage.getItem("userName");
    this.userid = this.$route.query.userid;
    this.$router.push(
        {path: "/start/todolist", query: {userid: this.userid,httpUrl:this.httpUrl}},
        () => {
        },
        () => {
        }
    );
    axios({
      url: this.httpUrl + "/task/get",
      method: "post",
      params: {
        userid: this.userid,
      },
    }).then((res) => {
      this.unfinished = res.data.data.unfinished;
      this.finished = res.data.data.finished;
      this.all = res.data.data.all;
      this.isExpire = res.data.data.isExpire;
    });

    axios({
      url: this.httpUrl + "/blog/get",
      method: "post",
      params: {
        userid: this.userid,
      },
    }).then((res) => {
      this.fans = res.data.data.fans;
      this.count = res.data.data.count;
      this.follow = res.data.data.follow;
    });
  },
  methods: {
    toBlog() {
      this.$router.push(
          {path: "/start/blog", query: {userid: this.userid,httpUrl:this.httpUrl}},
          () => {
          },
          () => {
          }
      );
    },
    toList() {
      this.$router.push(
          {path: "/start/todolist", query: {userid: this.userid,httpUrl:this.httpUrl}},
          () => {
          },
          () => {
          }
      );
    },
    update(){
      axios({
        url: this.httpUrl + "/task/get",
        method: "post",
        params: {
          userid: this.userid,
        },
      }).then((res) => {
        this.unfinished = res.data.data.unfinished;
        this.finished = res.data.data.finished;
        this.all = res.data.data.all;
        this.isExpire = res.data.data.isExpire;
      });
    },
    SearchForUser() {
      axios({
        url: this.httpUrl + "/blog/users",
        method: "post",
        params: {
          userid:this.userid,
          username: this.currentsearchinguser,
        },
      }).then((res) => {
        this.isFind = res.data.state;
        this.currentsearchinguser = "";
        if (this.isFind) {
          alert("成功关注用户" + this.currentsearchinguser + "！");
          axios({
            url: this.httpUrl + "/blog/get",
            method: "post",
            params: {
              userid: this.userid,
            },
          }).then((res) => {
            this.fans = res.data.data.fans;
            this.count = res.data.data.count;
            this.follow = res.data.data.follow;
          });
          this.reload();
        } else {
          alert("用户" + this.currentsearchinguser + "不存在，关注失败！");
        }
      });
    },
  },
  computed: {
    // 当前时间
    newTime() {
      return (
          this.year +
          "年" +
          this.month +
          "月" +
          this.date +
          "日 星期" +
          this.day +
          " " +
          this.time
      );
    },
  },
  beforeDestroy() {
    clearInterval(interval);
  },
  inject: ["reload"],
};
</script>

<style scoped>
body {
  background-color: rgb(245, 245, 245);
  height: 100%;
  width: 100%;
}

.myself-box {
  position: fixed;
  /* float: left; */
  top: 60px;
  height: 250px;
  width: 300px;
  border-radius: 5px;
  background-color: #ffffff;
  border: 1px solid rgb(211, 205, 205);
  z-index: 5;
}

.myself-name {
  margin: 10px auto;
  font-size: 20px;
  text-align: center;
}

.myself-data {
  float: left;
  height: 180px;
  width: 294px;
  padding: 10px;
}

.start-body {
  height: 100%;
  width: 100%;
  padding: 0 50px;
}

.home-icon {
  margin-bottom: 5px;
  margin-right: 5px;
}

.start-slogan {
  position: absolute;
  color: #fff;
  left: 40%;
}

.start-sum {
  padding: 10px;
}

.start-content {
  position: fixed;
  float: left;
  top: 313px;
  height: 400px;
  width: 300px;
  border-radius: 5px;
  background-color: #fff;
  border: 1px solid rgb(211, 205, 205);
  z-index: 5;
}

.start-timer {
  margin-top: 10px;
  width: 294px;
  height: 150px;
  padding: 20px;
}

.blog-text p {
  text-indent: 2em;
  float: left;
}
</style>