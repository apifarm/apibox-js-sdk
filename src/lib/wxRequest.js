/*
 * @Author: magic
 * @Date: 2019-03-27 10:02:03
 * @LastEditTime: 2020-06-17 18:26:23
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /bmob-js-sdk-es6/src/lib/wxRequest.js
 */
let APIBOX = require('./apibox')
let md5 = require('./utf8md5')
let sdkType = 'wxlite'
if (typeof (tt) !== 'undefined') {
  sdkType = 'toutiao'
} else if (typeof (qq) !== 'undefined') {
  sdkType = 'qqApp'
}

const setHeader = (config, route, method, parma) => {
  const t = Math.round(new Date().getTime() / 1000)
  const rand = APIBOX.utils.randomString()
  let body = (method === 'get' || method === 'delete') ? '' : JSON.stringify(parma)

  const sign = md5.utf8MD5(route + t + config.securityCode + rand + body + config.serverVersion)
  // const sign = md5.utf8MD5(route + t + config.securityCode + rand)
  let header = {
    'content-type': 'application/json',
    'X-APIBOX-SDK-Type': sdkType,
    'X-APIBOX-Safe-Sign': sign,
    'X-APIBOX-Safe-Timestamp': t,
    'X-APIBOX-Noncestr-Key': rand,
    'X-APIBOX-SDK-Version': config.serverVersion,
    'X-APIBOX-Secret-Key': config.secretKey
  }
  if (config.applicationMasterKey) {
    header['X-APIBOX-Master-Key'] = config.applicationMasterKey
  }
  return header
}

const request = (route, method = 'get', parma = {}) => {
  return new Promise((resolve, reject) => {
    const header = setHeader(APIBOX._config, route, method, parma)

    if (undefined === APIBOX.User) {
      APIBOX = require('./apibox')
    }
    let current = APIBOX.User.current()
    if (current) {
      header['X-APIBOX-Session-Token'] = current.sessionToken
    }
    if (APIBOX._config.deBug === true) {
      console.log('host:', APIBOX._config.host)
      console.log('parma:', parma)
    }
    wx.request({
      url: APIBOX._config.host + route,
      method: method,
      data: parma,
      header: header,
      success: res => {
        if ((res.data.code && res.data.error) || res.data.error) {
          reject(res.data)
        }
        resolve(res.data)
      },
      fail: err => {
        console.log(err)
        reject(err)
      }
    })
  })
}

module.exports = request
