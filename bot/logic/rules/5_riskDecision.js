const { 
  southExists, eastExists, westExists, northExists,
  getSouthValue, getEastValue, getNorthValue, getWestValue,
  getRandom,
} = require('../../../utils');

const checkIfDanger = (matrix, x, y) => {
  console.log('(',x,',',y,') => ', matrix[y][x]);

}

const identifyObviousDanger = (obj) => {
  const { matrix, cells } = obj;
  for (let x = 0; x < cells.length; x++) {
    const a = checkIfDanger(matrix, cells[x].x, cells[x].y);
  }
}

const computeBorderCells = (matrix) => {
  let borderCells = Array();
  for (let x = 0; x < matrix.length; x++) {
    for (let y = 0; y < matrix.length; y++) {
      if(checkIfBorder(matrix, x, y)) borderCells.push({ x, y })
    }
  }
  return borderCells;
};

const checkIfBorder = (matrix, x, y) => {
  /* is border if any of its neighbours is unknown and at least one is known */
  if(matrix[y][x] === '?') return false; // if we are unknown => not in border
  
  const unknownChars = ['?'];
  const unknownCount = countForValueAround(matrix, x, y, unknownChars);
  const knownChars = [' ', 'm', 'm', 'r', 'R'];
  const knownCount = countForValueAround(matrix, x, y, knownChars);
  // console.log("unknown around ("+x+","+y+") = ", unknownCount);
  // console.log("known around ("+x+","+y+") = ", knownCount);
  return (knownCount > 0 && unknownCount > 0)
};

const countForValueAround = (matrix, x, y, values) => {
  let count = 0;
  if (southExists(matrix.length, x, y) && values.includes(getSouthValue(matrix, x, y))) count++;
  if (westExists(matrix.length, x, y) && values.includes(getWestValue(matrix, x, y))) count++;
  if (northExists(matrix.length, x, y) && values.includes(getNorthValue(matrix, x, y))) count++;
  if (eastExists(matrix.length, x, y) && values.includes(getEastValue(matrix, x, y))) count++;

  return count;
}

module.exports = {
  "priority": 990,
  "condition": function(R) {
    console.log(this)
    const NEEDS_TO_COMPUTE_BORDER = !this.border;
    console.log(NEEDS_TO_COMPUTE_BORDER);
    R.when(true);
  },
  "consequence": function(R) {
    console.log(this.matrix);
    console.log("RISK NEEDS TO BE COMPUTED", this.cells);
    const borderCells = computeBorderCells(this.matrix);
    console.log("res '''", borderCells)
    // identifyObviousDanger(this);
    process.exit()
    this.action = {
      type: 'BLOCKED',
    };
    R.stop();
  }
}