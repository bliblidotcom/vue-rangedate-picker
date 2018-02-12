# VueRangedatePicker

[![npm](https://img.shields.io/npm/v/vue-rangedate-picker.svg)](https://www.npmjs.com/package/vue-rangedate-picker) [![vue2](https://img.shields.io/badge/vue-2.x-brightgreen.svg)](https://vuejs.org/) [![travis](https://img.shields.io/travis/bliblidotcom/vue-rangedate-picker.svg)](https://travis-ci.org/bliblidotcom/vue-rangedate-picker) [![codecov](https://codecov.io/gh/bliblidotcom/vue-rangedate-picker/branch/master/graph/badge.svg)](https://codecov.io/gh/bliblidotcom/vue-rangedate-picker) [![Codacy Badge](https://api.codacy.com/project/badge/Grade/5afaab93c27145f0bec1686beb9b8904)](https://www.codacy.com/app/bliblidotcom/vue-rangedate-picker?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=bliblidotcom/vue-rangedate-picker&amp;utm_campaign=Badge_Grade)

> Date picker with range selection

## Demo

[https://bliblidotcom.github.io/vue-rangedate-picker/demo/](https://bliblidotcom.github.io/vue-rangedate-picker/demo/)

## Installation

```bash
npm install --save vue-rangedate-picker
```

## Usage

### Bundler (Webpack, Rollup)

```js
import Vue from 'vue'
import VueRangedatePicker from 'vue-rangedate-picker'

Vue.use(VueRangedatePicker)
```

### Browser

```html
<!-- Include after Vue -->
<!-- Local files -->
<script src="vue-rangedate-picker/dist/vue-rangedate-picker.min.js"></script>

<!-- From CDN -->
<script src="https://unpkg.com/vue-rangedate-picker"></script>
```

### Available Events

You can catch these below Events to `<rangedate-picker @events="events"></rangedate-picker>` template :

+ **selected**

  *Description* : function that will `$emit` when datepicker set value, this function will get parameter response :
  ```javascript
  {
    start: dateObjectStart
    end: dateObjectEnd
  }
  ```

### Available Props

You can pass these below props to `<rangedate-picker :props="props"></rangedate-picker>` template :

+ **configs**

  *Description* : -

  *Type* : Object

  *Default Value* : `{}`

+ **i18n**

  *Description* : For text translation (currently: ID/EN)

  *Type* : String

  *Default Value* : `'ID'`

+ **months**

  *Description* : Array of months name

  *Type* : Array

  *Default Value* : 
  ```javascript
  ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli',
   'Agustus', 'September', 'Oktober', 'November', 'Desember']
  ```

+ **shortDays**

  *Description* : Array of days name in short

  *Type* : Array

  *Default Value* : 
  ```javascript
  ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab']
  ```

+ **captions**

  *Description* : Object for text title and OK button

  *Type* : Object

  *Default Value* : 
  ```javascript
  {
    'title': 'Choose Dates',
    'ok_button': 'Apply'
  }
  ```

+ **format**

  *Description* : Date format

  *Type* : String

  *Default Value* : `'DD MMM YYYY'`

+ **styles**

  *Description* : -

  *Type* : Object

  *Default Value* : 
  ```javascript
  {
    daysWeeks: 'calendar_weeks',
    days: 'calendar_days',
    daysSelected: 'calendar_days_selected',
    daysInRange: 'calendar_days_in-range',
    firstDate: 'calendar_month_left',
    secondDate: 'calendar_month_right',
    presetRanges: 'calendar_preset-ranges'
  }
  ```

+ **initRange**

  *Description* : -

  *Type* : Object

  *Default Value* : `null`

+ **startActiveMonth**

  *Description* : Month will be shown in first launch

  *Type* : Number

  *Default Value* : `new Date().getMonth()`

+ **startActiveYear**

  *Description* : Year will be shown in first launch

  *Type* : Number

  *Default Value* : `new Date().getFullYear()`

+ **presetRanges**

  *Description* : Set of objects that will shown as quick selection of daterange

  *Type* : Object

  Example Object : 
  ```javascript
  {
    today: function () {
      const n = new Date()
      const startToday = new Date(n.getFullYear(), n.getMonth(), n.getDate() + 1, 0, 0)
      const endToday = new Date(n.getFullYear(), n.getMonth(), n.getDate() + 1, 23, 59)
      return {
        label: presetRangeLabel[i18n].today,
        active: false,
        dateRange: {
          start: startToday,
          end: endToday
        }
      }
    }
  }
  ```

  *Default Value* : 
  ```javascript
  {
    today: function () {
      return {
        // label: 'string', active: 'boolean', dateRange: {start: date, end: end}
      }
    },
    thisMonth: function () {},
    lastMonth: function () {},
    last7days: function () {},
    last30days: function () {}
  }
  ```

+ **compact**

  *Description* : Set to `'true'` if you want to make datepicker always shown in compact mode

  *Type* : String

  *Default Value* : `'false'`

+ **righttoleft**

  *Description* : Set to `'true'` if you want datepicker shown align to `right`

  *Type* : String

  *Default Value* : `'false'`

## Development

### Launch visual tests

```bash
npm run dev
```

### Launch Karma with coverage

```bash
npm run dev:coverage
```

### Build

Bundle the js and css of to the `dist` folder:

```bash
npm run build
```


## Publishing

The `prepublish` hook will ensure dist files are created before publishing. This
way you don't need to commit them in your repository.

```bash
# Bump the version first
# It'll also commit it and create a tag
npm version
# Push the bumped package and tags
git push --follow-tags
# Ship it 🚀
npm publish
```

## License

[MIT](http://opensource.org/licenses/MIT)
