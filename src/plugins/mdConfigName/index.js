import cssNameConfig from './cssNameConfig';
import javascriptNameConfig from './javascriptNameConfig';
import otherNameConfig from './otherNameConfig';
import reactNameConfig from './reactNameConfig';
import typescriptNameConfig from './typescriptNameConfig';
import vueNamecConfig from './vueNamecConfig';


export default {
  ...cssNameConfig,
  ...javascriptNameConfig,
  ...otherNameConfig,
  ...reactNameConfig,
  ...typescriptNameConfig,
  ...vueNamecConfig
}
const el = {}
var left = el.offsetLeft,
  top = el.offsetTop,
  style = el.style;
for (let i = 0; i < 10; i++) {
  left += 10;
  top += 10;
  style.left = left + "px";
  style.top = top + "px";
}
for (let i = 0; i < 10; i++) {
  el.style.left = el.offsetLeft + 5 + "px";
  el.style.top = el.offsetTop + 5 + "px";
}