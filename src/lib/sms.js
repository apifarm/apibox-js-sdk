
const request = require('./request')
const APIBOX = require('./apibox')
const Error = require('./error')
const { isObject, isString } = require('./dataType')

//   /**
// * 请求短信验证码
// * @param {Object} 相应的参数
// * @param {Object} Backbone-style options 对象。 options.success, 如果设置了，将会处理云端代码调用成功的情况。 options.error 如果设置了，将会处理云端代码调用失败的情况。 两个函数都是可选的。两个函数都只有一个参数。
// * @return {APIBOX.Promise}
// */

const requestSmsCode = (data, options) => {
  if (!isObject(data)) {
    throw new Error(415)
  }
  let route = APIBOX._config.parameters.REQUESTSMSCODE
  return request(route, 'post', data)
}
//   /**
// * 验证短信验证码
// * @param {Object} 相应的参数
// * @param {Object} Backbone-style options 对象。 options.success, 如果设置了，将会处理云端代码调用成功的情况。 options.error 如果设置了，将会处理云端代码调用失败的情况。 两个函数都是可选的。两个函数都只有一个参数。
// * @return {APIBOX.Promise}
// */
const verifySmsCode = (smscode, data, options) => {
  if (!isString(smscode)) {
    // 参数异常
    throw new Error(415)
  }
  if (!isObject(data)) {
    // 参数异常
    throw new Error(415)
  }
  let route = `${APIBOX._config.parameters.VERIFYSMSCODE}/${smscode}`
  return request(route, 'post', data)
}

module.exports = { requestSmsCode, verifySmsCode }
