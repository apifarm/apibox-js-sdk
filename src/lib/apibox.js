const utils = require('./utils')

const APIBOX = global.APIBOX || {}
APIBOX.utils = utils
APIBOX._config = utils.getConfig()

APIBOX.initialize = (secretKey, securityCode, masterKey) => {
  if (securityCode.length > 6) {
    console.warn(`APIBOX初始化失败，2.0以上版本SDK请使用API安全码初始化，文档地址：https://apibox.github.io/apibox-js-sdk/#/?id=初始化`)
  }
  APIBOX._config.secretKey = secretKey
  APIBOX._config.securityCode = securityCode
  APIBOX._config.applicationMasterKey = masterKey
}

// 开启调试
APIBOX.debug = (d) => {
  APIBOX._config.deBug = d
  APIBOX._config = utils.getConfig(d)
}

module.exports = APIBOX
