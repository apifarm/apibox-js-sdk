const packageInfo = require('../package.json')
const fs = require('fs')
const path = require('path')

const ApiboxFile = path.join(__dirname, '../dist/apibox-' + packageInfo.version + '.min.js')

function HapAmendAsyncPlugin(options) {}

HapAmendAsyncPlugin.prototype.apply = function (compiler) {
  compiler.plugin("done", function () {
    // Do something async...
    fs.readFile(ApiboxFile, 'utf-8', function (error, result) {
      const time = new Date().toLocaleDateString()
      const auth = `
/* !
* hydrogen-js-sdk
* apibox.min.js v${packageInfo.version}
* updated date ${time}
*/
`
      const data = auth + result.replace("xxrequire('@system.fetch')xx", "require('@system.fetch')")

      fs.writeFile(ApiboxFile, data, function (error) {
        console.log('apibox-' + packageInfo.version + '.min.js  Compile successfully')
      })
    })
  });
};
module.exports = HapAmendAsyncPlugin;
