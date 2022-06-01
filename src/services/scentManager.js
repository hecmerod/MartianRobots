const cache = require('../middleware/cache')

exports.checkForScent = ({x,y,facing}) => {
   const scent = cache.get(`${x}${y}${facing}`)

   return scent != undefined
}

exports.deployScent = ({x,y, facing}) => cache.set(`${x}${y}${facing}`, {x,y,facing})