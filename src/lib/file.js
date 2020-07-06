const request = require('./request')
let Apibox = require('./apibox')
const Error = require('./error')
const utils = require('./utils')
let md5 = require('./utf8md5')
const requestHap = "xxrequire('@system.request')xx"
const {
  isString,
  isArray
} = require('./dataType')
let list = []

class file {
  constructor(name, parma) {
    if (name && parma) {
      if (!isString(name)) {
        throw new Error(415)
      }
      let ext = name.substring(name.lastIndexOf('.') + 1)
      list.push({
        name: name,
        route: `${Apibox._config.parameters.FILES}/${Apibox._config.secretKey}.${ext}`,
        data: parma
      })
    }
  }
  fileUpload(p = '') {
    let that = this
    return new Promise((resolve, reject) => {
      if (undefined === Apibox.User) {
        Apibox = require('./apibox')
      }

      let sessionToken = 'apibox'
      let current = Apibox.User.current()
      if (current) {
        sessionToken = current.sessionToken
      }

      const data = []

      const t = Math.round(new Date().getTime() / 1000)
      const rand = Apibox.utils.randomString()
      let route = list[0].route
      if (p === 'wxc') {
        route = route.replace(Apibox._config.parameters.FILES, Apibox._config.parameters.FILESCHECK)
      }
      const sign = md5.utf8MD5(route + t + Apibox._config.securityCode + rand)
      const key = {
        'content-type': 'application/json',
        'X-Apibox-SDK-Type': 'wxlite',
        'X-Apibox-Safe-Sign': sign,
        'X-Apibox-Safe-Timestamp': t,
        'X-Apibox-Noncestr-Key': rand,
        'X-Apibox-Session-Token': sessionToken,
        'X-Apibox-Secret-Key': Apibox._config.secretKey
      }
      const formData = Object.assign({
        '_ContentType': 'text/plain',
        'mime_type': 'text/plain',
        'category': 'wxlite',
        '_ClientVersion': 'js3.6.1',
        '_InstallationId': 'apibox'
      }, key)
      for (let item of list) {
        let ro = item.route
        if (p === 'wxc') {
          ro = item.route.replace(Apibox._config.parameters.FILES, Apibox._config.parameters.FILESCHECK)
        }

        console.log(item.route, Apibox._config.parameters.FILESCHECK, 'ror')
        wx.uploadFile({
          url: Apibox._config.host + ro, // 仅为示例，非真实的接口地址
          filePath: item.data,
          name: 'file',
          header: key,
          formData: formData,
          success: function (res) {
            let url = JSON.parse(res.data)
            if (p === 'wxc') {
              if (url.msg === 'ok') {
                resolve(that.fileUpload())
              } else {
                reject(url)
              }
            } else {
              data.push(url)
              if (data.length === list.length) {
                list = []
                resolve(data)
                reject(data)
              }
            }
          },
          fail: function (err) {
            data.push(err)
          }
        })
      }
    })
  }
  imgSecCheck() {
    if (!list.length) {
      throw new Error(417)
    }

    return this.fileUpload('wxc')
  }
  save() {
    if (!list.length) {
      throw new Error(417)
    }
    let fileObj
    // //获取当前应用类型
    const type = utils.getAppType()

    // h5
    if (type === 'h5' || type === 'nodejs') {
      fileObj = new Promise((resolve, reject) => {
        const data = []
        for (let item of list) {
          request(item.route, 'post', item.data).then((url) => {
            data.push(url)
            if (data.length === list.length) {
              list = []
              resolve(data)
              reject(data)
            }
          }).catch(err => {
            data.push(err)
          })
        }
      })
    } else if (type === 'wx') {
      if (!list.length) {
        throw new Error(417)
      }

      return this.fileUpload('wx')
    } else if (type === 'hap') {
      // 快应用功能
      fileObj = new Promise((resolve, reject) => {
        if (undefined === Apibox.User) {
          Apibox = require('./apibox')
        }
        let sessionToken = 'apibox'
        let current = Apibox.User.current()
        if (current) {
          sessionToken = current.sessionToken
        }

        const data = []
        const t = Math.round(new Date().getTime() / 1000)
        const rand = Apibox.utils.randomString()
        const route = list[0].route
        console.log('rand', rand, Apibox, route)

        const sign = md5.utf8MD5(route + t + Apibox._config.securityCode + rand)
        const key = {
          'content-type': 'application/json',
          'X-Apibox-SDK-Type': 'wxlite',
          'X-Apibox-Safe-Sign': sign,
          'X-Apibox-Safe-Timestamp': t,
          'X-Apibox-Noncestr-Key': rand,
          'X-Apibox-Session-Token': sessionToken,
          'X-Apibox-Secret-Key': Apibox._config.secretKey
        }
        const formData = Object.assign({
          '_ContentType': 'text/plain',
          'mime_type': 'text/plain',
          'category': 'wxlite',
          '_ClientVersion': 'js3.6.1',
          '_InstallationId': 'apibox'
        }, key)
        for (let item of list) {
          requestHap.upload({
            url: Apibox._config.host + item.route,
            files: [{
              uri: item.data,
              name: 'file',
              filename: item.name
            }],
            header: {
              'X-Apibox-SDK-Type': 'wxlite'
            },
            data: formData,
            success: function (res) {
              console.log('handling success' + data)
              let url = res.data
              data.push(url)
              if (data.length === list.length) {
                list = []
                resolve(data)
                reject(data)
              }
            },
            fail: function (data, code) {
              console.log(`handling fail, code = ${code}`)
            }
          })
        }
      })
    }
    return fileObj
  }
  destroy(parma) {
    if (isString(parma)) {
      return request(`${Apibox._config.parameters.FILES}/upyun/${parma.split('.com/')[1]}`, 'delete')
    } else if (isArray(parma)) {
      const data = []
      parma.map(item => {
        data.push(item.split('.com/')[1])
      })
      return request(Apibox._config.parameters.DELFILES, 'post', {
        'upyun': data
      })
    } else {
      throw new Error(415)
    }
  }
}

module.exports = file
