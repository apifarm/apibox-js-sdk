/*
 * @Author: your name
 * @Date: 2019-07-02 09:41:29
 * @LastEditTime: 2020-06-17 18:27:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /apibox-js-sdk-es6/src/main.js
 */
/* eslint-disable */
var Apibox = require('./lib/app')
// var Apibox = require('../dist/apibox-1.7.1.min')

// Apibox.initialize('bb20359e8e7eb634fff2c76089ce0d80', '0dcb80eb0cf198b9facccbf3f0b29b89')
// Apibox.initialize('91cccd44cafd370aa5b89669d993b619', 'd56f4b86e5cd56e84f705b6f530e4806');
Apibox.initialize('4df53b03a0b3a8ef', '123456');
// Apibox.initialize('ad1ef6c1eac9b6e7', '123456'); //内网
// Apibox.debug(true);

// const ApiboxSocketIo = Apibox.Socket()

const query = Apibox.Query('_User')
query.equalTo('username', '!=', 'ff')
query.find().then(res => {
  console.log(res)
})

// let ApiboxSocketIo = Apibox.Socket(33)

const fileUploadControl = document.getElementById('profilePhotoFileUpload');
fileUploadControl.onchange = () => {
  const pic = fileUploadControl.files
  let file
  for (let item of pic) {
    file = Apibox.File(item.name, item);
  }
  file.save().then(res => {
    const file = res[0]
    console.log(res.length);
    console.log(res, file);
  })
}
