const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  id: String,
  name: String,
  emailID: String,
  password: String,
  salt: String
})

const Users = mongoose.model('Users', userSchema)

module.exports = Users
