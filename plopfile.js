const viewGenerator = require('./plop-templates/view/prompt')
const componentGenerator = require('./plop-templates/component/prompt')
const storeGenerator = require('./plop-templates/store/prompt')
const viewTableGenerator = require('./plop-templates/viewTable/prompt')

module.exports = function(plop) {
  plop.setGenerator('view', viewGenerator)
  plop.setGenerator('component', componentGenerator)
  plop.setGenerator('store', storeGenerator)
  plop.setGenerator('view - table', viewTableGenerator)
}
