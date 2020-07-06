/*
 * @Author: magic
 * @Date: 2019-03-27 10:02:03
 * @LastEditTime: 2020-06-17 18:26:23
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /apibox-js-sdk-es6/src/lib/wxRequest.js
 */
let Apibox = require('./apibox')
let md5 = require('./utf8md5')
let sdkType = 'wxlite'
if (typeof (tt) !== 'undefined') {
  sdkType = 'toutiao'
} else if (typeof (qq) !== 'undefined') {
  sdkType = 'qqApp'
}

const setHeader = (config, route, method, parma) => {
  const t = Math.round(new Date().getTime() / 1000)
  const rand = Apibox.utils.randomString()
  let body = (method === 'get' || method === 'delete') ? '' : JSON.stringify(parma)

  const sign = md5.utf8MD5(route + t + config.securityCode + rand + body + config.serverVersion)
  // const sign = md5.utf8MD5(route + t + config.securityCode + rand)
  let header = {
    'content-type': 'application/json',
    'X-Apibox-SDK-Type': sdkType,
    'X-Apibox-Safe-Sign': sign,
    'X-Apibox-Safe-Timestamp': t,
    'X-Apibox-Noncestr-Key': rand,
    'X-Apibox-SDK-Version': config.serverVersion,
    'X-Apibox-Secret-Key': config.secretKey
  }
  if (config.applicationMasterKey) {
    header['X-Apibox-Master-Key'] = config.applicationMasterKey
  }
  return header
}

const request = (route, method = 'get', parma = {}) => {
  return new Promise((resolve, reject) => {
    const header = setHeader(Apibox._config, route, method, parma)

    if (undefined === Apibox.User) {
      Apibox = require('./apibox')
    }
    let current = Apibox.User.current()
    if (current) {
      header['X-Apibox-Session-Token'] = current.sessionToken
    }
    if (Apibox._config.deBug === true) {
      console.log('host:', Apibox._config.host)
      console.log('parma:', parma)
    }
    wx.request({
      url: Apibox._config.host + route,
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
