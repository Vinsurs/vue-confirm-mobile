import ConfirmComponent from "./Confirm.vue";
import isType from "../../utils/checkType";
const Confirm = {};
Confirm.install = Vue => {
  let Confirm = Vue.extend(ConfirmComponent);
  let instance = new Confirm().$mount();
  document.body.appendChild(instance.$el);
  Vue.prototype.$confirm = (options = {}) => {
    instance.visible = true;
    let strOpt = [
      "title",
      "content",
      "cancelText",
      "confirmText",
      "titleClassName",
      "contentClassName",
      "footerClassName",
      "passwordPlaceholder"
    ];
    let bolOpt = [
      "mask",
      "round",
      "shadow",
      "password",
      "passwordRequired",
      "closeOnClickMask"
    ];
    strOpt.forEach(opt => {
      if (options[opt] && isType(options, opt, "string")) {
        instance[opt] = options[opt];
      }
    });
    bolOpt.forEach(opt => {
      if (options[opt] && isType(options, opt, "boolean")) {
        instance[opt] = options[opt];
      }
    });
    instance.handleConfirm = function() {
      instance.confirmTouched = true;
      if (instance.empty) return instance.$refs.pwdRef.focus();
      if (options.onConfirm && isType(options, "onConfirm", "function")) {
        options.onConfirm(instance.pwd);
      }
      instance.visible = false;
      instance.resetPwd();
    };

    instance.handleCancel = function() {
      if (options.onCancel && isType(options, "onCancel", "function")) {
        options.onCancel();
      }
      instance.visible = false;
      instance.resetPwd();
    };
  };
};
// support script tag import
if (typeof window !== "undefined" && window.Vue) {
  window.Vue.component(ConfirmComponent.name, ConfirmComponent);
}
export const VConfirm = ConfirmComponent;
export default Confirm;
