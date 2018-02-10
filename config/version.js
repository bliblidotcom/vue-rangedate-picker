const fs = require('fs')
const pack = require('../package.json')

// update installation.md
const installation = fs
  .readFileSync('./gitbook/installation.md', 'utf-8')
  .replace(
    /https:\/\/unpkg\.com\/vue-h-zoom@[\d.]+.[\d]+\/dist\/vue-h-zoom\.js/,
    'https://unpkg.com/vue-h-zoom@' + pack.version + '/dist/vue-h-zoom.js.'
  )
fs.writeFileSync('./gitbook/installation.md', installation)
