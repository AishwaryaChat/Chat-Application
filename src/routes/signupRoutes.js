const controllers = require('../controllers')

const signupRoutes = router => {
  router
    .route('/signup')
    .post(controllers.users.addUser)
}

module.exports = signupRoutes
