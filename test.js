process.env.FORCE_COLOR = '1'

const test = require('tap').test
const basicStyle = require('./')
const chalk = basicStyle.chalk
const sywac = require('sywac')
  .command('abc', { desc: 'Look ma no args' })
  .command('x <y> [z]', {
    desc: 'Some command',
    paramsDesc: [
      'The y required param',
      'The z optional param'
    ],
    setup: sywac => {
      sywac.boolean('--uhh', {
        desc: 'Some command-specific option'
      })
    }
  })
  .help('-h, --help')
  .example('$0 x y z', {
    desc: 'Does something'
  })
  .outputSettings({ maxWidth: 66 })
  .style(basicStyle)

function withLineFeeds (array) {
  return array.join('\n')
}

test('works for standard help text', t => {
  return sywac.parse('-h').then(result => {
    t.equal(result.output, withLineFeeds([
      chalk`{white Usage:} {magenta test} {magenta <command>} {green <args>} {cyan [options]}`,
      '',
      chalk.white('Commands:'),
      chalk`  {magenta abc}        Look ma no args`,
      chalk`  {magenta x} {green <y> [z]}  Some command`,
      '',
      chalk.white('Options:'),
      chalk`  {cyan -h, --help}  Show help                 {dim [commands: help] [boolean]}`,
      '',
      chalk.white('Examples:'),
      '  Does something',
      chalk`  {yellow $} test x y z`
    ]))
  })
})

test('works for command help text', t => {
  return sywac.parse('x -h').then(result => {
    t.equal(result.output, withLineFeeds([
      chalk`{white Usage:} {magenta test x} {green <y> [z]} {cyan [options]}`,
      '',
      chalk.white('Arguments:'),
      chalk`  {green <y>}  The y required param                    {dim [required] [string]}`,
      chalk`  {green [z]}  The z optional param                               {dim [string]}`,
      '',
      chalk.white('Options:'),
      chalk`  {cyan --uhh}       Some command-specific option               {dim [boolean]}`,
      chalk`  {cyan -h, --help}  Show help                 {dim [commands: help] [boolean]}`
    ]))
  })
})

test('works for error', t => {
  return sywac.parse('x').then(result => {
    t.equal(result.output, withLineFeeds([
      chalk`{white Usage:} {magenta test x} {green <y> [z]} {cyan [options]}`,
      '',
      chalk.red('Arguments:'),
      chalk`  {red <y>}  {yellow The y required param}                    {red [required] [string]}`,
      chalk`  {green [z]}  The z optional param                               {dim [string]}`,
      '',
      chalk.white('Options:'),
      chalk`  {cyan --uhh}       Some command-specific option               {dim [boolean]}`,
      chalk`  {cyan -h, --help}  Show help                 {dim [commands: help] [boolean]}`,
      '',
      chalk.red('Missing required argument: y')
    ]))
  })
})

test('exposes chalk', t => {
  t.ok(basicStyle.chalk)
  t.equal(typeof basicStyle.chalk.green, 'function')
  t.end()
})
