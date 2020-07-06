const APIBOX = require('../src/lib/app')
// const APIBOX = require('../dist/APIBOX-2.2.1.min')
console.log(APIBOX.type)
APIBOX.initialize('ad1ef6c1eac9b6e7', '123456')

const query = APIBOX.Query('_User')
query.equalTo('username', '!=', 'ff')
query.find().then(res => {
  console.log(res)
}).catch(err => {
  console.log(err)
})
