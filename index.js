let _c
function c () {
  if (!_c) _c = require('chalk')
  return _c
}

module.exports = {
  // style usage components
  usagePrefix: s => {
    return c().white(s.slice(0, 6)) + ' ' + c().magenta(s.slice(7))
  },
  usageCommandPlaceholder: s => c().magenta(s),
  usagePositionals: s => c().green(s),
  usageArgsPlaceholder: s => c().green(s),
  usageOptionsPlaceholder: s => c().cyan(s),
  // style normal help text
  group: s => c().white(s),
  flags: (s, type) => {
    if (type.datatype === 'command') return c().magenta(s)
    return s[0] === '-' ? c().cyan(s) : c().green(s)
  },
  hints: s => c().dim(s),
  example: s => c().yellow(s[0]) + s.slice(1),
  // use different style when a type is invalid
  groupError: s => c().red(s),
  flagsError: s => c().red(s),
  descError: s => c().yellow(s),
  hintsError: s => c().red(s),
  // style error messages
  messages: s => c().red(s),
  // expose chalk
  get chalk () {
    return c()
  }
}
