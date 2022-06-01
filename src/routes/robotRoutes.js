const { Router } = require('express')
const router = Router()

const robotController = require('../controllers/robotController')

router.get('/deploy/:x/:y/:facing', robotController.deploy)
router.get('/move/:instructions', robotController.move)

module.exports = router
