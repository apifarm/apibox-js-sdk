/*
 * @Author: your name
 * @Date: 2019-03-27 10:02:03
 * @LastEditTime: 2020-06-17 18:00:12
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /bmob-js-sdk-es6/src/lib/hapRequest.js
 */
let APIBOX = require('./apibox')
let md5 = require('./utf8md5')
const fetch = "xxrequire('@system.fetch')xx"

const setHeader = (config, route, method, parma) => {
  const t = Math.round(new Date().getTime() / 1000)
  const rand = APIBOX.utils.randomString()
  let body = (method === 'get' || method === 'delete') ? '' : JSON.stringify(parma)
  const sign = md5.utf8MD5(route + t + config.securityCode + rand + body + config.serverVersion)
  let header = {
    'content-type': 'application/json',
    'X-APIBOX-SDK-Type': 'wxlite',
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

    if (typeof parma === 'object') {
      parma = JSON.stringify(parma)
    }

    fetch.fetch({
      url: APIBOX._config.host + route,
      header: header,
      method: method,
      data: parma,
      success: function (res) {
        const data = JSON.parse(res.data)
        if (data.code) {
          reject(data)
        }
        resolve(data)
      },
      fail: function (data, code) {
        console.log(`handling fail, code = ${code}`)
        reject(data)
      }
    })
  })
}
module.exports = request
