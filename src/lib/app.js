const Apibox = require('./apibox')
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
Apibox.GeoPoint = geoPoint
// 生成二维码
Apibox.generateCode = generateCode
// 获取微信token
Apibox.getAccessToken = getAccessToken
// 小程序模版信息
Apibox.sendWeAppMessage = sendWeAppMessage
// 微信退款
Apibox.refund = refund
// 检测文本
Apibox.checkMsg = checkMsg
// 微信主动通知
Apibox.notifyMsg = notifyMsg
// 请求短信验证码
Apibox.requestSmsCode = requestSmsCode
// 验证短信验证码
Apibox.verifySmsCode = verifySmsCode
// 云函数
Apibox.run = Apibox.functions = functions
// 获取服务器时间
Apibox.timestamp = timestamp
// 密码重置(Email)
Apibox.requestPasswordReset = requestPasswordReset
// 密码重置(短信)
Apibox.resetPasswordBySmsCode = resetPasswordBySmsCode
// 密码重置(登录状态下更改密码)
Apibox.updateUserPassword = updateUserPassword
// APP推送
Apibox.push = push
// 小程序支付
Apibox.Pay = new Pay()
// 用户对象
Apibox.User = new User()
// 通讯
Apibox.Socket = (id) => new Socket(id)
// 数据操作
Apibox.Query = parmas => new Query(parmas)
// 文件操作
Apibox.File = (name, object) => new File(name, object)
// 网络请求
Apibox.request = require('./request')
// 平台判断
Apibox.type = Apibox.utils.getAppType()
// 数据关联(一对一)
Apibox.Pointer = parmas => new Pointer(parmas)
// 数据关联(一对多，多对多)
Apibox.Relation = parmas => new Relation(parmas)

if (Apibox.type === 'wx') {
  if (typeof (tt) !== 'undefined') {
    tt.Apibox = Apibox
  } else {
    wx.Apibox = Apibox
  }
} else if (Apibox.type === 'h5') {
  window.Apibox = Apibox
} else if (Apibox.type === 'hap') {
  // 快应用功能
  global.Apibox = Apibox
} else if (Apibox.type === 'nodejs') {
  // nodejs
  global.Apibox = Apibox
}

module.exports = Apibox
