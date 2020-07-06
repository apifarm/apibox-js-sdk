/*
 * @Author: your name
 * @Date: 2019-07-02 09:41:29
 * @LastEditTime: 2020-06-17 18:27:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /bmob-js-sdk-es6/src/main.js
 */
/* eslint-disable */
var APIBOX = require('./lib/app')
// var APIBOX = require('../dist/APIBOX-1.7.1.min')

// APIBOX.initialize('bb20359e8e7eb634fff2c76089ce0d80', '0dcb80eb0cf198b9facccbf3f0b29b89')
// APIBOX.initialize('91cccd44cafd370aa5b89669d993b619', 'd56f4b86e5cd56e84f705b6f530e4806');
APIBOX.initialize('4df53b03a0b3a8ef', '123456');
// APIBOX.initialize('ad1ef6c1eac9b6e7', '123456'); //内网
// APIBOX.debug(true);

// const BmobSocketIo = APIBOX.Socket()

const query = APIBOX.Query('_User')
query.equalTo('username', '!=', 'ff')
query.find().then(res => {
  console.log(res)
})

// let BmobSocketIo = APIBOX.Socket(33)

const fileUploadControl = document.getElementById('profilePhotoFileUpload');
fileUploadControl.onchange = () => {
  const pic = fileUploadControl.files
  let file
  for (let item of pic) {
    file = APIBOX.File(item.name, item);
  }
  file.save().then(res => {
    const file = res[0]
    console.log(res.length);
    console.log(res, file);


  })
}
