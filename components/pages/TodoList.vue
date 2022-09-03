<template>
  <div>
    <div class="start-todos start-show">
      <div class="todo-container">
        <div class="todo-wrap">
          <div class="todo-header">
            <!-- 输入栏 -->
            <form class="d-flex">
              <input ref="add" class="todo-input form-control me-2" type="text" placeholder="在此输入需要添加的事务">
              <button class="btn btn-primary" type="button" @click="addItem" @keydown.enter="addItem">Add</button>
            </form>
          </div>

          <!-- 事务列表 -->
          <div id="accordion" class="mt-3">
            <div class="card" v-for="task in tasks">
              <div class="card-header">
                <input type="checkbox" class="form-check-input start-box" v-model="task.finish"/>
                <a class="btn ms-2" data-bs-toggle="collapse" :href="['#task'+task.taskId]">
                  {{ task.taskName }}
                </a>
                <select class="form-select d-sm-inline ms-2" v-model="task.deadline" style="width: 120px;">
                  <option value="">截止时间</option>
                  <option value=0>0:00</option>
                  <option value=1>1:00</option>
                  <option value=2>2:00</option>
                  <option value=3>3:00</option>
                  <option value=4>4:00</option>
                  <option value=5>5:00</option>
                  <option value=6>6:00</option>
                  <option value=7>7:00</option>
                  <option value=8>8:00</option>
                  <option value=9>9:00</option>
                  <option value=10>10:00</option>
                  <option value=11>11:00</option>
                  <option value=12>12:00</option>
                  <option value=13>13:00</option>
                  <option value=14>14:00</option>
                  <option value=15>15:00</option>
                  <option value=16>16:00</option>
                  <option value=17>17:00</option>
                  <option value=18>18:00</option>
                  <option value=19>19:00</option>
                  <option value=20>20:00</option>
                  <option value=21>21:00</option>
                  <option value=22>22:00</option>
                  <option value=23>23:00</option>
                </select>
                <button class="btn-todo btn-danger float-end mt-1" @click="deleteItem(task.taskId)">删除</button>
              </div>
              <div :id="['task'+task.taskId]" class="collapse" data-bs-parent="#accordion">
                <div class="card-body">
                  <label for="comment" class="mt-1"> 备注(仅限一行)</label>
                  <button type="submit" class="btn btn-primary float-end mb-3" @click="addInfo(task)">所有信息提交
                  </button>
                  <textarea class="form-control" rows="1" id="comment" name="text" v-model="task.description">{{task.description}}</textarea>
                </div>
              </div>
            </div>

          </div>
          <div class="todo-footer mt-3">
            <span class="text-warning" style="font-size: 15px;">点击事务来添加备注!</span>
            <button class="btn-todo btn-danger" @click="deleteFinished">清除已完成任务</button>
          </div>
        </div>
      </div>
    </div>
      <img class="start-img" src="../../assets/bgp.png">
    <div class="start-help fixed-bottom">
      <p style="line-height: 5px;text-align: center;color:orange;">tips:使用TodoList功能做你的备忘录，马上添加你的第一个事务吧！</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "TodoList",
  data() {
    return {
      userid: '',
      httpUrl: '',
      tasks: []
    }
  },
  mounted() {
    this.httpUrl = this.$route.query.httpUrl
    this.userid = this.$route.query.userid
    axios({
      url: this.httpUrl + '/task/get',
      method: 'post',
      params: {
        userid: this.userid
      }
    }).then(res => {
      this.tasks = res.data.data.tasks
    })
  },
  methods: {
    deleteItem(num) {
      axios({
        url: this.httpUrl + '/task/delete',
        method: 'post',
        params: {
          userid: this.userid,
          taskid: num
        }
      }).then(res => {
        this.tasks = res.data.data.tasks
      })
    },
    addItem() {
      let vm = this
      let msg = this.$refs.add.value
      if (msg === '') {
      } else {
        axios({
          url: this.httpUrl + '/task/add',
          method: 'post',
          params: {
            userid: this.userid,
            task_name: msg
          }
        }).then(res => {
          console.log(this)
          this.tasks = res.data.data.tasks
          this.$refs.add.value = ""
        })
      }
    },
    deleteFinished() {
      let array = []
      let sum = 0
      this.tasks.forEach((task) => {
        if (task.finish) {
          array.push(task.taskId)
          sum++
        }
      })
      let vm = this
      let str = encodeURI(array)
      window.alert(str)
      axios({
        url: this.httpUrl + '/task/deleteall',
        method: 'get',
        params: {
          userid: this.userid,
          taskid: str
        }
      }).then(res => {
        this.tasks = res.data.data.tasks
      })
      // for(let i = 0;i<sum;i++){
      //   window.alert(i)
      //   axios({
      //     url: this.httpUrl + '/task/delete',
      //     method: 'post',
      //     params: {
      //       userid: this.userid,
      //       taskid: array[i]
      //     }
      //   }).then(res => {
      //     this.tasks = res.data.data.tasks
      //   })
      // }
    },
    addInfo(task) {
      let vm = this
      axios({
        url: this.httpUrl + '/task/update',
        method: 'post',
        params: {
          userid: this.userid,
          taskid: task.taskId,
          description: task.description,
          deadline: task.deadline,
          finish: task.finish
        }
      }).then(res => {
        this.tasks = res.data.data.tasks
      })
    }
  }
}
</script>

<style scoped>
.start-img{
  position: absolute;
  left:50%;
  top:40%;
  z-index:-1;
}

.todo-footer {
  height: 40px;
  line-height: 40px;
  padding-left: 6px;
  margin-top: 5px;
}

.todo-footer button {
  float: right;
  margin-top: 5px;
  box-shadow: 0px 0px 3px red;
}

.todo-header input {
  width: 560px;
  height: 38px;
  font-size: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 4px 7px;
}

.todo-header input:focus {
  outline: none;
  border-color: rgba(82, 168, 236, 0.8);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(82, 168, 236, 0.6);
}

.btn-todo {
  display: inline-block;
  padding: 4px 12px;
  margin-bottom: 0;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  box-shadow: inset 0 1px 0 rgb(255, 255, 255, 0.2), 0 1px 2px rgb(0, 0, 0, 0.05);
  border-radius: 4px;
}

.btn-danger {
  color: #ffffff;
  background-color: #da4f49;
  border: 1px solid #bd362f;
}

.btn-danger:hover {
  color: #ffffff;
  background-color: #bd362f;
}

.btn-todo:focus {
  outline: none;
}

.todo-container {
  width: 600px;
  margin: 0 auto;
}

.todo-container .todo-wrap {
  padding: 20px;
  border: 3px solid #000;
  border-radius: 10px;
  background-color: #FFF;
}

.start-box {
  margin-top: 10px;
}

.start-todos {
  position: absolute;
  top: 10%;
  left: 30%;
  width: 900px;
  background-color: #FFF;
  padding: 35px;
  z-index: 3;
}

.start-help{
  position: absolute;
  width: 600px;
  height: 40px;
  background-color: #FFF;
  padding: 15px;
  left: 39%;
  bottom: 2%;
  z-index: 3;
  border-radius: 10px;
  border: 3px solid black;
}

@media screen and (max-width: 1300px) {
  .start-show {
    display: none;
  }
}
</style>