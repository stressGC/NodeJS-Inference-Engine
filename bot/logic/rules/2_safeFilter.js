const { 
  southExists, eastExists, westExists, northExists,
  getSouthValue, getEastValue, getNorthValue, getWestValue 
} = require('../../../utils');

const isSafe = (matrix, x, y) => {
  /* is safe if any surrounding cell is ' ' */
  const north = (northExists(matrix.length, x, y)) ? getNorthValue(matrix, x, y) === ' ' : true;
  if (north) return true;
  const south = (southExists(matrix.length, x, y)) ? getSouthValue(matrix, x, y) === ' ' : true;
  if (south) return true;
  const east = (eastExists(matrix.length, x, y)) ? getEastValue(matrix, x, y) === ' ' : true;
  if (east) return true;
  const west = (westExists(matrix.length, x, y)) ? getWestValue(matrix, x, y) === ' ' : true;
  if (west) return true;
  return false;
}

module.exports = {
  "priority": 998,
  "condition": function(R) {
    R.when(this.possibleCellsComputed === true);
  },
  "consequence": function(R) {
    console.log("============")
    console.log(this.matrix)
    const safeFiltered = this.cells.filter((cell) => isSafe(this.matrix, cell.x, cell.y));

    switch(safeFiltered.length) {
      case 0:
        // none is safe, need another filter
        console.log("no cell is safe, next filter");
        R.next();
        break;
      default:
        // return a random cell which is safe
        console.log("returning random safe cell in ", safeFiltered);
        this.cells = safeFiltered;
        R.stop();
    }
    /* 
    if filter.length !== 0 next() 
    else result = rnd(filter)
    */
  }
}