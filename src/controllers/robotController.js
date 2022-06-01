const cache = require('../middleware/cache')
const { moveRobot } = require('../services/moveRobot')

const {
  gridNotCreated, instructionsBadlyFormatted, movedRobot,
  mustFace, robotLost, robotNotDeployed, robotDeployed,
  tooManyInstructions, xyNegative, deployedOutside
} = require('../../resources/robotHTMLResponses')

exports.deploy = async (req, res) => {
  const { x, y, facing } = req.params

  const grid = cache.get('grid')

  if (!grid) {
    cache.del('robot')
    return res.send(gridNotCreated)
  }

  if (x > grid.x || y > grid.y) {
    cache.del('robot')
    return res.send(deployedOutside)
  }

  if (x <= 0 || y <= 0) {
    cache.del('robot')
    return res.send(xyNegative)
  }

  if (!(facing == 'N' || facing == 'S' || facing == 'E' || facing == 'W')) {
    cache.del('robot')
    return res.send(mustFace)
  }

  cache.set('robot', { x: parseInt(x), y: parseInt(y), facing })

  return res.send(robotDeployed(x, y))
}

exports.move = async (req, res) => {
  const { instructions } = req.params
  const grid = cache.get('grid')
  let robot = cache.get('robot')

  if (!grid) {
    return res.send(gridNotCreated)
  }

  if (!robot) {
    return res.send(robotNotDeployed)
  }

  if (instructions.length > 100) {
    return res.send(tooManyInstructions)
  }

  for (let i = 0; i < instructions.length; i++) {
    if (!(instructions.charAt(i) == 'L' || instructions.charAt(i) == 'R' || instructions.charAt(i) == 'F')) {
      return res.send(instructionsBadlyFormatted)
    }
  }

  robot = moveRobot(grid, robot, instructions)

  cache.set('robot', robot)

  if (robot.lost) {
    cache.del('robot')

    return res.send(robotLost(robot.x, robot.y, robot.facing))
  } else {
    return res.send(movedRobot(robot.x, robot.y, robot.facing))
  }
}
