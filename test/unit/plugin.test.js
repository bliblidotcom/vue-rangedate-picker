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

  describe('image', () => {
    it('should be /abc.jpg', () => {
      assert(vm.image === '/abc.jpg', 'You should be implemented!!')
    })
  })
})

