<template>
  <div>
    <div class="blog-box">
      <div
        class="blog-content"
        v-for="blog in this.blogs"
        :key="blog['blogId']"
      >
        <div class="blog-author">{{ blog["username"] }}</div>
        <div class="blog-time">
          {{ timestampToTime(blog["postTime"] * 1000) }}
        </div>
        <div class="btn-group blog-manage" v-if="isMe(blog[`username`])">
          <button
            type="button"
            class="btn btn-primary dropdown-toggle"
            data-bs-toggle="dropdown"
          >
            管理
          </button>
          <div class="dropdown-menu">
            <a class="dropdown-item" @click="deleteBlog(blog['blogId'])"
              >删除</a
            >
          </div>
        </div>
        <VueMarkdown :source="blog['context']" class="blog-text"></VueMarkdown>
      </div>
    </div>

    <div class="container fixed-bottom">
      <button
        type="button"
        class="btn btn-primary col-md-4 offset-md-4"
        data-bs-toggle="modal"
        data-bs-target="#blogModal"
      >
        写点blog
      </button>
    </div>
    <div class="modal fade" id="blogModal">
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <!-- 模态框头部 -->
          <div class="modal-header">
            <h4 class="modal-title">发表blog</h4>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>

          <!-- 模态框内容 -->
          <div class="modal-body">
            <label for="blog-content">请输入内容：</label>
            <mavon-editor
              :ishljs="true"
              ref="md"
              v-model="blogContent"
              @imgAdd="$imgAdd"
              @imgDel="$imgDel"
            />
          </div>

          <!-- 模态框底部 -->
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-danger"
              data-bs-dismiss="modal"
            >
              关闭
            </button>
            <button
              type="button"
              class="btn btn-primary"
              data-bs-dismiss="modal"
              @click="PublishBlog"
            >
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
import VueMarkdown from "vue-markdown";
export default {
  components: {
    VueMarkdown,
  },
  name: "Blog",
  data() {
    return {
      username: "",
      userid: "",
      //blogs: [],
      img_file: [],
      blogContent: "",
      isPublishOK: false,
      httpUrl: "",
    };
  },
  mounted() {
    this.httpUrl = this.$route.query.httpUrl;
    this.userid = this.$route.query.userid;
    this.username = this.$route.query.username;
    this.getDataFreshed();
  },
  computed: {
    blogs() {
      return this.$store.state.blogs;
    },
  },
  methods: {
    getDataFreshed() {
      axios({
        url: this.httpUrl + "/blog/get",
        method: "post",
        params: {
          userid: this.userid,
        },
      }).then((res) => {
        this.$store.dispatch("updateBlogs", res.data.data.blogs);
        function sortBy(props) {
          return function (a, b) {
            return -(a[props] - b[props]);
          };
        }
        this.blogs.sort(sortBy("postTime"));
        this.$store.dispatch("updateFans", res.data.data.fans);
        this.$store.dispatch("updateCount", res.data.data.count);
        this.$store.dispatch("updateFollow", res.data.data.follow);
      });
    },
    isMe(username) {
      return username == sessionStorage.getItem("userName");
    },
    PublishBlog() {
      this.username = this.$route.query.username;
      this.userid = this.$route.query.userid;
      axios({
        url: this.httpUrl + "/blog/add",
        method: "post",
        params: {
          userid: this.userid,
          context: this.$refs.md.d_render,
        },
      }).then((res) => {
        this.isPublishOK = res.data.state;
        console.log(this.$refs.md.d_render);
        if (this.isPublishOK) {
          alert("Blog发表成功！");
          this.getDataFreshed();
          this.blogContent = "";
        } else {
          alert("Blog发表失败！");
        }
      });
    },
    timestampToTime(timestamp) {
      timestamp = timestamp ? timestamp : null;
      let date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      let Y = date.getFullYear() + "-";
      let M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      let D =
        (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
      let h =
        (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
      let m =
        (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) +
        ":";
      let s =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      return Y + M + D + h + m + s;
    },
    deleteBlog(blogId) {
      console.log(blogId);
      axios({
        url: this.httpUrl + "/blog/delete",
        method: "post",
        params: {
          blogId: blogId,
        },
      }).then((res) => {
        if (res.data.state) {
          alert("删除成功！");
          this.getDataFreshed();
        } else {
          alert("删除失败！");
        }
      });
    },
    $imgAdd(pos, $file) {
      // 第一步.将图片上传到服务器.
      var image = new FormData();
      image.append("image", $file);
      this.img_file[pos] = $file;
      axios
        .post(this.httpUrl + "/file/upload", image, {
          "Content-type": "multipart/form-data",
        })
        .then((res) => {
          let _res = res.data.data;
          //第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
          console.log(this.$refs);
          this.$refs.md.$img2Url(pos, _res["url"]);
        });
    },
    $imgDel(pos) {
      delete this.img_file[pos];
      console.log("delete");
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

.blog-manage {
  float: right;
  margin-right: 30px;
  margin-top: -20px;
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

.blog-text >>> img {
  width: 100%;
  height: auto;
}
</style>