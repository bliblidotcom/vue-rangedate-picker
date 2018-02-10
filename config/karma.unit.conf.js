const base = require('./karma.base.conf')

module.exports = config => {
  config.set(Object.assign(base, {
    reporters: ['spec', 'progress'],
    browsers: ['Chrome', 'Firefox', 'Safari'],
    singleRun: true
  }))
}
