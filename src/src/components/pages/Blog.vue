<template>
  <div>
    <div class="blog-box">
      <div class="blog-content" v-for="blog in blogs" :key="blog.id">
        <div class="blog-author">{{ blog["blog-author"] }}</div>
        <div class="blog-time">{{ blog["blog-time"] }}</div>
        <div class="blog-text" v-html="blog['blog-text']"></div>
      </div>
    </div>

    <div class="container fixed-bottom">
      <button type="button" class="btn btn-primary col-md-4 offset-md-4" data-bs-toggle="modal"
              data-bs-target="#blogModal">
        写点blog
      </button>
    </div>
    <div class="modal fade" id="blogModal">
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <!-- 模态框头部 -->
          <div class="modal-header">
            <h4 class="modal-title">发表blog</h4>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>

          <!-- 模态框内容 -->
          <div class="modal-body">
            <label for="blog-content">请输入内容：</label>
            <textarea class="form-control" rows="10" id="blog-content" name="text" placeholder="说些什么..."
                      v-model="unfinishedblog"></textarea>
          </div>

          <!-- 模态框底部 -->
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">
              关闭
            </button>
            <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="PublishBlog">
              提交
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Blog",
  data() {
    return {
      username: "",
      userid: "",
      blogs: [],
      unfinishedblog: "",
      isPublishOK: false,
      httpUrl:''
    };
  },
  mounted() {
    this.httpUrl = this.$route.query.httpUrl;
    this.userid = this.$route.query.userid;
    axios({
      url: this.httpUrl + "/blog/get",
      method: "post",
      params: {
        userid: this.userid,
      },
    }).then((res) => {
      this.blogs = res.data.data.blogs;
    });
  },
  methods: {
    PublishBlog() {
      //this.username = this.$route.query.username;
      this.userid = this.$route.query.userid;
      axios({
        url: this.httpUrl + '/blog/add',
        method: 'post',
        params: {
          userid: this.userid,
          content: this.unfinishedblog
        }
      }).then((res) => {
        this.isPublishOK = res.data.state;
        if (this.isPublishOK) {
          alert("Blog发表成功！");
          this.unfinishedblog = "";
          axios({
            url: this.httpUrl + '/blog/get',
            method: 'post',
            params: {
              userid: this.userid,
            }
          }).then((res) => {
            this.blogs = res.data.data.blogs;
          })
          this.reload();
        } else {
          alert("Blog发表失败！");
        }
      })
    },
  },
  inject: ["reload"],
};
</script>

<style scoped>
.blog-box {
  position: relative;
  margin-top: 50px;
  margin-bottom: 60px;
  padding-left: 0;
  float: right;
  width: 900px;
}

.blog-content {
  float: left;
  margin: 20px 50px;
  background-color: #fff;
  width: 800px;
  height: auto;
  display: block;
  border-radius: 5px;
  border: 1px solid rgb(211, 205, 205);
}

.blog-author {
  color: rgb(251, 114, 153);
  /* float: left; */
  margin-left: 30px;
  margin-top: 20px;
  font: 20px bold;
}

.blog-time {
  margin-left: 30px;
  margin-top: 10px;
  float: left;
  display: block;
  color: rgb(168, 176, 183);
  font-size: 10px;
}

.blog-text {
  display: block;
  float: left;
  height: auto;
  font-size: 20px;
  margin-left: 50px;
  margin-top: 20px;
  margin-bottom: 30px;
  width: 660px;
  border-radius: 5px;
}

.blog-text>>>p {
  text-indent: 2em;
}
</style>