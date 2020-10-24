const fabric = require('@umijs/fabric')

module.exports = {
  ...fabric.prettier,
  semi: false,
  tabWidth: 2,
  arrowParens: 'avoid',
}
