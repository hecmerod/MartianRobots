const { Router } = require('express')
const router = Router()

const robotController = require('../controllers/robotController')

router.get('/deploy/:x/:y/:facing', robotController.deployRobot)

module.exports = router
