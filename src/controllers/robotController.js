const cache = require('../middleware/cache')
const { moveRobot } = require('../services/moveRobot')

exports.deploy = async (req, res) => {
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

exports.move = async (req, res) => {
  const { instructions } = req.params
  const grid = cache.get('grid')
  let robot = cache.get('robot')

  if (!grid) {
    return res.send(
    `<div>
      <h2>Error</h2> 
      <p> Grid has to be created</p>
    </div>`
    )
  }

  if (!robot) {
    return res.send(
    `<div>
      <h2>Error</h2> 
      <p> Robot has to be deployed</p>
    </div>`
    )
  }

  if(instructions.length > 100)return res.send(
    `<div>
      <h2>Error</h2> 
      <p> Can't send more than 100 instructions </p>
    </div>`
    )

  for (let i = 0; i < instructions.length; i++) {
    if (!(instructions.charAt(i) == 'L' || instructions.charAt(i) == 'R' || instructions.charAt(i) == 'F')) {
      return res.send(
        `<div>
          <h2>Error</h2> 
          <p> instructions were badly formatted</p>
        </div>`
      )
    }
  }

  robot = moveRobot(grid, robot, instructions)

  cache.set('robot', robot)

  if (robot.lost) {
    cache.del('robot')

    return res.send(
      `<h2>Moved robot to ${robot.x}-${robot.y} facing ${robot.facing} and fell, so it's LOST</h2>`
    )
  } else {
    return res.send(
  `<h2>Moved robot to ${robot.x}-${robot.y} facing ${robot.facing}</h2>`
    )
  }
}
