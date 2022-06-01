const { Router } = require('express')
const router = Router()

const gridController = require('../controllers/gridController')

router.get('/create/:x/:y', gridController.createGrid)

module.exports = router
