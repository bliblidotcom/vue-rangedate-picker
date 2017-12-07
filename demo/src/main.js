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
      },
      date3: {
        start: '',
        end: ''
      }
    }
  },
  methods: {
    date1Selected: function (daterange) {
      this.date1 = daterange
    },
    date2Selected: function (daterange) {
      this.date2 = daterange
    },
    date3Selected: function (daterange) {
      this.date3 = daterange
    }
  },
  components: {
    VueRangedatePicker
  }
})
