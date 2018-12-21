const chalk = require('chalk')

module.exports = {
  // style usage components
  usagePrefix: s => {
    return chalk.white(s.slice(0, 6)) + ' ' + chalk.magenta(s.slice(7))
  },
  usageCommandPlaceholder: s => chalk.magenta(s),
  usagePositionals: s => chalk.green(s),
  usageArgsPlaceholder: s => chalk.green(s),
  usageOptionsPlaceholder: s => chalk.cyan(s),
  // style normal help text
  group: s => chalk.white(s),
  flags: (s, type) => {
    if (type.datatype === 'command') return chalk.magenta(s)
    return s[0] === '-' ? chalk.cyan(s) : chalk.green(s)
  },
  hints: s => chalk.dim(s),
  example: s => chalk.yellow(s[0]) + s.slice(1),
  // use different style when a type is invalid
  groupError: s => chalk.red(s),
  flagsError: s => chalk.red(s),
  descError: s => chalk.yellow(s),
  hintsError: s => chalk.red(s),
  // style error messages
  messages: s => chalk.red(s),
  // expose chalk
  chalk
}
