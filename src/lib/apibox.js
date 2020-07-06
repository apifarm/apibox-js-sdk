const utils = require('./utils')

const Apibox = global.Apibox || {}
Apibox.utils = utils
Apibox._config = utils.getConfig()

Apibox.initialize = (secretKey, securityCode, masterKey) => {
  if (securityCode.length > 6) {
    console.warn(`APIBOX初始化失败，2.0以上版本SDK请使用API安全码初始化，文档地址：https://apibox.github.io/apibox-js-sdk/#/?id=初始化`)
  }
  Apibox._config.secretKey = secretKey
  Apibox._config.securityCode = securityCode
  Apibox._config.applicationMasterKey = masterKey
}

// 开启调试
Apibox.debug = (d) => {
  Apibox._config.deBug = d
  Apibox._config = utils.getConfig(d)
}

module.exports = Apibox
