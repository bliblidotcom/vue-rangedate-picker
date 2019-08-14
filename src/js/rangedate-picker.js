import fecha from 'fecha'

const defaultConfig = {}
const defaultI18n = 'ID'
const availableMonths = {
  EN: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November',
    'December'],
  ID: ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November',
    'Desember']
}

const availableShortDays = {
  EN: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  ID: ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab']
}

const presetRangeLabel = {
  EN: {
    today: 'Today',
    thisMonth: 'This Month',
    lastMonth: 'Last Month',
    lastSevenSays: 'Last 7 Days',
    lastThirtyDays: 'Last 30 Days'
  },
  ID: {
    today: 'Hari ini',
    thisMonth: 'Bulan ini',
    lastMonth: 'Bulan lalu',
    lastSevenDays: '7 Hari Terakhir',
    lastThirtyDays: '30 Hari Terakhir'
  }
}

const defaultCaptions = {
  'title': 'Choose Dates',
  'ok_button': 'Apply'
}

const defaultStyle = {
  daysWeeks: 'calendar_weeks',
  days: 'calendar_days',
  daysSelected: 'calendar_days_selected',
  daysInRange: 'calendar_days_in-range',
  firstDate: 'calendar_month_left',
  secondDate: 'calendar_month_right',
  presetRanges: 'calendar_preset-ranges',
  dateDisabled: 'calendar_days--disabled'
}

const defaultPresets = function (i18n = defaultI18n) {
  return {
    today: function () {
      const n = new Date()
      const today = new Date(Date.UTC(n.getFullYear(), n.getMonth(), n.getDate(), 0, 0))
      return {
        label: presetRangeLabel[i18n].today,
        active: false,
        dateRange: {
          start: today,
          end: today
        }
      }
    },
    thisMonth: function () {
      const n = new Date()
      const startMonth = new Date(Date.UTC(n.getFullYear(), n.getMonth(), 1))
      const endMonth = new Date(Date.UTC(n.getFullYear(), n.getMonth() + 1, 0))
      return {
        label: presetRangeLabel[i18n].thisMonth,
        active: false,
        dateRange: {
          start: startMonth,
          end: endMonth
        }
      }
    },
    lastMonth: function () {
      const n = new Date()
      const startMonth = new Date(Date.UTC(n.getFullYear(), n.getMonth() - 1, 1))
      const endMonth = new Date(Date.UTC(n.getFullYear(), n.getMonth(), 0))
      return {
        label: presetRangeLabel[i18n].lastMonth,
        active: false,
        dateRange: {
          start: startMonth,
          end: endMonth
        }
      }
    },
    last7days: function () {
      const n = new Date()
      const start = new Date(Date.UTC(n.getFullYear(), n.getMonth(), n.getDate() - 6))
      const end = new Date(Date.UTC(n.getFullYear(), n.getMonth(), n.getDate()))
      return {
        label: presetRangeLabel[i18n].lastSevenDays,
        active: false,
        dateRange: {
          start: start,
          end: end
        }
      }
    },
    last30days: function () {
      const n = new Date()
      const start = new Date(Date.UTC(n.getFullYear(), n.getMonth(), n.getDate() - 30))
      const end = new Date(Date.UTC(n.getFullYear(), n.getMonth(), n.getDate()))
      return {
        label: presetRangeLabel[i18n].lastThirtyDays,
        active: false,
        dateRange: {
          start: start,
          end: end
        }
      }
    }
  }
}

export default {
  name: 'vue-rangedate-picker',
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
      default: () => null
    },
    shortDays: {
      type: Array,
      default: () => null
    },
    // options for captions are: title, ok_button
    captions: {
      type: Object,
      default: () => defaultCaptions
    },
    format: {
      type: String,
      default: 'DD MMM YYYY'
    },
    styles: {
      type: Object,
      default: () => {
      }
    },
    initRange: {
      type: Object,
      default: () => null
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
      default: () => null
    },
    compact: {
      type: String,
      default: 'false'
    },
    righttoleft: {
      type: String,
      default: 'false'
    }
  },
  data () {
    const initRange = this.initRange ? this.initRange : {}
    if (initRange.star) {
      initRange.start.setHours(0)
      initRange.start.setMinutes(0)
      initRange.start.setSeconds(0)
    }
    if (initRange.end) {
      initRange.end.setHours(23)
      initRange.end.setMinutes(59)
      initRange.end.setSeconds(59)
    }
    return {
      dateRange: initRange,
      numOfDays: 7,
      isFirstChoice: true,
      isOpen: false,
      presetActive: '',
      showMonth: false,
      activeMonthStart: this.startActiveMonth,
      activeYearStart: this.startActiveYear,
      activeYearEnd: this.startActiveYear
    }
  },
  created () {
    if (this.isCompact) {
      this.isOpen = true
    }
    if (this.activeMonthStart === 11) this.activeYearEnd = this.activeYearStart + 1
  },
  watch: {
    startNextActiveMonth: function (value) {
      if (value === 0) this.activeYearEnd = this.activeYearStart + 1
    }
  },
  computed: {
    monthsLocale: function () {
      return this.months || availableMonths[this.i18n]
    },
    shortDaysLocale: function () {
      return this.shortDays || availableShortDays[this.i18n]
    },
    s: function () {
      return Object.assign({}, defaultStyle, this.style)
    },
    startMonthDay: function () {
      return new Date(Date.UTC(this.activeYearStart, this.activeMonthStart, 1)).getUTCDay()
    },
    startNextMonthDay: function () {
      return new Date(Date.UTC(this.activeYearStart, this.startNextActiveMonth, 1)).getUTCDay()
    },
    endMonthDate: function () {
      return new Date(Date.UTC(this.activeYearEnd, this.startNextActiveMonth, 0)).getUTCDate()
    },
    endNextMonthDate: function () {
      return new Date(Date.UTC(this.activeYearEnd, this.activeMonthStart + 2, 0)).getUTCDate()
    },
    startNextActiveMonth: function () {
      return this.activeMonthStart >= 11 ? 0 : this.activeMonthStart + 1
    },
    finalPresetRanges: function () {
      const tmp = {}
      const presets = this.presetRanges || defaultPresets(this.i18n)
      for (const i in presets) {
        const item = presets[i]
        let plainItem = item
        if (typeof item === 'function') {
          plainItem = item()
        }
        tmp[i] = plainItem
      }
      return tmp
    },
    isCompact: function () {
      return this.compact === 'true'
    },
    isRighttoLeft: function () {
      return this.righttoleft === 'true'
    }
  },
  methods: {
    toggleCalendar: function () {
      if (this.isCompact) {
        this.showMonth = !this.showMonth
        return
      }
      this.isOpen = !this.isOpen
      this.showMonth = !this.showMonth
      return
    },
    getDateString: function (date, format = this.format) {
      if (!date) {
        return null
      }
      const dateparse = new Date(Date.parse(date))
      return fecha.format(new Date(Date.UTC(dateparse.getFullYear(), dateparse.getMonth(), dateparse.getDate())), format)
    },
    getDayIndexInMonth: function (r, i, startMonthDay) {
      const date = (this.numOfDays * (r - 1)) + i
      return date - startMonthDay
    },
    getDayCell (r, i, startMonthDay, endMonthDate) {
      const result = this.getDayIndexInMonth(r, i, startMonthDay)
      // bound by > 0 and < last day of month
      return result > 0 && result <= endMonthDate ? result : '&nbsp;'
    },
    getNewDateRange (result, activeMonth, activeYear) {
      const newData = {}
      let key = 'start'
      if (!this.isFirstChoice) {
        key = 'end'
      } else {
        newData['end'] = null
      }
      const resultDate = new Date(Date.UTC(activeYear, activeMonth, result))
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
      const result = this.getDayIndexInMonth(r, i, this.startMonthDay)
      this.dateRange = Object.assign({}, this.dateRange, this.getNewDateRange(result, this.activeMonthStart,
        this.activeYearStart))
      if (this.dateRange.start && this.dateRange.end) {
        this.presetActive = ''
        this.$emit('setPreset', null)
        if (this.isCompact) {
          this.showMonth = false
        }
      }
    },
    selectSecondItem (r, i) {
      const result = this.getDayIndexInMonth(r, i, this.startNextMonthDay)
      this.dateRange = Object.assign({}, this.dateRange, this.getNewDateRange(result, this.startNextActiveMonth,
        this.activeYearEnd))
      if (this.dateRange.start && this.dateRange.end) {
        this.presetActive = ''
        this.$emit('setPreset', null)
      }
    },
    isDateSelected (r, i, key, startMonthDay, endMonthDate) {
      const result = this.getDayIndexInMonth(r, i, startMonthDay)
      if (result < 1 || result > endMonthDate) return false

      let currDate = null
      if (key === 'first') {
        currDate = new Date(Date.UTC(this.activeYearStart, this.activeMonthStart, result))
      } else {
        currDate = new Date(Date.UTC(this.activeYearEnd, this.startNextActiveMonth, result))
      }
      return (this.dateRange.start && this.dateRange.start.getTime() === currDate.getTime()) ||
        (this.dateRange.end && this.dateRange.end.getTime() === currDate.getTime())
    },
    isDateInRange (r, i, key, startMonthDay, endMonthDate) {
      const result = this.getDayIndexInMonth(r, i, startMonthDay)
      if (result < 1 || result > endMonthDate) return false

      let currDate = null
      if (key === 'first') {
        currDate = new Date(Date.UTC(this.activeYearStart, this.activeMonthStart, result))
      } else {
        currDate = new Date(Date.UTC(this.activeYearEnd, this.startNextActiveMonth, result))
      }

      return (this.dateRange.start && this.dateRange.start.getTime() <= currDate.getTime()) &&
        (this.dateRange.end && this.dateRange.end.getTime() >= currDate.getTime())
    },
    isDateDisabled (r, i, startMonthDay, endMonthDate) {
      const result = this.getDayIndexInMonth(r, i, startMonthDay)
      // bound by > 0 and < last day of month
      return !(result > 0 && result <= endMonthDate)
    },
    goPrevMonth () {
      const prevMonth = new Date(Date.UTC(this.activeYearStart, this.activeMonthStart, 0))
      this.activeMonthStart = prevMonth.getMonth()
      this.activeYearStart = prevMonth.getFullYear()
      this.activeYearEnd = prevMonth.getFullYear()
    },
    goNextMonth () {
      const nextMonth = new Date(Date.UTC(this.activeYearEnd, this.startNextActiveMonth, 1))
      this.activeMonthStart = nextMonth.getMonth()
      this.activeYearStart = nextMonth.getFullYear()
      this.activeYearEnd = nextMonth.getFullYear()
    },
    updatePreset (item, idx) {
      this.presetActive = item.label
      this.dateRange = item.dateRange
      // update start active month
      this.activeMonthStart = this.dateRange.start.getMonth()
      this.activeYearStart = this.dateRange.start.getFullYear()
      this.activeYearEnd = this.dateRange.end.getFullYear()
      this.$emit('setPreset', idx)
    },
    setDateValue: function () {
      this.$emit('selected', this.dateRange)
      if (!this.isCompact) {
        this.toggleCalendar()
      }
    }
  }
}
