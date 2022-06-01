exports.gridNotCreated = `<div>
<h2>Error</h2> 
<p> Grid has to be created</p>
</div>`

exports.xyNegative = `<div>
<h2>Error</h2> 
<p> x or y can't be negative, robot not deployed </p>
</div>`

exports.mustFace = `<div>
<h2>Error</h2> 
<p> robot has to face N || S || E || W </p>
</div>`

exports.robotDeployed = (x, y) => `<h2>Robot created on coordinates ${x}-${y}</h2>`

exports.robotNotDeployed = `<div>
<h2>Error</h2> 
<p> Robot has to be deployed</p>
</div>`

exports.tooManyInstructions = `<div>
<h2>Error</h2> 
<p> Can't send more than 100 instructions </p>
</div>`

exports.instructionsBadlyFormatted = `<div>
<h2>Error</h2> 
<p> instructions were badly formatted</p>
</div>`

exports.robotLost = (x, y, facing) => `<h2>Moved robot to ${x}-${y} facing ${facing} and fell, so it's LOST</h2>`

exports.movedRobot = (x, y, facing) => `<h2>Moved robot to ${x}-${y} facing ${facing}</h2>`
