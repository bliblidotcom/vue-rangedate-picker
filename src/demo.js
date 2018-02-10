// /** Lines below are already loaded in /test/helpers/entry.js
// import Vue from 'vue'
// import plugin from './index'
// import 'babel-polyfill' // promise and etc ...
//
// Vue.config.productionTip = false
// Vue.use(plugin)
//
// window.Vue = Vue
// Vue.config.debug = true
// */

import RangedatePicker from './RangedatePicker.vue'

new window.Vue({
  el: 'app',
  template: `<div id="demo">
<div>
<strong>Full form</strong>
<rangedate-picker></rangedate-picker>
</div>
<div style="height: 300px">
<strong>Compact (mobile)</strong>
<rangedate-picker compact="true"></rangedate-picker>
</div>
</div>`,
  components: { RangedatePicker }
})
