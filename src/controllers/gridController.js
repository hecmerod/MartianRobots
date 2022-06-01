const cache = require('../middleware/cache')

const { gridCreated, xyGreaterThan50, xyNegative } = require('../../resources/gridHTMLResponses')

exports.createGrid = async (req, res) => {
  const { x, y } = req.params

  if (x <= 0 || y <= 0) {
    cache.del('grid')
    cache.del('robot')

    return res.send(xyNegative)
  }

  if (x > 50 || y > 50) {
    cache.del('grid')
    cache.del('robot')

    return res.send(xyGreaterThan50)
  }

  cache.set('grid', { x: parseInt(x), y: parseInt(y) })
  cache.del('robot')

  return res.send(gridCreated(x, y))
}
