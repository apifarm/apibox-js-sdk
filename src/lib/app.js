const APIBOX = require('./apibox')
const Pointer = require('./pointer')
const Relation = require('./relation')
const Query = require('./query')
const User = require('./user')
const File = require('./file')
const Pay = require('./pay')
const Socket = require('./socket')

const {
  generateCode,
  getAccessToken,
  sendWeAppMessage,
  refund,
  notifyMsg,
  functions,
  timestamp,
  requestPasswordReset,
  resetPasswordBySmsCode,
  updateUserPassword,
  geoPoint,
  checkMsg,
  push
} = require('./common')
const {
  requestSmsCode,
  verifySmsCode
} = require('./sms')

// 生成二维码
APIBOX.GeoPoint = geoPoint
// 生成二维码
APIBOX.generateCode = generateCode
// 获取微信token
APIBOX.getAccessToken = getAccessToken
// 小程序模版信息
APIBOX.sendWeAppMessage = sendWeAppMessage
// 微信退款
APIBOX.refund = refund
// 检测文本
APIBOX.checkMsg = checkMsg
// 微信主动通知
APIBOX.notifyMsg = notifyMsg
// 请求短信验证码
APIBOX.requestSmsCode = requestSmsCode
// 验证短信验证码
APIBOX.verifySmsCode = verifySmsCode
// 云函数
APIBOX.run = APIBOX.functions = functions
// 获取服务器时间
APIBOX.timestamp = timestamp
// 密码重置(Email)
APIBOX.requestPasswordReset = requestPasswordReset
// 密码重置(短信)
APIBOX.resetPasswordBySmsCode = resetPasswordBySmsCode
// 密码重置(登录状态下更改密码)
APIBOX.updateUserPassword = updateUserPassword
// APP推送
APIBOX.push = push
// 小程序支付
APIBOX.Pay = new Pay()
// 用户对象
APIBOX.User = new User()
// 通讯
APIBOX.Socket = (id) => new Socket(id)
// 数据操作
APIBOX.Query = parmas => new Query(parmas)
// 文件操作
APIBOX.File = (name, object) => new File(name, object)
// 网络请求
APIBOX.request = require('./request')
// 平台判断
APIBOX.type = APIBOX.utils.getAppType()
// 数据关联(一对一)
APIBOX.Pointer = parmas => new Pointer(parmas)
// 数据关联(一对多，多对多)
APIBOX.Relation = parmas => new Relation(parmas)

if (APIBOX.type === 'wx') {
  if (typeof (tt) !== 'undefined') {
    tt.APIBOX = APIBOX
  } else {
    wx.APIBOX = APIBOX
  }
} else if (APIBOX.type === 'h5') {
  window.APIBOX = APIBOX
} else if (APIBOX.type === 'hap') {
  // 快应用功能
  global.APIBOX = APIBOX
} else if (APIBOX.type === 'nodejs') {
  // nodejs
  global.APIBOX = APIBOX
}

module.exports = APIBOX
