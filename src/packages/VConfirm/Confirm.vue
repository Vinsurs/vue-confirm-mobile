<template>
  <div
    :class="['v-confirm-mask', { mask: mask }]"
    v-show="visible"
    @click="handleMaskClick"
    ref="maskRef"
  >
    <div :class="['v-confirm-wrap', { round: round, shadow: shadow }]">
      <div :class="['v-confirm-head', titleClassName]">
        <slot name="head">{{ title }}</slot>
      </div>
      <div :class="['v-confirm-body', contentClassName]">
        <slot name="body">{{ content }}</slot>
        <div class="v-confirm-password" v-if="password">
          <input
            :class="['v-confirm-password__input', { required: empty }]"
            type="password"
            :placeholder="passwordPlaceholder"
            v-model="pwd"
            ref="pwdRef"
          />
        </div>
      </div>
      <div :class="['v-confirm-footer', footerClassName]">
        <div class="v-confirm-footer-btns">
          <div
            class="v-confirm-footer-btn v-confirm-footer-btn__cancel"
            @click="handleCancel"
          >
            {{ cancelText }}
          </div>
          <div
            class="v-confirm-footer-btn v-confirm-footer-btn__confirm"
            @click="handleConfirm"
          >
            {{ confirmText }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import "lib-flexible";
export default {
  name: "v-confirm",
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: "confirm"
    },
    content: {
      type: String,
      default: "Are you sure?"
    },
    cancelText: {
      type: String,
      default: "cancel"
    },
    confirmText: {
      type: String,
      default: "confirm"
    },
    mask: {
      type: Boolean,
      default: true
    },
    titleClassName: String,
    contentClassName: String,
    footerClassName: String,
    round: {
      type: Boolean,
      default: false
    },
    shadow: {
      type: Boolean,
      default: false
    },
    password: {
      type: Boolean,
      default: false
    },
    passwordRequired: {
      type: Boolean,
      default: true
    },
    passwordPlaceholder: {
      type: String,
      default: "Password"
    },
    closeOnClickMask: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      pwd: "",
      confirmTouched: false
    };
  },
  computed: {
    empty() {
      if (this.confirmTouched) {
        return this.passwordRequired && this.pwd === "";
      }
      return false;
    }
  },
  methods: {
    handleCancel() {
      this.$emit("cancel");
      this.$emit("update:visible");
      this.resetPwd();
    },
    handleConfirm() {
      this.confirmTouched = true;
      if (this.empty) return this.$refs.pwdRef.focus();
      this.$emit("confirm", this.pwd);
      this.$emit("update:visible");
      this.resetPwd();
    },
    resetPwd() {
      this.pwd = "";
      this.confirmTouched = false;
    },
    handleMaskClick(ev) {
      if (this.closeOnClickMask === true) {
        if (ev.target == this.$refs.maskRef) {
          this.handleCancel();
        }
      }
    }
  },
  watch: {
    visible(isVisible) {
      if (isVisible === true) {
        this.$emit("open", isVisible);
      } else {
        this.$emit("close", isVisible);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.v-confirm-mask {
  &.mask {
    position: fixed;
    z-index: 999999;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.3);
  }
  .v-confirm-wrap {
    width: 500px;
    background-color: #ffffff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 1px solid #c0c4cc;
    font-family: Arial, Helvetica, sans-serif;
    padding-top: 15px;
    display: flex;
    flex-direction: column;
    &.shadow {
      box-shadow: 0 0 38px rgba(0, 0, 0, 0.3);
    }
    &.round {
      border-radius: 20px;
    }
    .v-confirm-head {
      font-size: 48px;
      font-weight: 500;
      padding: 15px;
      border-bottom: 1px solid #c0c4cc;
      text-align: center;
    }
    .v-confirm-body {
      padding: 15px;
      font-size: 32px;
      min-height: 80px;
      text-align: center;
      .v-confirm-password {
        width: 100%;
        margin: 15px 0;
        box-sizing: border-box;
        .v-confirm-password__input {
          border: none;
          outline: none;
          appearance: none;
          background-color: #dcdfe6;
          border-radius: 15px;
          box-sizing: border-box;
          display: block;
          width: 100%;
          margin: 0;
          padding: 26px 10px;
          font-size: 32px;
          color: #409eff;
          text-shadow: 0px 0px 0px black;
          -webkit-text-fill-color: transparent;
          font-weight: bold;
          &.required {
            border: 1px solid red;
          }
        }
        ::-webkit-input-placeholder {
          color: rgba(0, 0, 0, 0.15);
          font-size: 32px;
          text-shadow: none;
          -webkit-text-fill-color: initial;
        }
      }
    }
    .v-confirm-footer {
      display: block;
      width: 100%;
      &::before {
        content: "";
        display: block;
        height: 1px;
        background-color: #c0c4cc;
        transform: scaleY(0.5);
      }
      .v-confirm-footer-btns {
        display: flex;
        .v-confirm-footer-btn {
          flex: 1;
          padding: 28px 0;
          font-size: 32px;
          font-weight: 300;
          display: flex;
          justify-content: center;
          align-items: center;
          appearance: none;
          cursor: pointer;
          &.v-confirm-footer-btn__cancel {
            color: #909399;
          }
          &.v-confirm-footer-btn__confirm {
            color: #409eff;
            position: relative;
            &::before {
              content: "";
              width: 1px;
              background-color: #c0c4cc;
              height: 100%;
              position: absolute;
              left: 0;
              transform: scaleX(0.5);
            }
          }
        }
      }
    }
  }
}
</style>
