<template>
  <div>
    <nav class="navbar navbar-expand-lg bg-primary navbar-dark">
      <div class="container">
        <a href="#" class="navbar-brand"><i><img class="home-icon" src="../../assets/edit.png"></i> TodoList</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navmenu">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navmenu">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item ms-4">
              <div class="nav-link">简单</div>
            </li>
            <li class="nav-item ms-4">
              <div class="nav-link">高效</div>
            </li>
            <li class="nav-item ms-4">
              <div class="nav-link">实用</div>
            </li>
          </ul>
        </div>
      </div>
    </nav>


    <div class="home position-relative">
      <div class="start-div">
        <h3 class="home-start">你的下一款TodoList 又何必只是TodoList</h3>
      </div>
      <button type="button" class="home-btn2 btn btn-outline-warning" data-bs-toggle="modal"
              data-bs-target="#mylogin">
        还没有账号？点击注册
      </button>
      <br>
      <button type="button" class="home-btn btn btn-success " data-bs-toggle="modal" data-bs-target="#myRegister">
        立 即 登 录
      </button>
    </div>

    <!-- 注册界面 -->
    <div id="mylogin" class="login modal fade" style="width:600px;height:650px;background-color:#FFFFFF;">
      <div class="modal-dialog">
        <form class="was-validated">
          <div class="modal-content">
            <div class="login-title " style="width: 100%;height: 50px;">
              <span class="login-span ">账号注册</span>
              <button type="button" class="login-close" data-bs-dismiss="modal" title="关闭"></button>
            </div>

            <div class="login-content" style="width: 100%;height: 450px;">
              <!-- 输入框 -->
              <div class="login-container">
                <div class="form-floating mb-3 mt-3">

                  <input type="text" class="form-control" id="username" placeholder="请输入用户名"
                         name="username" v-model="usernameReg" required>
                  <label for="username" class="form-label"><span class="loginred">*</span>用户名：</label>
                  <div class="valid-feedback">有效</div>
                  <div class="invalid-feedback">请填写此字段</div>
                </div>
                <div class="mb-3 form-floating">

                  <input type="password" class="form-control" id="pwd" placeholder="请输入密码" name="pswd"
                         v-model="passwordReg"
                         required>
                  <label for="pwd" class="form-label"><span class="loginred">*</span>密码：</label>
                  <div class="valid-feedback">有效的。</div>
                  <div class="invalid-feedback">请填写此字段。</div>
                </div>
                <div class="mb-3 mt-3 form-floating">

                  <input type="email" class="form-control" id="email" placeholder="请输入电子邮件地址" name="email"
                         v-model="email"
                         required>
                  <label for="email" class="form-label"><span class="loginred">*</span>电子邮件：</label>
                  <div class="valid-feedback">有效</div>
                  <div class="invalid-feedback">请正确填写此字段</div>
                </div>
              </div>
            </div>
            <!-- 表单提交 -->
            <div class="login-footer" style="width: 100%;height: 50px;position: relative;">
              <button type="button" class="btn btn-primary m-auto login-btn" @click="register"
                      @keydown.enter="register">注册你的账号
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>

    <!-- 登录界面 -->
    <div id="myRegister" class="login modal fade" style="width:600px;height:650px;background-color:#FFFFFF;">
      <div class="modal-dialog">
        <form class="was-validated">
          <div class="modal-content">
            <div class="login-title " style="width: 100%;height: 50px;">
              <span class="login-span ">账号登录</span>
              <button class="login-close" data-bs-dismiss="modal" title="关闭"></button>
            </div>

            <div class="login-content" style="width: 100%;height: 450px;">
              <!-- 输入框 -->
              <div class="login-container">
                <div class="form-floating mb-3 mt-3">
                  <input type="text" class="form-control" id="username" placeholder="请输入用户名"
                         v-model="usernameLogin"
                         name="username" required>
                  <label for="username">用户名：</label>
                  <div class="valid-feedback">有效</div>
                  <div class="invalid-feedback">请填写用户名</div>
                </div>
                <div class="form-floating mb-3">
                  <input type="password" class="form-control" id="pwd" placeholder="请输入密码" name="pswd"
                         v-model="passwordLogin"
                         required>
                  <label for="pwd">密码：</label>
                  <div class="valid-feedback">有效</div>
                  <div class="invalid-feedback">密码未输入或有误</div>
                </div>
              </div>
            </div>
            <!-- 表单提交 -->
            <div class="login-footer" style="width: 100%;height: 50px;position: relative;">
              <button type="button" class="btn btn-primary m-auto login-btn" @click="login" @keydown.enter="login">
                登录
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Home",
  data() {
    return {
      userid: '',
      usernameLogin: '',
      passwordLogin: '',
      usernameReg: '',
      passwordReg: '',
      readyLogin: false,
      readyReg: false,
      email: '',
      httpUrl:'http://575nrs.natappfree.cc'
    }
  },
  methods: {
    login() {
      axios({
        url: this.httpUrl + '/user/login',
        method: 'post',
        params: {
          username: this.usernameLogin,
          password: this.passwordLogin
        }
      }).then(res => {
        this.readyLogin = res.data.state
        this.userid = res.data.data.userid
        if (this.readyLogin) {
          sessionStorage.setItem("userName",this.usernameLogin)
          this.$router.push({path: "/start", query: {username: this.usernameLogin, userid: this.userid, httpUrl:this.httpUrl}}, () => {
          }, () => {
          })
        } else {
          window.alert("登陆失败，请检查用户名或密码")
        }
      })
    },
    register() {
      axios({
        url: this.httpUrl + '/user/register',
        method: 'post',
        params: {
          username: this.usernameReg,
          password: this.passwordReg,
          email: this.email
        }
      }).then(res => {
        this.readyReg = res.data.state
        if (this.readyReg) {
          window.alert("注册成功！")
        } else {
          window.alert("注册失败，用户名重复")
        }
      })
    }
  }
}
</script>

<style lang="css" scoped>
.home {
  height: 673px;
  width: 100%;
  background-image: url("../../assets/home.jpg");
  background-repeat: no-repeat;
  background-position: center;
  margin: auto 0;
  text-align: center;
}

.start-div {
  position: absolute;
  top: 25%;
  left: 180px;
}

.home-start {
  display: block;
  color: white;
  margin-left: 120px;
  font-size: 50px;
  line-height: 100px;
  font-weight: 600;
  font-family: "Microsoft YaHei";
}

.home-btn2 {
  position: relative;
  width: 200px;
  top: 60%;
  font-size: 17px;
}

.home-btn {
  position: relative;
  width: 260px;
  top: 65%;
}

.home-icon {
  margin-bottom: 5px;
  margin-right: 5px;
}

/* login css */
.login {
  position: fixed;
  border: #ebebeb solid 1px;
  left: 50%;
  top: 50%;
  background: #ffffff;
  box-shadow: 0px 0px 20px #ddd;
  z-index: 9999;
  transform: translate(-50%, -50%);
  border-radius: 20px;
}

.login-btn {
  width: 200px;
  left: 150px;
  position: absolute;
}

.login-title {
  position: relative;
}

.login-span {
  font-size: 20px;
  left: 10%;
  position: absolute;
  top: 20px;
}

.login-container {
  padding-top: 50px;
  padding-left: 50px;
  padding-right: 50px;
}

.login-close {
  border: 0;
  background-color: #FFF;
  position: absolute;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  right: 20px;
  top: 15px;
  background-image: url("../../assets/close.png");
  background-position: 50% 50%;
}

.login-close:hover {
  background-color: rgb(224, 224, 224);
}

.loginred {
  color: red;
  font-size: 14px;
}
</style>