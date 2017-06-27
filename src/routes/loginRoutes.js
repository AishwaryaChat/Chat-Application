const controllers = require('../controllers')

const loginRoutes = router => {
  router
    .route('/login')
    .post(controllers.users.checkUser)
}

module.exports = loginRoutes
