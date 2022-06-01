const { checkForScent, deployScent } = require('./scentManager')

function rotateLeft (robot) {
  const { facing } = robot

  switch (facing) {
    case 'N': return { x: robot.x, y: robot.y, facing: 'W' }
    case 'S':return { x: robot.x, y: robot.y, facing: 'E' }
    case 'E':return { x: robot.x, y: robot.y, facing: 'N' }
    case 'W':return { x: robot.x, y: robot.y, facing: 'S' }
  }
}

function rotateRight (robot) {
  const { facing } = robot

  switch (facing) {
    case 'N': return { x: robot.x, y: robot.y, facing: 'E' }
    case 'S': return { x: robot.x, y: robot.y, facing: 'W' }
    case 'E': return { x: robot.x, y: robot.y, facing: 'S' }
    case 'W': return { x: robot.x, y: robot.y, facing: 'N' }
  }
}

function moveForward (grid, robot) {
  const { x, y, facing } = robot

  switch (facing) {
    case 'N':
      if (y + 1 > grid.y) return { robot, err: 1 }
      return { robot: { x, y: y + 1, facing } }

    case 'S':
      if (y - 1 < 0) return { robot, err: 1 }
      return { robot: { x, y: y - 1, facing } }

    case 'E':
      if (x + 1 > grid.x) return { robot, err: 1 }
      return { robot: { x: x + 1, y, facing } }

    case 'W':
      if (x - 1 < 0) return { robot, err: 1 }
      return { robot: { x: x - 1, y, facing } }
  }
}

exports.moveRobot = (grid, robot, instructions) => {
  for (let i = 0; i < instructions.length; i++) {
    switch (instructions.charAt(i)) {
      case 'L':
        robot = rotateLeft(robot)
        break
      case 'R':
        robot = rotateRight(robot)
        break
      case 'F':
        const movement = moveForward(grid, robot)
        robot = movement.robot

        if (movement.err && !checkForScent(robot)) {
          deployScent(robot)
          return { x: robot.x, y: robot.y, facing: robot.facing, lost: 'LOST' }
        }
    }
  }

  return robot
}
