const filters = {
  // 首字母大写
  capitalize(str) {
    if (!str || typeof str !== "string") return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  },
  // 时间戳格式化日期
  timestampFormat(time) {
    if (!time) return "--";
    const date = new Date(+time + 8 * 3600 * 1000);
    return date
      .toJSON()
      .substr(0, 19)
      .replace("T", " ")
      .replace(/-/g, "/");
  },
  // 数字保留两位小数
  decimal(num) {
    num = String(num);
    const index = num.indexOf(".");
    return num.slice(0, index + 3);
  },
  // 数字金额格式化, 每三位加','
  toThousandslsFilter(num) {
    return (+num || 0)
      .toString()
      .replace(/^-?\d+/g, (m) => m.replace(/(?=(?!\b)(\d{3})+$)/g, ","));
  },
  // 电话号码脱敏
  encryptPhone(phone) {
    if (!phone) return "";
    phone = String(phone);
    return phone.replace(/(\d{3})\d*(\d{4})/, "$1****$2");
  },
  // 姓名脱敏
  encryptName(name) {
    if (!name) return "";
    return name.replace(
      /([\u4e00-\u9fa5]{1})([\u4e00-\u9fa5]*)$/,
      "$1" + "*".repeat(name.length - 1)
    );
  },
  // 邮箱脱敏
  encryptEmail(email) {
    if (!email) return "";
    let main = email.indexOf("@");
    return email.replace(/(\w+)@(\w+)\.com/, "*".repeat(main) + "@$2.com");
  },
};

export default {
  install(Vue) {
    Vue.mixin({
      filters,
    });
  },
};
