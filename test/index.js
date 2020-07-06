const Apibox = require('../src/lib/app')
// const Apibox = require('../dist/apibox-2.2.1.min')
console.log(Apibox.type)
Apibox.initialize('ad1ef6c1eac9b6e7', '123456')

const query = Apibox.Query('_User')
query.equalTo('username', '!=', 'ff')
query.find().then(res => {
  console.log(res)
}).catch(err => {
  console.log(err)
})
