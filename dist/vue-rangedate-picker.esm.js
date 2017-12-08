/*!
 * vue-rangedate-picker v0.2.3
 * (c) 2017 hidayat.febiansyah
 * Released under the MIT License.
 */

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};





function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var fecha = createCommonjsModule(function (module) {
(function (main) {
  'use strict';

  /**
   * Parse or format dates
   * @class fecha
   */
  var fecha = {};
  var token = /d{1,4}|M{1,4}|YY(?:YY)?|S{1,3}|Do|ZZ|([HhMsDm])\1?|[aA]|"[^"]*"|'[^']*'/g;
  var twoDigits = /\d\d?/;
  var threeDigits = /\d{3}/;
  var fourDigits = /\d{4}/;
  var word = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i;
  var literal = /\[([^]*?)\]/gm;
  var noop = function () {
  };

  function shorten(arr, sLen) {
    var newArr = [];
    for (var i = 0, len = arr.length; i < len; i++) {
      newArr.push(arr[i].substr(0, sLen));
    }
    return newArr;
  }

  function monthUpdate(arrName) {
    return function (d, v, i18n) {
      var index = i18n[arrName].indexOf(v.charAt(0).toUpperCase() + v.substr(1).toLowerCase());
      if (~index) {
        d.month = index;
      }
    };
  }

  function pad(val, len) {
    val = String(val);
    len = len || 2;
    while (val.length < len) {
      val = '0' + val;
    }
    return val;
  }

  var dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var monthNamesShort = shorten(monthNames, 3);
  var dayNamesShort = shorten(dayNames, 3);
  fecha.i18n = {
    dayNamesShort: dayNamesShort,
    dayNames: dayNames,
    monthNamesShort: monthNamesShort,
    monthNames: monthNames,
    amPm: ['am', 'pm'],
    DoFn: function DoFn(D) {
      return D + ['th', 'st', 'nd', 'rd'][D % 10 > 3 ? 0 : (D - D % 10 !== 10) * D % 10];
    }
  };

  var formatFlags = {
    D: function(dateObj) {
      return dateObj.getDate();
    },
    DD: function(dateObj) {
      return pad(dateObj.getDate());
    },
    Do: function(dateObj, i18n) {
      return i18n.DoFn(dateObj.getDate());
    },
    d: function(dateObj) {
      return dateObj.getDay();
    },
    dd: function(dateObj) {
      return pad(dateObj.getDay());
    },
    ddd: function(dateObj, i18n) {
      return i18n.dayNamesShort[dateObj.getDay()];
    },
    dddd: function(dateObj, i18n) {
      return i18n.dayNames[dateObj.getDay()];
    },
    M: function(dateObj) {
      return dateObj.getMonth() + 1;
    },
    MM: function(dateObj) {
      return pad(dateObj.getMonth() + 1);
    },
    MMM: function(dateObj, i18n) {
      return i18n.monthNamesShort[dateObj.getMonth()];
    },
    MMMM: function(dateObj, i18n) {
      return i18n.monthNames[dateObj.getMonth()];
    },
    YY: function(dateObj) {
      return String(dateObj.getFullYear()).substr(2);
    },
    YYYY: function(dateObj) {
      return dateObj.getFullYear();
    },
    h: function(dateObj) {
      return dateObj.getHours() % 12 || 12;
    },
    hh: function(dateObj) {
      return pad(dateObj.getHours() % 12 || 12);
    },
    H: function(dateObj) {
      return dateObj.getHours();
    },
    HH: function(dateObj) {
      return pad(dateObj.getHours());
    },
    m: function(dateObj) {
      return dateObj.getMinutes();
    },
    mm: function(dateObj) {
      return pad(dateObj.getMinutes());
    },
    s: function(dateObj) {
      return dateObj.getSeconds();
    },
    ss: function(dateObj) {
      return pad(dateObj.getSeconds());
    },
    S: function(dateObj) {
      return Math.round(dateObj.getMilliseconds() / 100);
    },
    SS: function(dateObj) {
      return pad(Math.round(dateObj.getMilliseconds() / 10), 2);
    },
    SSS: function(dateObj) {
      return pad(dateObj.getMilliseconds(), 3);
    },
    a: function(dateObj, i18n) {
      return dateObj.getHours() < 12 ? i18n.amPm[0] : i18n.amPm[1];
    },
    A: function(dateObj, i18n) {
      return dateObj.getHours() < 12 ? i18n.amPm[0].toUpperCase() : i18n.amPm[1].toUpperCase();
    },
    ZZ: function(dateObj) {
      var o = dateObj.getTimezoneOffset();
      return (o > 0 ? '-' : '+') + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4);
    }
  };

  var parseFlags = {
    D: [twoDigits, function (d, v) {
      d.day = v;
    }],
    Do: [new RegExp(twoDigits.source + word.source), function (d, v) {
      d.day = parseInt(v, 10);
    }],
    M: [twoDigits, function (d, v) {
      d.month = v - 1;
    }],
    YY: [twoDigits, function (d, v) {
      var da = new Date(), cent = +('' + da.getFullYear()).substr(0, 2);
      d.year = '' + (v > 68 ? cent - 1 : cent) + v;
    }],
    h: [twoDigits, function (d, v) {
      d.hour = v;
    }],
    m: [twoDigits, function (d, v) {
      d.minute = v;
    }],
    s: [twoDigits, function (d, v) {
      d.second = v;
    }],
    YYYY: [fourDigits, function (d, v) {
      d.year = v;
    }],
    S: [/\d/, function (d, v) {
      d.millisecond = v * 100;
    }],
    SS: [/\d{2}/, function (d, v) {
      d.millisecond = v * 10;
    }],
    SSS: [threeDigits, function (d, v) {
      d.millisecond = v;
    }],
    d: [twoDigits, noop],
    ddd: [word, noop],
    MMM: [word, monthUpdate('monthNamesShort')],
    MMMM: [word, monthUpdate('monthNames')],
    a: [word, function (d, v, i18n) {
      var val = v.toLowerCase();
      if (val === i18n.amPm[0]) {
        d.isPm = false;
      } else if (val === i18n.amPm[1]) {
        d.isPm = true;
      }
    }],
    ZZ: [/([\+\-]\d\d:?\d\d|Z)/, function (d, v) {
      if (v === 'Z') { v = '+00:00'; }
      var parts = (v + '').match(/([\+\-]|\d\d)/gi), minutes;

      if (parts) {
        minutes = +(parts[1] * 60) + parseInt(parts[2], 10);
        d.timezoneOffset = parts[0] === '+' ? minutes : -minutes;
      }
    }]
  };
  parseFlags.dd = parseFlags.d;
  parseFlags.dddd = parseFlags.ddd;
  parseFlags.DD = parseFlags.D;
  parseFlags.mm = parseFlags.m;
  parseFlags.hh = parseFlags.H = parseFlags.HH = parseFlags.h;
  parseFlags.MM = parseFlags.M;
  parseFlags.ss = parseFlags.s;
  parseFlags.A = parseFlags.a;


  // Some common format strings
  fecha.masks = {
    default: 'ddd MMM DD YYYY HH:mm:ss',
    shortDate: 'M/D/YY',
    mediumDate: 'MMM D, YYYY',
    longDate: 'MMMM D, YYYY',
    fullDate: 'dddd, MMMM D, YYYY',
    shortTime: 'HH:mm',
    mediumTime: 'HH:mm:ss',
    longTime: 'HH:mm:ss.SSS'
  };

  /***
   * Format a date
   * @method format
   * @param {Date|number} dateObj
   * @param {string} mask Format of the date, i.e. 'mm-dd-yy' or 'shortDate'
   */
  fecha.format = function (dateObj, mask, i18nSettings) {
    var i18n = i18nSettings || fecha.i18n;

    if (typeof dateObj === 'number') {
      dateObj = new Date(dateObj);
    }

    if (Object.prototype.toString.call(dateObj) !== '[object Date]' || isNaN(dateObj.getTime())) {
      throw new Error('Invalid Date in fecha.format');
    }

    mask = fecha.masks[mask] || mask || fecha.masks['default'];

    var literals = [];

    // Make literals inactive by replacing them with ??
    mask = mask.replace(literal, function($0, $1) {
      literals.push($1);
      return '??';
    });
    // Apply formatting rules
    mask = mask.replace(token, function ($0) {
      return $0 in formatFlags ? formatFlags[$0](dateObj, i18n) : $0.slice(1, $0.length - 1);
    });
    // Inline literal values back into the formatted value
    return mask.replace(/\?\?/g, function() {
      return literals.shift();
    });
  };

  /**
   * Parse a date string into an object, changes - into /
   * @method parse
   * @param {string} dateStr Date string
   * @param {string} format Date parse format
   * @returns {Date|boolean}
   */
  fecha.parse = function (dateStr, format, i18nSettings) {
    var i18n = i18nSettings || fecha.i18n;

    if (typeof format !== 'string') {
      throw new Error('Invalid format in fecha.parse');
    }

    format = fecha.masks[format] || format;

    // Avoid regular expression denial of service, fail early for really long strings
    // https://www.owasp.org/index.php/Regular_expression_Denial_of_Service_-_ReDoS
    if (dateStr.length > 1000) {
      return false;
    }

    var isValid = true;
    var dateInfo = {};
    format.replace(token, function ($0) {
      if (parseFlags[$0]) {
        var info = parseFlags[$0];
        var index = dateStr.search(info[0]);
        if (!~index) {
          isValid = false;
        } else {
          dateStr.replace(info[0], function (result) {
            info[1](dateInfo, result, i18n);
            dateStr = dateStr.substr(index + result.length);
            return result;
          });
        }
      }

      return parseFlags[$0] ? '' : $0.slice(1, $0.length - 1);
    });

    if (!isValid) {
      return false;
    }

    var today = new Date();
    if (dateInfo.isPm === true && dateInfo.hour != null && +dateInfo.hour !== 12) {
      dateInfo.hour = +dateInfo.hour + 12;
    } else if (dateInfo.isPm === false && +dateInfo.hour === 12) {
      dateInfo.hour = 0;
    }

    var date;
    if (dateInfo.timezoneOffset != null) {
      dateInfo.minute = +(dateInfo.minute || 0) - +dateInfo.timezoneOffset;
      date = new Date(Date.UTC(dateInfo.year || today.getFullYear(), dateInfo.month || 0, dateInfo.day || 1,
        dateInfo.hour || 0, dateInfo.minute || 0, dateInfo.second || 0, dateInfo.millisecond || 0));
    } else {
      date = new Date(dateInfo.year || today.getFullYear(), dateInfo.month || 0, dateInfo.day || 1,
        dateInfo.hour || 0, dateInfo.minute || 0, dateInfo.second || 0, dateInfo.millisecond || 0);
    }
    return date;
  };

  /* istanbul ignore next */
  if ('object' !== 'undefined' && module.exports) {
    module.exports = fecha;
  } else if (typeof undefined === 'function' && undefined.amd) {
    undefined(function () {
      return fecha;
    });
  } else {
    main.fecha = fecha;
  }
})(commonjsGlobal);
});

var defaultConfig = {};
var defaultI18n = 'ID';
var availableMonths = {
  EN: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November',
    'December'],
  ID: ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November',
    'Desember']
};

var availableShortDays = {
  EN: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  ID: ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab']
};

var presetRangeLabel = {
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
};

var defaultCaptions = {
  'title': 'Choose Dates',
  'ok_button': 'Apply'
};

var defaultStyle = {
  daysWeeks: 'calendar_weeks',
  days: 'calendar_days',
  daysSelected: 'calendar_days_selected',
  daysInRange: 'calendar_days_in-range',
  firstDate: 'calendar_month_left',
  secondDate: 'calendar_month_right',
  presetRanges: 'calendar_preset-ranges'
};

var defaultPresets = function (i18n) {
  return {
    today: function () {
      var n = new Date();
      var startToday = new Date(n.getFullYear(), n.getMonth(), n.getDate() + 1, 0, 0);
      var endToday = new Date(n.getFullYear(), n.getMonth(), n.getDate() + 1, 23, 59);
      return {
        label: presetRangeLabel[i18n].today,
        active: false,
        dateRange: {
          start: startToday,
          end: endToday
        }
      }
    },
    thisMonth: function () {
      var n = new Date();
      var startMonth = new Date(n.getFullYear(), n.getMonth(), 2);
      var endMonth = new Date(n.getFullYear(), n.getMonth() + 1, 1);
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
      var n = new Date();
      var startMonth = new Date(n.getFullYear(), n.getMonth() - 1, 2);
      var endMonth = new Date(n.getFullYear(), n.getMonth(), 1);
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
      var n = new Date();
      var start = new Date(n.getFullYear(), n.getMonth(), n.getDate() - 5);
      var end = new Date(n.getFullYear(), n.getMonth(), n.getDate() + 1);
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
      var n = new Date();
      var start = new Date(n.getFullYear(), n.getMonth(), n.getDate() - 29);
      var end = new Date(n.getFullYear(), n.getMonth(), n.getDate() + 1);
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
};

var __vue_module__ = {
  props: {
    configs: {
      type: Object,
      default: function () { return defaultConfig; }
    },
    i18n: {
      type: String,
      default: defaultI18n
    },
    months: {
      type: Array,
      default: function () { return null; }
    },
    shortDays: {
      type: Array,
      default: function () { return null; }
    },
    // options for captions are: title, ok_button
    captions: {
      type: Object,
      default: function () { return defaultCaptions; }
    },
    format: {
      type: String,
      default: 'DD MMM YYYY'
    },
    styles: {
      type: Object,
      default: function () {}
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
      default: null
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
  data: function data () {
    return {
      dateRange: {},
      numOfDays: 7,
      isFirstChoice: true,
      isOpen: false,
      presetActive: '',
      showMonth: false,
      activeMonthStart: this.startActiveMonth
    }
  },
  created: function created () {
    this.range = this.initRange || null;
    if (this.isCompact) {
      this.isOpen = true;
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
      return new Date(this.startActiveYear, this.activeMonthStart, 1).getDay()
    },
    startNextMonthDay: function () {
      return new Date(this.startActiveYear, this.startNextActiveMonth, 1).getDay()
    },
    endMonthDate: function () {
      return new Date(this.startActiveYear, this.startNextActiveMonth, 0).getDate()
    },
    endNextMonthDate: function () {
      return new Date(this.startActiveYear, this.activeMonthStart + 2, 0).getDate()
    },
    startNextActiveMonth: function () {
      return this.activeMonthStart >= 11 ? 0 : this.activeMonthStart + 1
    },
    finalPresetRanges: function () {
      var tmp = {};
      var presets = this.presetRanges || defaultPresets(this.i18n);
      for (var i in presets) {
        var item = presets[i];
        var plainItem = item;
        if (typeof item === 'function') {
          plainItem = item();
        }
        tmp[i] = plainItem;
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
        this.showMonth = !this.showMonth;
        return
      }
      this.isOpen = !this.isOpen;
      this.showMonth = !this.showMonth;
      return
    },
    getDateString: function (date, format) {
      if ( format === void 0 ) format = this.format;

      if (!date) {
        return null
      }
      var dateparse = new Date(Date.parse(date));
      return fecha.format(new Date(dateparse.getFullYear(), dateparse.getMonth(), dateparse.getDate() - 1), format)
    },
    getDayIndexInMonth: function (r, i, startMonthDay) {
      var date = (this.numOfDays * (r - 1)) + i;
      return date - startMonthDay
    },
    getDayCell: function getDayCell (r, i, startMonthDay, endMonthDate) {
      var result = this.getDayIndexInMonth(r, i, startMonthDay);
      // bound by > 0 and < last day of month
      return result > 0 && result <= endMonthDate ? result : '&nbsp;'
    },
    getNewDateRange: function getNewDateRange (result, activeMonth) {
      var newData = {};
      var key = 'start';
      if (!this.isFirstChoice) {
        key = 'end';
      } else {
        newData['end'] = null;
      }
      var resultDate = new Date(this.startActiveYear, activeMonth, result);
      if (!this.isFirstChoice && resultDate < this.dateRange.start) {
        this.isFirstChoice = false;
        return { start: resultDate }
      }

      // toggle first choice
      this.isFirstChoice = !this.isFirstChoice;
      newData[key] = resultDate;
      return newData
    },
    selectFirstItem: function selectFirstItem (r, i) {
      var result = this.getDayIndexInMonth(r, i, this.startMonthDay) + 1;
      this.dateRange = Object.assign({}, this.dateRange, this.getNewDateRange(result, this.activeMonthStart));
      if (this.dateRange.start && this.dateRange.end) {
        this.presetActive = '';
        if (this.isCompact) {
          this.showMonth = false;
        }
      }
    },
    selectSecondItem: function selectSecondItem (r, i) {
      var result = this.getDayIndexInMonth(r, i, this.startNextMonthDay) + 1;
      this.dateRange = Object.assign({}, this.dateRange, this.getNewDateRange(result, this.startNextActiveMonth));
      if (this.dateRange.start && this.dateRange.end) {
        this.presetActive = '';
      }
    },
    isDateSelected: function isDateSelected (r, i, key, startMonthDay, endMonthDate) {
      var result = this.getDayIndexInMonth(r, i, startMonthDay) + 1;
      if (result < 2 || result > endMonthDate + 1) { return false }

      var currDate = null;
      if (key === 'first') {
        currDate = new Date(this.startActiveYear, this.activeMonthStart, result);
      } else {
        currDate = new Date(this.startActiveYear, this.startNextActiveMonth, result);
      }
      return (this.dateRange.start && this.dateRange.start.getTime() === currDate.getTime()) ||
        (this.dateRange.end && this.dateRange.end.getTime() === currDate.getTime())
    },
    isDateInRange: function isDateInRange (r, i, key, startMonthDay, endMonthDate) {
      var result = this.getDayIndexInMonth(r, i, startMonthDay) + 1;
      if (result < 2 || result > endMonthDate + 1) { return false }

      var currDate = null;
      if (key === 'first') {
        currDate = new Date(this.startActiveYear, this.activeMonthStart, result);
      } else {
        currDate = new Date(this.startActiveYear, this.startNextActiveMonth, result);
      }
      return (this.dateRange.start && this.dateRange.start.getTime() < currDate.getTime()) &&
        (this.dateRange.end && this.dateRange.end.getTime() > currDate.getTime())
    },
    goPrevMonth: function goPrevMonth () {
      var prevMonth = new Date(this.startActiveYear, this.activeMonthStart, 0);
      this.activeMonthStart = prevMonth.getMonth();
      this.startActiveYear = prevMonth.getFullYear();
    },
    goNextMonth: function goNextMonth () {
      var nextMonth = new Date(this.startActiveYear, this.startNextActiveMonth, 1);
      this.activeMonthStart = nextMonth.getMonth();
      this.startActiveYear = nextMonth.getFullYear();
    },
    updatePreset: function updatePreset (item) {
      this.presetActive = item.label;
      this.dateRange = item.dateRange;
      // update start active month
      this.activeMonthStart = this.dateRange.start.getMonth();
      this.startActiveYear = this.dateRange.start.getFullYear();
    },
    setDateValue: function () {
      this.$emit('selected', this.dateRange);
      if (!this.isCompact) {
        this.toggleCalendar();
      }
    }
  }
};

var __$__vue_module__ = Object.assign(__vue_module__, {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"calendar-root"},[_c('div',{staticClass:"input-date",on:{"click":function($event){_vm.toggleCalendar();}}},[_vm._v(" "+_vm._s(_vm.getDateString(_vm.dateRange.start))+" - "+_vm._s(_vm.getDateString(_vm.dateRange.end)))]),_vm._v(" "),(_vm.isOpen)?_c('div',{staticClass:"calendar",class:{'calendar-mobile ': _vm.isCompact, 'calendar-right-to-left': _vm.isRighttoLeft}},[(!_vm.isCompact)?_c('div',{staticClass:"calendar-head"},[_c('h2',[_vm._v(_vm._s(_vm.captions.title))]),_vm._v(" "),_c('i',{staticClass:"close",on:{"click":function($event){_vm.toggleCalendar();}}})]):_vm._e(),_vm._v(" "),_c('div',{staticClass:"calendar-wrap"},[(_vm.showMonth)?_c('div',{staticClass:"calendar_month_left",class:{'calendar-left-mobile': _vm.isCompact}},[_c('div',{staticClass:"months-text"},[_c('i',{staticClass:"left",on:{"click":_vm.goPrevMonth}}),_vm._v(" "),(_vm.isCompact)?_c('i',{staticClass:"right",on:{"click":_vm.goNextMonth}}):_vm._e(),_vm._v(" "+_vm._s(_vm.monthsLocale[_vm.activeMonthStart] +' '+ _vm.startActiveYear))]),_vm._v(" "),_c('ul',{class:_vm.s.daysWeeks},_vm._l((_vm.shortDaysLocale),function(item){return _c('li',[_vm._v(_vm._s(item))])})),_vm._v(" "),_vm._l((6),function(r){return _c('ul',{class:[_vm.s.days]},_vm._l((_vm.numOfDays),function(i){return _c('li',{class:[( obj = {}, obj[_vm.s.daysSelected] = _vm.isDateSelected(r, i, 'first', _vm.startMonthDay, _vm.endMonthDate), obj[_vm.s.daysInRange] = _vm.isDateInRange(r, i, 'first', _vm.startMonthDay, _vm.endMonthDate), obj )],domProps:{"innerHTML":_vm._s(_vm.getDayCell(r, i, _vm.startMonthDay, _vm.endMonthDate))},on:{"click":function($event){_vm.selectFirstItem(r, i);}}})
    var obj;}))})],2):_vm._e(),_vm._v(" "),(!_vm.isCompact)?_c('div',{staticClass:"calendar_month_right"},[_c('div',{staticClass:"months-text"},[_vm._v(" "+_vm._s(_vm.monthsLocale[_vm.startNextActiveMonth] +' '+ _vm.startActiveYear)+" "),_c('i',{staticClass:"right",on:{"click":_vm.goNextMonth}})]),_vm._v(" "),_c('ul',{class:_vm.s.daysWeeks},_vm._l((_vm.shortDaysLocale),function(item){return _c('li',[_vm._v(_vm._s(item))])})),_vm._v(" "),_vm._l((6),function(r){return _c('ul',{class:[_vm.s.days]},_vm._l((_vm.numOfDays),function(i){return _c('li',{class:[( obj = {}, obj[_vm.s.daysSelected] = _vm.isDateSelected(r, i, 'second', _vm.startNextMonthDay, _vm.endNextMonthDate), obj[_vm.s.daysInRange] = _vm.isDateInRange(r, i, 'second', _vm.startNextMonthDay, _vm.endNextMonthDate), obj )],domProps:{"innerHTML":_vm._s(_vm.getDayCell(r, i, _vm.startNextMonthDay, _vm.endNextMonthDate))},on:{"click":function($event){_vm.selectSecondItem(r, i);}}})
    var obj;}))})],2):_vm._e()]),_vm._v(" "),(!_vm.showMonth || !_vm.isCompact)?_c('div',{staticClass:"calendar-range",class:{'calendar-range-mobile ': _vm.isCompact}},[_c('ul',{staticClass:"calendar_preset"},[_vm._l((_vm.finalPresetRanges),function(item,idx){return _c('li',{key:idx,staticClass:"calendar_preset-ranges",class:{'active-preset': _vm.presetActive === item.label},on:{"click":function($event){_vm.updatePreset(item);}}},[_vm._v(" "+_vm._s(item.label)+" ")])}),_vm._v(" "),_c('li',[_c('button',{staticClass:"calendar-btn-apply",on:{"click":function($event){_vm.setDateValue();}}},[_vm._v(_vm._s(_vm.captions.ok_button))])])],2)]):_vm._e()]):_vm._e()])},staticRenderFns: [],_scopeId: 'data-v-5e837f70',});
    __$__vue_module__.prototype = __vue_module__.prototype;

function plugin (Vue) {
  Vue.component('rangedate-picker', __$__vue_module__);
}

// Install by default if using the script tag
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin);
}

var version = '0.2.3';

export { __$__vue_module__ as RangedatePicker, version };export default plugin;
