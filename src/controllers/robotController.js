const cache = require('../middleware/cache')

exports.deployRobot = async (req, res) => {
  const { x, y, facing } = req.params

  if (!cache.get('grid')) {
    cache.del('robot')

    return res.send(
        `<div>
          <h2>Error</h2> 
          <p> grid is not created </p>
        </div>`
    )
  }

  if (x <= 0 || y <= 0) {
    cache.del('robot')

    return res.send(
      `<div>
        <h2>Error</h2> 
        <p> x or y can't be negative, robot not deployed </p>
      </div>`
    )
  }

  if (!(facing == 'N' || facing == 'S' || facing == 'E' || facing == 'W')) {
    cache.del('robot')

    return res.send(
      `<div>
        <h2>Error</h2> 
        <p> robot has to face N || S || E || W </p>
      </div>`
    )
  }

  cache.set('robot', { x: parseInt(x), y: parseInt(y), facing })

  return res.send(
      `<h2>Robot created on coordinates ${x}-${y}</h2>`
  )
}
