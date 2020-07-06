/*
 * @Author: apibox
 * @Date: 2018-12-11 16:07:08
 * @LastEditTime: 2020-06-22 14:14:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /apibox-js-sdk-es6/src/lib/axiosRequest.js
 */
/* eslint-disable */
const axios = require('./axios/lib/axios')
let Apibox = require('./apibox')
let md5 = require('./utf8md5')

const setHeader = (config, route, method, parma) => {
  let type = 'wxlite'
  if (Apibox.type === 'nodejs') {
    type = 'nodejs'
  }
  const t = Math.round(new Date().getTime() / 1000);

  let body = (method === 'get' || method === 'delete') ? '' : JSON.stringify(parma)

  const rand = Apibox.utils.randomString()
  const sign = md5.utf8MD5(route + t + config.securityCode + rand + body + config.serverVersion)
  let header = {
    'content-type': 'application/json',
    'X-Apibox-SDK-Type': type,
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
    if (undefined === Apibox.User) {
      Apibox = require('./apibox')
    }

    const header = setHeader(Apibox._config, route, method, parma)

    var current = Apibox.User.current()
    if (current) {
      header['X-Apibox-Session-Token'] = current.sessionToken
    }
    const server = axios.create({
      baseURL: Apibox._config.host,
      headers: header,
      validateStatus: (status) => {
        return status < 500 // 状态码在大于或等于500时才会 reject
      }
    })
    const serverData = {
      url: route,
      method: method
    }
    if (serverData.method === 'get') {
      serverData.params = parma
    } else {
      serverData.data = parma
    }
    if (Apibox._config.deBug === true) {
      console.log('host:', Apibox._config.host)
      console.log('parma:', parma)
    }
    server(serverData).then(({
      data
    }) => {
      if ((data.code && data.error) || data.error) {
        reject(data)
      }
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  })
}

module.exports = request
