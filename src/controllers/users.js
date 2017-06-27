const bcrypt = require('bcrypt')

const Users = require('../models/users.js')

// Validating if user exist and Adding a user
exports.addUser = (req, res) => {
  Users.findOne({'emailID': req.body.emailAddress}, (err, doc) => {
    if (doc) {
      return res.send({message: 'already'})
    } else if (!doc) {
      hashPassword(req, res)
    }
    if (err) {
      return res.send({err})
    }
  })
}

// hashing password
const hashPassword = (req, res) => {
  const pass = req.body.password
  bcrypt.genSalt(12, (err, salt) => {
    if (err) throw new Error(`Not able to generate salt`)
    bcrypt.hash(pass, salt, (err, hash) => {
      if (err) throw new Error(`Not able to generate hash`)
      const password = hash
      createUser(req, res, password, salt)
    })
  })
}

// creating a user entry in database
function createUser (req, res, password, salt) {
  Users.create({
    name: req.body.firstname + ' ' + req.body.lastname,
    emailID: req.body.emailAddress,
    password: password,
    salt: salt
  }, (err, response) => {
    if (err) {
      console.log(err)
      return res.send({err})
    } else {
      return res.redirect('/signin')
    }
  })
}

// Authentication user for login
exports.checkUser = (req, res) => {
  Users.findOne({'emailID': req.body.emailAddress}, (err, doc) => {
    if (err) {
      res.send({err})
    } else if (doc) {
      checkPassword(req.body.password, req, res)
    } else {
      return res.send({message: 'not found'})
    }
  })
}

const checkPassword = (pass, req, res) => {
  Users.findOne({'emailID': req.body.emailAddress}, 'password salt', (err, user) => {
    if (err) res.send({err})
    else {
      bcrypt.hash(pass, user.salt, (err, hash) => {
        if (err) res.send({err})
        if (hash === user.password) {
          req.session.user_id = req.body.emailAddress
          res.redirect('/home')
        } else res.send({message: 'not matched'})
      })
    }
  })
}
