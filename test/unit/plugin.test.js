import Vue from 'vue'
import RangedatePicker from '@/RangedatePicker.vue'

describe('RangedatePicker', () => {
  let vm

  beforeEach(() => {
    vm = new (Vue.extend(RangedatePicker))({
      propsData: {
        image: '/abc.jpg'
      }
    })
    vm.$mount()
  })
})
