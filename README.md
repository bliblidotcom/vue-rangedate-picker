# VueRangedatePicker

[![npm](https://img.shields.io/npm/v/vue-rangedate-picker.svg)](https://www.npmjs.com/package/vue-rangedate-picker) [![vue2](https://img.shields.io/badge/vue-2.x-brightgreen.svg)](https://vuejs.org/) [![travis](https://img.shields.io/travis/bliblidotcom/vue-rangedate-picker.svg)](https://travis-ci.org/bliblidotcom/vue-rangedate-picker) [![codecov](https://codecov.io/gh/bliblidotcom/vue-rangedate-picker/branch/master/graph/badge.svg)](https://codecov.io/gh/bliblidotcom/vue-rangedate-picker)

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
// You need a specific loader for CSS files like https://github.com/webpack/css-loader
import 'vue-rangedate-picker/dist/vue-rangedate-picker.css'

Vue.use(VueRangedatePicker)
```

### Browser

```html
<!-- Include after Vue -->
<!-- Local files -->
<link rel="stylesheet" href="vue-rangedate-picker/dist/vue-rangedate-picker.css"></link>
<script src="vue-rangedate-picker/dist/vue-rangedate-picker.js"></script>

<!-- From CDN -->
<link rel="stylesheet" href="https://unpkg.com/vue-rangedate-picker/dist/vue-rangedate-picker.css"></link>
<script src="https://unpkg.com/vue-rangedate-picker"></script>
```

### Available Props


| Props Name                 | Type             | Default Value  | Description                         	|
|--------------------------- |------------------|--------------- | ------------------------------------	|
| configs                     | Object           | -              | -                                    |
| i18n                       | String           | -              | -                                    |
| months                     | Array            | -              | -                                    |
| shortDays                  | Array            | -              | -                                    |
| captions                   | Object           | -              | -                                    |
| format                     | String           | 'DD MMM YYYY'              | -                                    |
| styles                     | Object           | -              | -                                    |
| initRange                  | Object           | -              | -                                    |
| startActiveMonth           | Number           | `new Date().getMonth()`    | -                                    |
| startActiveYear            | Number           | `new Date().getFullYear()` | -                                    |
| presetRanges               | Object           | -              | -                                    |
| compact                    | String           | 'false'        | -                                    |
| righttoleft                | String           | 'false'        | -                                    |


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
