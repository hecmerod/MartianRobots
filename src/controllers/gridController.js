const cache = require('../middleware/cache')

exports.createGrid = async (req, res) => {
  const { x, y } = req.params

  if (x <= 0 || y <= 0) {
    cache.del('grid')
    cache.del('robot')

    return res.send(
      `<div>
        <h2>Error</h2> 
        <p> x or y can't be negative, grid not created </p>
      </div>`
    )
  }

  if (x > 50 || y > 50) {
    cache.del('grid')
    cache.del('robot')

    return res.send(
      `<div>
        <h2>Error</h2> 
        <p> x or y can't be > 50, grid not created </p>
      </div>`
    )
  }

  cache.set('grid', { x: parseInt(x), y: parseInt(y) })
  cache.del('robot')

  return res.send(
      `<h2>Grid ${x}x${y} created </h2>`
  )
}
