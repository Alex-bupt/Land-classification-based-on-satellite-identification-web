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
            <textarea
              class="form-control"
              rows="10"
              id="blog-content"
              name="text"
              placeholder="说些什么..."
              v-model="unfinishedblog"
            ></textarea>
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
export default {
  name: "Blog",
  data() {
    return {
      username: "",
      userid: "",
      blogs: [
        {
          "blog-author": "契诃夫",
          "blog-time": "3小时前",
          "blog-text": `<h3 style='text-align: center'>变色龙</h3>
          <p>
            警官奥丘梅洛夫穿着新的军大衣，手里拿着个小包，穿过市集的广场。他身后跟着个警察，生着棕红色头发，端着一个粗箩，上面盛着没收来的醋栗，装得满满的。四下里一片寂静……广场上连人影也没有。小铺和酒店敞开大门，无精打采地面对着上帝创造的这个世界，像是一张张饥饿的嘴巴。店门附近连一个乞丐都没有。
          </p>
          <p>
            “你竟敢咬人，该死的东西！”奥丘梅洛夫忽然听见说话声，“伙计们，别放走它！如今咬人可不行！抓住它！哎哟……哎哟！”
          </p>
          <p>
            狗的尖叫声响起来。奥丘梅洛夫往那边一看，瞧见商人皮丘金的木柴场里窜出来一条狗，用三条腿跑路，不住地回头看。在它身后，有一个人追出来，穿着浆硬的花布衬衫和敞开怀的坎肩。他紧追那条狗，身子往前一探，扑倒在地，抓住那条狗的后腿。紧跟着又传来狗叫声和人喊声：“别放走它！”带着睡意的脸纷纷从小铺里探出来，不久木柴场门口就聚了一群人，像是从地底下钻出来的一样。
          </p>
          <p>“仿佛出乱子了，长官！……”警察说。</p>
          <p>
            奥丘梅洛夫把身子微微往左边一转，迈步往人群那边走过去。在木柴场门口，他看见上述那个敞开坎肩的人站在那儿，举起右手，伸出一根血淋淋的手指头给那群人看。他那张半醉的脸上露出这样的神情：“我要揭你的皮，坏蛋！”而且那根手指头本身就像是一面胜利的旗帜。奥丘梅洛夫认出这个人就是首饰匠赫留金。闹出这场乱子的祸首是一条白毛小猎狗，尖尖的脸，背上有一块黄斑，这时候坐在人群中央的地上，前腿劈开，浑身发抖。它那含泪的眼睛里流露出苦恼和恐惧。
          </p>
          <p>
            “这儿出了什么事？”奥丘梅洛夫挤到人群中去，问道，“你在这儿干什么？你干吗竖起手指头？……是谁在嚷？”
          </p>
          <p>
            “我本来走我的路，长官，没招谁没惹谁……”赫留金凑着空拳头咳嗽，开口说，“我正跟米特里·米特里奇谈木柴的事，忽然间，这个坏东西无缘无故把我的手指头咬一口……请您原谅我，我是个干活的人……我的活儿细致。这得赔我一笔钱才成，因为我也许一个星期都不能动这根手指头了……法律上，长官，也没有这么一条，说是人受了畜生的害就该忍着……要是人人都遭狗咬，那还不如别在这个世界上活着的好……”
          </p>
          <p>
            “嗯！……好……”奥丘梅洛夫严厉地说，咳嗽着，动了动眉毛，“好……这是谁家的狗？这种事我不能放过不管。我要拿点颜色出来叫那些放出狗来闯祸的人看看！现在也该管管不愿意遵守法令的老爷们了！等到罚了款，他，这个混蛋，才会明白把狗和别的畜生放出来有什么下场！我要给他点厉害瞧瞧！……叶尔德林，”警官对警察说，“你去调查清楚这是谁家的狗，打个报告上来！这条狗得打死才成。不许拖延！这多半是条疯狗……我问你们：这是谁家的狗？”
          </p>
          <p>“这条狗像是日加洛夫将军家的！”人群里有个人说。</p>
          <p>
            “日加洛夫将军家的？嗯！……你，叶尔德林，把我身上的大衣脱下来……天好热！大概快要下雨了……只是有一件事我不懂：它怎么会咬你的？”奥丘梅洛夫对赫留金说，“难道它够得到你的手指头？它身子矮小，可是你，要知道，长得这么高大！你这个手指头多半是让小钉子扎破了，后来却异想天开，要人家赔你钱了。你这种人啊……谁都知道是个什么路数！我可知道你们这些魔鬼！”
          </p>
          <p>
            “他，长官，把他的雪茄烟戳到它脸上去，拿它开心。它呢，不肯做傻瓜，就咬了他一口……他是个无聊的人，长官！”
          </p>
          <p>
            “你胡说，独眼龙！你眼睛看不见，为什么胡说？长官是明白人，看得出来谁胡说，谁像当着上帝的面一样凭良心说话……我要胡说，就让调解法官[2]审判我好了。他的法律上写得明白……如今大家都平等了……不瞒您说……我弟弟就在当宪兵……”
          </p>
          <p>“少说废话！”</p>
          <p>
            “不，这条狗不是将军家的……”警察深思地说，“将军家里没有这样的狗。他家里的狗大半是大猎狗……”
          </p>
          <p>“你拿得准吗？”</p>
          <p>“拿得准，长官……”</p>
          <p>
            “我自己也知道。将军家里的狗都名贵，都是良种，这条狗呢，鬼才知道是什么东西！毛色不好，模样也不中看……完全是下贱货……他老人家会养这样的狗？！你的脑筋上哪儿去了？要是这样的狗在彼得堡或者莫斯科让人碰上，你们知道会怎样？那才不管什么法律不法律，一转眼的工夫就叫它断了气！你，赫留金，受了苦，这件事不能放过不管……得教训他们一下！是时候了……”
          </p>`,
        },
        {
          "blog-author": "宇航Official",
          "blog-time": "9小时前",
          "blog-text": `速蛙云好像跑路啦，推特上都在骂！`,
        },
        {
          "blog-author": "猪猪Official",
          "blog-time": "12小时前",
          "blog-text": `<p>
            照我自己想，虽然不是恶人，自从踹了古家的簿子，可就难说了。他们似乎别有心思，我全猜不出。况且他们一翻脸，便说人是恶人。我还记得大哥教我做论，无论怎样好人，翻他几句，他便打上几个圈；原谅坏人几句，他便说“翻天妙手，与众不同”。我那里猜得到他们的心思，究竟怎样；况且是要吃的时候。
          </p>
          <p>
            凡事总须研究，才会明白。古来时常吃人，我也还记得，可是不甚清楚。我翻开历史一查，这历史没有年代，歪歪斜斜的每页上都写着“仁义道德”几个字。我横竖睡不着，仔细看了半夜，才从字缝里看出字来，满本都写着两个字是“吃人”！
          </p>
          <p>书上写着这许多字，佃户说了这许多话，却都笑吟吟的睁着怪眼看我。</p>
          <p>我也是人，他们想要吃我了！</p>`,
        },
        {
          "blog-author": "棒，约翰！",
          "blog-time": "15小时前",
          "blog-text": `更好的馅料，更好的披萨！`,
        },
      ],
      unfinishedblog: "",
      isPublishOK: false,
    };
  },
  mounted() {
    this.userid = this.$route.query.userid;
    axios({
      url: "https://mock.presstime.cn/mock/62ef847099bc590021df133c/blog/get",
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
      this.axios
        .post(
          "https://mock.presstime.cn/mock/62ef847099bc590021df133c/blog/add",
          {
            userid: this.userid,
            content: this.unfinishedblog,
          }
        )
        .then((res) => {
          this.isPublishOK = res.data.state;
          if (this.isPublishOK) {
            alert("Blog发表成功！");
            this.unfinishedblog = "";
            axios
              .post(
                "https://mock.presstime.cn/mock/62ef847099bc590021df133c/blog/get",
                {
                  userid: this.userid,
                }
              )
              .then((res) => {
                this.blogs = res.data.data.blogs;
              });
            this.reload();
          } else {
            alert("Blog发表失败！");
          }
        });
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

.blog-text >>>p {
  text-indent: 2em;
}


</style>