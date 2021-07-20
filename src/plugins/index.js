/**
 *
 * 自动化导入plugins
 *
 */

const pluginContext = require.context("./", false, /\.js$/);
const pluginArr = [];
pluginContext.keys().forEach((path) => {
  if (path.includes("index.js") || path.includes("element.js")) return;
  pluginArr.push(pluginContext(path).default);
});
export default pluginArr;
