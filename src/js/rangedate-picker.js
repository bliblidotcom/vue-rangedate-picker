const defaultConfig = {}
const defaultI18n = 'EN'
const availableMonths = {
  EN: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November',
    'December']
}

const availableShortDays = {
  EN: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
}

const defaultCaptions = {
  'title': 'Choose Dates',
  'ok_button': 'Apply'
}

const defaultStyle = {
  daysName: 'root__daysName',
  days: 'root__days',
  daysSelected: 'root__days__selected',
  daysInRange: 'root__days__in-range',
  firstDate: 'root_first-date',
  secondDate: 'root_second-date',
  presetRanges: 'root__preset-ranges'
}

const defaultPresets = {
  today: function () {
    const n = new Date()
    const today = new Date(n.getFullYear(), n.getMonth(), n.getDate())
    return {
      label: 'Today',
      dateRange: {
        start: today,
        end: today
      }
    }
  },
  thisMonth: function () {
    const n = new Date()
    const startMonth = new Date(n.getFullYear(), n.getMonth(), 1)
    const endMonth = new Date(n.getFullYear(), n.getMonth() + 1, 0)
    return {
      label: 'This Month',
      dateRange: {
        start: startMonth,
        end: endMonth
      }
    }
  },
  lastMonth: function () {
    const n = new Date()
    const startMonth = new Date(n.getFullYear(), n.getMonth() - 1, 1)
    const endMonth = new Date(n.getFullYear(), n.getMonth(), 0)
    return {
      label: 'Last Month',
      dateRange: {
        start: startMonth,
        end: endMonth
      }
    }
  },
  last7days: function () {
    const n = new Date()
    const start = new Date(n.getFullYear(), n.getMonth(), n.getDate() - 7)
    const end = new Date(n.getFullYear(), n.getMonth(), n.getDate())
    return {
      label: 'Last 7 Days',
      dateRange: {
        start: start,
        end: end
      }
    }
  },
  last30days: function () {
    const n = new Date()
    const start = new Date(n.getFullYear(), n.getMonth(), n.getDate() - 30)
    const end = new Date(n.getFullYear(), n.getMonth(), n.getDate())
    return {
      label: 'Last 30 Days',
      dateRange: {
        start: start,
        end: end
      }
    }
  }
}

export default {
  props: {
    configs: {
      type: Object,
      default: () => defaultConfig
    },
    i18n: {
      type: String,
      default: defaultI18n
    },
    months: {
      type: Array,
      default: () => availableMonths[defaultI18n]
    },
    shortDays: {
      type: Array,
      default: () => availableShortDays[defaultI18n]
    },
    // options for captions are: title, ok_button
    captions: {
      type: Object,
      default: () => defaultCaptions
    },
    format: {
      type: String,
      default: 'dd MMM YYYY'
    },
    styles: {
      type: Object,
      default: () => {}
    },
    initRange: {
      type: Object,
      default: null
    },
    startActiveMonth: {
      type: Number,
      default: new Date().getMonth()
    },
    startActiveYear: {
      type: Number,
      default: new Date().getFullYear()
    },
    presetRanges: {
      type: Object,
      default: () => defaultPresets
    }
  },
  data () {
    return {
      dateRange: {},
      numOfDays: 7,
      isFirstChoice: true
    }
  },
  created () {
    this.range = this.initRange || null
  },
  computed: {
    s: function () {
      return Object.assign({}, defaultStyle, this.style)
    },
    startMonthDay: function () {
      return new Date(this.startActiveYear, this.startActiveMonth, 1).getDay()
    },
    startNextMonthDay: function () {
      return new Date(this.startActiveYear, this.startNextActiveMonth, 1).getDay()
    },
    endMonthDate: function () {
      return new Date(this.startActiveYear, this.startNextActiveMonth, 0).getDate()
    },
    endNextMonthDate: function () {
      return new Date(this.startActiveYear, this.startActiveMonth + 2, 0).getDate()
    },
    startNextActiveMonth: function () {
      return this.startActiveMonth + 1
    },
    finalPresetRanges: function () {
      const tmp = {}
      for (const i in this.presetRanges) {
        const item = this.presetRanges[i]
        let plainItem = item
        if (typeof item === 'function') {
          plainItem = item()
        }
        tmp[i] = plainItem
      }
      return tmp
    }
  },
  methods: {
    getDayIndexInMonth: function (r, i, startMonthDay) {
      const date = (this.numOfDays * (r - 1)) + i
      return date - startMonthDay
    },
    getDayCell (r, i, startMonthDay, endMonthDate) {
      const result = this.getDayIndexInMonth(r, i, startMonthDay)
      // bound by > 0 and < last day of month
      return result > 0 && result <= endMonthDate ? result : '&nbsp;'
    },
    getNewDateRange (result, activeMonth) {
      const newData = {}
      let key = 'start'
      if (!this.isFirstChoice) {
        key = 'end'
      } else {
        newData['end'] = null
      }
      const resultDate = new Date(this.startActiveYear, activeMonth, result)
      if (!this.isFirstChoice && resultDate < this.dateRange.start) {
        this.isFirstChoice = false
        return { start: resultDate }
      }

      // toggle first choice
      this.isFirstChoice = !this.isFirstChoice
      newData[key] = resultDate
      return newData
    },
    selectFirstItem (r, i) {
      const result = this.getDayIndexInMonth(r, i, this.startMonthDay) + 1
      this.dateRange = Object.assign({}, this.dateRange, this.getNewDateRange(result, this.startActiveMonth))
    },
    selectSecondItem (r, i) {
      const result = this.getDayIndexInMonth(r, i, this.startNextMonthDay) + 1
      this.dateRange = Object.assign({}, this.dateRange, this.getNewDateRange(result, this.startNextActiveMonth))
    },
    isDateSelected (r, i, key, startMonthDay) {
      const result = this.getDayIndexInMonth(r, i, startMonthDay) + 1
      let currDate = null
      if (key === 'first') {
        currDate = new Date(this.startActiveYear, this.startActiveMonth, result)
      } else {
        currDate = new Date(this.startActiveYear, this.startNextActiveMonth, result)
      }
      return (this.dateRange.start && this.dateRange.start.getTime() === currDate.getTime()) ||
        (this.dateRange.end && this.dateRange.end.getTime() === currDate.getTime())
    },
    isDateInRange (r, i, key, startMonthDay) {
      const result = this.getDayIndexInMonth(r, i, startMonthDay) + 1
      let currDate = null
      if (key === 'first') {
        currDate = new Date(this.startActiveYear, this.startActiveMonth, result)
      } else {
        currDate = new Date(this.startActiveYear, this.startNextActiveMonth, result)
      }
      return (this.dateRange.start && this.dateRange.start.getTime() < currDate.getTime()) &&
        (this.dateRange.end && this.dateRange.end.getTime() > currDate.getTime())
    },
    goPrevMonth () {
      const prevMonth = new Date(this.startActiveYear, this.startActiveMonth, 0)
      this.startActiveMonth = prevMonth.getMonth()
      this.startActiveYear = prevMonth.getFullYear()
    },
    goNextMonth () {
      const nextMonth = new Date(this.startActiveYear, this.startNextActiveMonth, 1)
      this.startActiveMonth = nextMonth.getMonth()
      this.startActiveYear = nextMonth.getFullYear()
    },
    updatePreset (item) {
      this.dateRange = item.dateRange
      // update start active month
      this.startActiveMonth = this.dateRange.start.getMonth()
      this.startActiveYear = this.dateRange.start.getFullYear()
    }
  }
}
