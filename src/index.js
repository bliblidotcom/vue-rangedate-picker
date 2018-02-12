import plugin from '@/RangedatePicker.vue'

export default {
  install: function (Vue, options) {
    Vue.component(plugin.name, plugin)
  }
}
