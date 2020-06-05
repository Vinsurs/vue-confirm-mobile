<template>
  <div id="app">
    <div class="box">
      <v-confirm
        :visible.sync="visible"
        round
        shadow
        @cancel="cancel"
        @open="open"
        @close="close"
        @confirm="confirm"
        titleClassName="title"
        password
        password-required
        closeOnClickMask
      >
        <!-- <template slot="head">我是标题</template>
        <template slot="body">我是内容</template> -->
      </v-confirm>
    </div>
    <button @click="handleClick">
      open
    </button>
  </div>
</template>

<script>
// import Confirm from "./packages/VConfirm/Confirm";
export default {
  name: "App",
  components: {
    // Confirm
  },
  data() {
    return {
      visible: true
    };
  },
  methods: {
    close() {
      console.log("close");
    },
    open() {
      console.log("open");
    },
    cancel() {
      console.log("cancel");
    },
    confirm(pwd) {
      console.log("confirm", pwd);
    },
    handleClick() {
      this.visible = true;
      // this.$confirm({
      //   mask: true,
      //   shadow: true,
      //   title: "hello",
      //   content: "nihao",
      //   cancelText: "取消",
      //   confirmText: "确定",
      //   titleClassName: "title",
      //   round: true,
      //   password: true,
      //   passwordRequired: true,
      //   passwordPlaceholder: "密码",
      //   onCancel: () => {
      //     console.log(this.visible, "cancel");
      //   },
      //   onConfirm: pwd => {
      //     console.log(this.visible, "confirm", pwd);
      //   },
      //   closeOnClickMask: true
      // });
    }
  }
};
</script>

<style lang="scss">
html,
body {
  padding: 0;
  margin: 0;
}
#app {
  // height: 100vh;
  .box {
    width: 200px;
    height: 200px;
    background: pink;
    font-size: 30px;
  }
}
</style>
