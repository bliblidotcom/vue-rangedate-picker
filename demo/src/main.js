var app = new Vue({
  el: '#app',
  data () {
    return {
      date1: {
        start: '',
        end: ''
      },
      date2: {
        start: '',
        end: ''
      }
    }
  },
  methods: {
    date1Selected: function (a) {
      this.date1.start = a.start
      this.date1.end = a.end
    },
    date2Selected: function (a) {
      this.date2.start = a.start
      this.date2.end = a.end
    }
  },
  components: {
    VueRangedatePicker
  }
})
