exports.xyNegative =
`<div>
  <h2>Error</h2> 
  <p> x or y can't be negative, grid not created </p>
</div>`

exports.xyGreaterThan50 =
`<div>
  <h2>Error</h2> 
  <p> x or y can't be > 50, grid not created </p>
</div>`

exports.gridCreated = (x, y) => `<h2>Grid ${x}x${y} created </h2>`
